import { Recipe, RecipeInfo } from "../types";

export default class RecipeMap {
  private map;

  constructor(recipes?: Recipe[]) {
    this.map = new Map<string, RecipeInfo>();

    if (!recipes) return this;

    for (const recipe of recipes) this.set(recipe);
  }

  get size() {
    return this.map.size;
  }

  get recipeNames() {
    return Array.from(this.map.keys());
  }

  clear() {
    this.map.clear();
  }

  delete(recipe: string | Recipe) {
    const name = this.getRecipeName(recipe);
    const exists = this.map.has(name);

    if (!exists) return false;

    this.map.delete(name);

    return true;
  }

  getInfo(recipeName: string) {
    return this.map.get(recipeName);
  }

  has(recipe: string | Recipe) {
    const name = this.getRecipeName(recipe);
    return this.map.has(name);
  }

  set(recipe: Recipe) {
    const { name, ingredients, instructions } = recipe;
    const numSteps = instructions.length;

    const recipeInfo: RecipeInfo = {
      ingredients,
      instructions,
      numSteps
    };

    this.map.set(name, recipeInfo);
  }

  private getRecipeName(recipe: string | Recipe) {
    if (typeof recipe === "string") return recipe;
    return recipe.name;
  }
}
