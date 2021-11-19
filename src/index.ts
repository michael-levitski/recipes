import App from "./app";
import * as recipeRepository from "./data/inMemoryRecipeRepo";
import { Env } from "./types";

const { PORT } = process.env as Env;
const app = App(recipeRepository);

app.listen(PORT, function () {
  console.log(`${Date()}: Listening on port ${PORT}`);
});
