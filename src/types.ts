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

export interface RecipeAttributes {
  recipeName?: string;
  numSteps?: number;
}

export interface IngredientAttributes {
  ingredient?: string;
  recipeName?: string;
}

export interface InstructionAttributes {
  instruction: string;
  stepNumber: number;
  recipeName: string;
}

export interface RecipeInfo extends Details {
  instructions: string[];
}

export interface RecipeRepository {
  getRecipeNames(): Promise<string[]>;
  getRecipeDetails(recipeName: string): Promise<RecipeDetails | EmptyObject>;
  insertRecipe(recipe: Recipe): Promise<boolean>;
  updateRecipe(recipe: Recipe): Promise<boolean>;
  // deleteRecipe(recipeName: string): Promise<boolean>;
}

export interface Env extends NodeJS.ProcessEnv {
  PORT: string;
  CONNECTION_URI: string;
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
