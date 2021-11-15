import express from "express";
import RecipeRouter from "./routes/recipeRouter";
import { RecipeRepository } from "./types";

export default function App(recipeRepository: RecipeRepository) {
  const app = express();
  app.use("/recipes", RecipeRouter(recipeRepository));
  return app;
}
