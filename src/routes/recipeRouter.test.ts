import App from "../app";
import * as inMemoryRepository from "../repositories/inMemoryRecipeRepo";
import request, { SuperTest, Test, Response } from "supertest";

let app: SuperTest<Test>;

beforeAll(() => {
  const expressApp = App({repository: inMemoryRepository});
  app = request(expressApp);
});

describe("GET /recipes", () => {
  let response: Response;

  beforeAll(async () => {
    response = await app.get("/recipes").send();
  });

  test("returns JSON", () => {
    expect(response.headers["content-type"].includes("json")).toBe(true);
  });

  test("returns status code of 200", () => {
    expect(response.statusCode).toBe(200);
  });

  test("returns expected body", () => {
    expect(response.body).toEqual({
      recipeNames: ["scrambledEggs", "garlicPasta", "chai"]
    });
  });
});

describe("GET /recipes/details/:recipeName", () => {
  describe("if recipe exists", () => {
    let response: Response;

    beforeAll(async () => {
      response = await app.get("/recipes/details/chai").send();
    });

    test("returns JSON", () => {
      expect(response.headers["content-type"].includes("json")).toBe(true);
    });

    test("returns status code of 200", () => {
      expect(response.statusCode).toBe(200);
    });

    test("returns expected body", () => {
      expect(response.body).toEqual({
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
  });

  describe("if recipe doesn't exist", () => {
    let response: Response;

    beforeAll(async () => {
      response = await app.get("/recipes/details/nonExistent").send();
    });

    test("returns JSON", () => {
      expect(response.headers["content-type"].includes("json")).toBe(true);
    });

    test("returns status code of 200", () => {
      expect(response.statusCode).toBe(200);
    });

    test("returns an empty object", () => {
      expect(response.body).toEqual({});
    });
  });
});

describe("POST /recipes", () => {
  describe("if recipe doesn't exist", () => {
    let response: Response;

    beforeAll(async () => {
      response = await app.post("/recipes").send({
        name: "butteredBagel",
        ingredients: ["1 bagel", "butter"],
        instructions: ["cut the bagel", "spread butter on bagel"]
      });
    });

    test("returns no response body with code 201", () => {
      expect(response.headers["content-type"]).toBeUndefined();
      expect(response.headers["content-length"]).toBe("0");
      expect(response.body).toEqual({});
      expect(response.statusCode).toBe(201);
    });

    test("new recipe can be found in both GET routes", async () => {
      const res1 = await app.get("/recipes").send();
      expect(res1.body.recipeNames).toContain("butteredBagel");

      const res2 = await app.get("/recipes/details/butteredBagel").send();
      expect(res2.body).toEqual({
        details: { ingredients: ["1 bagel", "butter"], numSteps: 2 }
      });
    });
  });

  describe("if recipe already exists", () => {
    let response: Response;

    beforeAll(async () => {
      response = await app.post("/recipes").send({
        name: "scrambledEggs",
        ingredients: [],
        instructions: []
      });
    });

    test("returns JSON body with error message and 400 status code", () => {
      expect(response.headers["content-type"].includes("json")).toBe(true);
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: "Recipe already exists"
      });
    });

    test("the recipe is unchanged", async () => {
      const response = await app.get("/recipes/details/scrambledEggs").send();
      expect(response.body).toEqual({
        details: { ingredients: ["1 tsp oil", "2 eggs", "salt"], numSteps: 5 }
      });
    });
  });

  describe("if request body is in wrong format", () => {
    let response: Response;

    beforeAll(async () => {
      response = await app.post("/recipes").send();
    });

    test("returns JSON body with error message and 400 status code", () => {
      expect(response.headers["content-type"].includes("json")).toBe(true);
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: "Invalid request body"
      });
    });
  });
});

describe("PUT /recipes", () => {
  describe("if recipe exists", () => {
    let response: Response;

    beforeAll(async () => {
      response = await app.put("/recipes").send({
        name: "butteredBagel",
        ingredients: ["1 bagel", "2 tbsp butter"],
        instructions: ["cut the bagel", "spread butter on bagel"]
      });
    });

    test("returns no content reponse with code 204", () => {
      expect(response.headers["content-type"]).toBeUndefined();
      expect(response.headers["content-length"]).toBeUndefined();
      expect(response.body).toEqual({});
      expect(response.statusCode).toBe(204);
    });

    test("the recipe is correctly updated", async () => {
      const response = await app.get("/recipes/details/butteredBagel").send();
      expect(response.body).toEqual({
        details: { ingredients: ["1 bagel", "2 tbsp butter"], numSteps: 2 }
      });
    });
  });

  describe("if recipe doesn't exist", () => {
    let response: Response;

    beforeAll(async () => {
      response = await app.put("/recipes").send({
        name: "nonExistentRecipe",
        ingredients: [],
        instructions: []
      });
    });

    test("returns JSON body with error message and 404 status code", () => {
      expect(response.headers["content-type"].includes("json")).toBe(true);
      expect(response.statusCode).toBe(404);
      expect(response.body).toEqual({
        error: "Recipe does not exist"
      });
    });

    test("recipe can't be found in either GET route", async () => {
      const res1 = await app.get("/recipes").send();
      expect(res1.body.recipeNames).not.toContain("nonExistentRecipe");

      const res2 = await app.get("/recipes/details/nonExistentRecipe").send();
      expect(res2.body).toEqual({});
    });
  });

  describe("if request body is in wrong format", () => {
    let response: Response;

    beforeAll(async () => {
      response = await app.put("/recipes").send();
    });

    test("returns JSON body with error message and 400 status code", () => {
      expect(response.headers["content-type"].includes("json")).toBe(true);
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: "Invalid request body"
      });
    });
  });
});
