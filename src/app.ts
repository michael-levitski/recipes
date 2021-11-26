import express from "express";
import RecipeRouter from "./routes/recipeRouter";
import { AppDependencies } from "./types";

export default function App(dependencies: AppDependencies) {
  const { repository } = dependencies;
  
  const app = express();
  app.use("/recipes", RecipeRouter(repository));
  return app;
}
