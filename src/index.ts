import App from "./app";
import * as recipeRepository from "./data/inMemoryRecipeRepo";
import { Env } from "./types";

const app = App(recipeRepository);
const { PORT } = process.env as Env;

app.listen(PORT, function () {
  console.log(`${Date()}: Listening on port ${PORT}`);
});
