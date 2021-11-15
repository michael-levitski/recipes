import {
  checkSchema,
  validationResult as result,
  Schema,
  ParamSchema
} from "express-validator";

const isString: ParamSchema = { isString: true };

const isStringArray: ParamSchema = {
  isArray: true,
  custom: {
    options(array: unknown[]) {
      return array.every((e) => typeof e === "string");
    }
  }
};

export const recipeSchema: Schema = {
  name: isString,
  ingredients: isStringArray,
  instructions: isStringArray
};

export const checkBody = checkSchema(recipeSchema, ["body"]);

export const validationResult = result;
