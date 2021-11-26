import { Sequelize } from "sequelize";
import createModels from "../models/sequelizeModels";
import type {
  Env,
  RecipeDetails,
  EmptyObject,
  Details,
  Recipe,
} from "../types";

const { CONNECTION_URI } = process.env as Env;

const sequelize = new Sequelize(CONNECTION_URI);
sequelize.authenticate().then(onConnection);

const { RecipeModel, IngredientModel, InstructionModel } =
  createModels(sequelize);

function onConnection() {
  const models = [RecipeModel, IngredientModel, InstructionModel];
  models.map(model => model.sync());
}

export async function getRecipeNames() {
  const recipes = await RecipeModel.findAll({ attributes: ["recipeName"] });
  return recipes.map(r => r.get().recipeName!);
}

export async function getRecipeDetails(
  recipeName: string
): Promise<RecipeDetails | EmptyObject> {
  const recipeModel = await RecipeModel.findOne({
    attributes: ["numSteps"],
    where: {
      recipeName,
    },
    include: {
      model: IngredientModel,
      attributes: ["ingredient"],
    },
  });

  if (!recipeModel) return {};

  const { numSteps, Ingredients } = recipeModel.get();
  const ingredients = Ingredients!.map(i => i.get().ingredient!);
  const details: Details = { numSteps: numSteps!, ingredients };
  return { details };
}

function insertIngredients(ingredients: string[], recipeName: string) {
  const ingredientModels = ingredients.map(function (ingredient) {
    return { ingredient, recipeName };
  });

  return IngredientModel.bulkCreate(ingredientModels);
}

function insertInstructions(instructions: string[], recipeName: string) {
  const instructionModels = instructions.map(function (instruction, i) {
    const stepNumber = i + 1;
    return { instruction, stepNumber, recipeName };
  });

  return InstructionModel.bulkCreate(instructionModels);
}

export async function insertRecipe(recipe: Recipe) {
  const { name, ingredients, instructions } = recipe;
  const recipeName = name;

  try {
    await RecipeModel.create({
      recipeName,
      numSteps: instructions.length,
    });

    const ingredientsInsert = await insertIngredients(ingredients, recipeName);
    const instructionsInsert = await insertInstructions(
      instructions,
      recipeName
    );

    await Promise.all([ingredientsInsert, instructionsInsert]);

    return true;
  } catch {
    return false;
  }
}

export async function updateRecipe(recipe: Recipe) {
  const { name, ingredients, instructions } = recipe;
  const recipeName = name;
  const options = { where: { recipeName } };

  const recipeModel = await RecipeModel.findOne(options);

  if (!recipeModel) return false;

  const recipeUpdate = recipeModel.update({ numSteps: instructions.length });

  const ingredientsUpdate = IngredientModel.destroy(options).then(function () {
    insertIngredients(ingredients, recipeName);
  });

  const instructionsUpdate = InstructionModel.destroy(options).then(
    function () {
      insertInstructions(instructions, recipeName);
    }
  );

  await Promise.all([recipeUpdate, ingredientsUpdate, instructionsUpdate]);
  return true;
}
