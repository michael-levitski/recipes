import "./env";
import App from "./app";
import * as inMemoryRepository from "./repositories/inMemoryRecipeRepo";
import { Env } from "./types";
import "./repositories/sequelizeRepo"

const { PORT } = process.env as Env;
const app = App({repository: inMemoryRepository});

app.listen(PORT, function () {
  console.log(`${Date()}: Listening on port ${PORT}`);
});
