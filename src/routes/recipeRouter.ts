import express, { Response } from "express";
import * as send from "./httpResponseCode";
import { checkBody, validationResult } from "../validation";
import { cacheRecipeNames, clearRecipeNamesCache } from "./recipeRouterCache";
import {
  RecipeRepository,
  Recipe,
  RecipeNames,
  RecipeDetails,
  EmptyObject
} from "../types";

type Request = express.Request<{}, {}, Recipe>;

const router = express.Router();
router.use(express.json());

function validateBody(req: Request, res: Response) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return false;

  const error = "Invalid request body";
  send.badRequest(res, error);

  return true;
}

export default function RecipeRouter(recipeRepository: RecipeRepository) {
  router.get("/", cacheRecipeNames, async function (_, res) {
    const recipeNames = await recipeRepository.getRecipeNames();
    send.ok<RecipeNames>(res, { recipeNames });
  });

  router.get("/details/:recipeName", async function (req, res) {
    const { recipeName } = req.params;
    const recipeDetails = await recipeRepository.getRecipeDetails(recipeName);
    send.ok<RecipeDetails | EmptyObject>(res, recipeDetails);
  });

  router.post("/", checkBody, async function (req: Request, res: Response) {
    const sent = validateBody(req, res);
    if (sent) return;

    const recipe = req.body;
    const success = await recipeRepository.insertRecipe(recipe);
    const error = "Recipe already exists";

    clearRecipeNamesCache(success);
    if (success) send.created(res);
    else send.badRequest(res, error);
  });

  router.put("/", checkBody, async function (req: Request, res: Response) {
    const sent = validateBody(req, res);
    if (sent) return;

    const recipe = req.body;
    const success = await recipeRepository.updateRecipe(recipe);
    const error = "Recipe does not exist";

    if (success) send.noContent(res);
    else send.notFound(res, error);
  });

  return router;
}
