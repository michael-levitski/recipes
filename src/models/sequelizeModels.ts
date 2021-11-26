import { Sequelize, Model, DataTypes, ModelCtor, Association } from "sequelize";
import {
  RecipeAttributes as RecAttributes,
  IngredientAttributes,
  InstructionAttributes,
} from "../types";

const primaryKey = true;

interface RecipeAttributes extends RecAttributes {
  Ingredients?: Model<IngredientAttributes, IngredientAttributes>[];
}

interface RecipeModel extends Model<RecipeAttributes, RecipeAttributes> {}

interface IngredientModel
  extends Model<IngredientAttributes, IngredientAttributes> {}

interface InstructionModel
  extends Model<InstructionAttributes, InstructionAttributes> {}

interface RecipeModelCtor extends ModelCtor<RecipeModel> {
  new (): RecipeModel;
  associations: {
    Ingredients: Association<RecipeModel, IngredientModel>;
    Instructions: Association<RecipeModel, InstructionModel>;
  };
}

interface IngredientModelCtor extends ModelCtor<IngredientModel> {
  new (): IngredientModel;
  associations: {
    recipe: Association<IngredientModel, RecipeModel>;
  };
}
interface InstructionModelCtor extends ModelCtor<InstructionModel> {
  new (): InstructionModel;
  associations: {
    recipe: Association<InstructionModel, RecipeModel>;
  };
}

interface Models {
  RecipeModel: RecipeModelCtor;
  IngredientModel: IngredientModelCtor;
  InstructionModel: InstructionModelCtor;
}

export default function createModels(sequelize: Sequelize): Models {
  const Recipe = sequelize.define<Model<RecipeAttributes>>("Recipe", {
    recipeName: { type: DataTypes.STRING, allowNull: false, primaryKey },
    numSteps: { type: DataTypes.INTEGER, allowNull: false },
  });

  const Ingredient = sequelize.define<Model<IngredientAttributes>>(
    "Ingredient",
    {
      ingredient: { type: DataTypes.STRING, allowNull: false, primaryKey },
      recipeName: { type: DataTypes.STRING, allowNull: false, primaryKey },
    }
  );

  const Instruction = sequelize.define<Model<InstructionAttributes>>(
    "Instruction",
    {
      instruction: { type: DataTypes.STRING, allowNull: false },
      stepNumber: { type: DataTypes.STRING, allowNull: false, primaryKey },
      recipeName: { type: DataTypes.STRING, allowNull: false, primaryKey },
    }
  );

  const recipeParentConstraint = {
    foreignKey: "recipeName",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  };

  const recipeChildConstraint = {
    foreignKey: "recipeName",
  };

  Recipe.hasMany(Ingredient, recipeParentConstraint);
  Recipe.hasMany(Instruction, recipeParentConstraint);
  Ingredient.belongsTo(Recipe, recipeChildConstraint);
  Instruction.belongsTo(Recipe, recipeChildConstraint);

  const RecipeModel = Recipe as RecipeModelCtor;
  const IngredientModel = Ingredient as IngredientModelCtor;
  const InstructionModel = Instruction as InstructionModelCtor;

  return { RecipeModel, IngredientModel, InstructionModel };
}
