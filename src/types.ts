export interface AppDependencies {
  repository: RecipeRepository;
}

export interface Details {
  ingredients: string[];
  numSteps: number;
}

export interface RecipeDao {}

export interface RecipeDetails {
  details: Details;
}

export interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
}

export interface RecipeInfo extends Details {
  instructions: string[];
}

export interface RecipeRepository {
  getRecipeNames(): string[];
  getRecipeDetails(recipeName: string): RecipeDetails | EmptyObject;
  insertRecipe(recipe: Recipe): boolean;
  updateRecipe(recipe: Recipe): boolean;
  deleteRecipe(recipeName: string): boolean;
}

export interface Env extends NodeJS.ProcessEnv {
  PORT: string;
}

export interface ErrorResponse {
  error: string;
}

export interface RecipeNames {
  recipeNames: string[];
}

export type EmptyObject = {
  [K in any]: never;
};
