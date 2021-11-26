import data from "../data/data.json";
import RecipeMap from "../data/RecipeMap";
import { RecipeDetails, Details, Recipe, EmptyObject } from "../types";

const recipeMap = new RecipeMap(data.recipes);

export async function getRecipeNames() {
  return recipeMap.recipeNames;
}

async function _getRecipeDetails(
  recipeName: string
): Promise<RecipeDetails | EmptyObject> {
  const recipe = recipeMap.getInfo(recipeName);

  if (!recipe) return {};

  const { ingredients, numSteps } = recipe;

  const details: Details = {
    ingredients,
    numSteps,
  };

  return { details };
}
export const getRecipeDetails = _getRecipeDetails;

async function setRecipe(recipe: Recipe, setIfContains: boolean) {
  const mapHasRecipe = recipeMap.has(recipe);

  if (mapHasRecipe !== setIfContains) return false;

  recipeMap.set(recipe);

  return true;
}

export async function insertRecipe(recipe: Recipe) {
  return setRecipe(recipe, false);
}

export async function updateRecipe(recipe: Recipe) {
  return setRecipe(recipe, true);
}

export async function deleteRecipe(recipeName: string) {
  return recipeMap.delete(recipeName);
}
