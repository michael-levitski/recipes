import RecipeMap from "./RecipeMap";
import data from "./data.json";
let recipeMap: RecipeMap;

beforeAll(() => {
  recipeMap = new RecipeMap();
});

describe("on initial load", () => {
  test(`map size is 0`, () => {
    expect(recipeMap.size).toBe(0);
  });

  test(`names list is empty array`, () => {
    expect(recipeMap.recipeNames).toEqual([]);
  });
});

describe("testing for non-existent item", () => {
  test('has("scrambledEggs") returns false', () => {
    expect(recipeMap.has("scrambledEggs")).toBe(false);
  });

  test('getInfo("scrambledEggs") return undefined', () => {
    expect(recipeMap.getInfo("scrambledEggs")).toBeUndefined();
  });
});

describe("after adding all recipes", () => {
  beforeAll(() => {
    for (const recipe of data.recipes) recipeMap.set(recipe);
  });

  test("map size is 3", () => {
    expect(recipeMap.size).toBe(3);
  });

  test("names list has correct items", () => {
    expect(recipeMap.recipeNames).toEqual([
      "scrambledEggs",
      "garlicPasta",
      "chai"
    ]);
  });

  test('has("scrambledEggs") returns true', () => {
    expect(recipeMap.has("scrambledEggs")).toBe(true);
  });

  test('getInfo("scrambledEggs") gets correct info', () => {
    expect(recipeMap.getInfo("scrambledEggs")).toEqual({
      ingredients: ["1 tsp oil", "2 eggs", "salt"],
      numSteps: 5,
      instructions: [
        "Beat eggs with salt",
        "Heat oil in pan",
        "Add eggs to pan when hot",
        "Gather eggs into curds, remove when cooked",
        "Salt to taste and enjoy"
      ]
    });
  });

  test('delete("scrambledEggs") removes it from map', () => {
    recipeMap.delete("scrambledEggs");
    expect(recipeMap.size).toBe(2);
    expect(recipeMap.recipeNames).toEqual(["garlicPasta", "chai"]);
    expect(recipeMap.getInfo("scrambledEggs")).toBeUndefined();
  });

  test("clear() removes all items", () => {
    recipeMap.clear();
    expect(recipeMap.size).toBe(0);
    expect(recipeMap.recipeNames).toEqual([]);
    expect(recipeMap.has("garlicPasta")).toBe(false);
    expect(recipeMap.getInfo("chai")).toBeUndefined();
  });
});
