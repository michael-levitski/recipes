import NodeCache from "node-cache";
import { Request, Response, NextFunction as Next } from "express";
import { ok } from "./httpResponseCode";

const cache = new NodeCache();
const key = "recipeNames";

export function cacheRecipeNames(req: Request, res: Response, next: Next) {
  if (req.method !== "GET") return next();

  const recipeNames = cache.get<string[]>(key);

  if (recipeNames) {
    console.log("cache hit for recipeNames");
    ok(res, { recipeNames });
    return;
  }

  console.log("cache miss for recipeNames");
  const { send } = res;

  res.send = function (body: any) {
    if (typeof body !== "string") {
      cache.set(key, body.recipeNames);
    }
    return send.call(res, body);
  };

  next();
}

export function clearRecipeNamesCache(success: boolean) {
  console.log("cache cleared");
  if (success) cache.del(key);
}
