import * as repo from "./inMemoryRecipeRepo";

describe("getRecipeNames()", () => {
  test("returns all names", () => {
    expect(repo.getRecipeNames()).toEqual([
      "scrambledEggs",
      "garlicPasta",
      "chai"
    ]);
  });
});

describe("getRecipeDetails()", () => {
  test("for an existing recipe name returns correct details", () => {
    expect(repo.getRecipeDetails("chai")).toEqual({
      details: {
        ingredients: [
          "400mL water",
          "100mL milk",
          "5g chai masala",
          "2 tea bags or 20 g loose tea leaves"
        ],
        numSteps: 4
      }
    });
  });

  test("for a non-existent recipe name returns {}", () => {
    expect(repo.getRecipeDetails("")).toEqual({});
  });
});

describe("insertRecipe()", () => {
  test("for an already existing recipe returns false", () => {
    const insertResult = repo.insertRecipe({
      name: "chai",
      ingredients: [
        "400mL water",
        "100mL milk",
        "5g chai masala",
        "2 tea bags or 20 g loose tea leaves"
      ],
      instructions: [
        "Heat water until 80 C",
        "Add milk, heat until 80 C",
        "Add tea leaves/tea bags, chai masala; mix and steep for 3-4 minutes",
        "Remove mixture from heat; strain and enjoy"
      ]
    });
    expect(insertResult).toBe(false);
  });

  test("For a new recipe returns true", () => {
    const insertResult = repo.insertRecipe({
      name: "butteredBagel",
      ingredients: ["1 bagel", "butter"],
      instructions: ["cut the bagel", "spread butter on bagel"]
    });
    expect(insertResult).toBe(true);
  });

  test("New item is in repo and names list", () => {
    expect(repo.getRecipeDetails("butteredBagel")).toEqual({
      details: {
        ingredients: ["1 bagel", "butter"],
        numSteps: 2
      }
    });
    expect(repo.getRecipeNames()).toContain("butteredBagel");
  });
});

describe("updateRecipe()", () => {
  test("trying to update a nox-existent recipe returns false", () => {
    expect(
      repo.updateRecipe({ name: "fake", ingredients: [], instructions: [] })
    ).toBe(false);
  });

  test("updating existing recipe returns true", () => {
    expect(
      repo.updateRecipe({
        name: "butteredBagel",
        ingredients: ["1 bagel", "2 tbsp butter"],
        instructions: ["cut the bagel", "spread butter on bagel"]
      })
    ).toBe(true);
  });

  test("recipe is correctly updated", () => {
    const { ingredients } = repo.getRecipeDetails("butteredBagel").details;
    expect(ingredients).toContain("2 tbsp butter");
    // throw Error();
  });
});
