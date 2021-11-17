import { Response } from "express";

enum StatusCode {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  NotFound = 404
}

function sendResponse<T>(res: Response<T>, code: StatusCode, body?: T) {
  res.status(code).json(body);
}

function sendError(res: Response, code: StatusCode, error?: string) {
  error = error ?? "error";
  sendResponse(res, code, { error });
}

function sendNoResponseBody(res: Response, code: StatusCode) {
  res.sendStatus(code)
}

export function noContent(res: Response) {
  sendNoResponseBody(res, StatusCode.NoContent)
}

export function badRequest(res: Response, errorMsg?: string) {
  sendError(res, StatusCode.BadRequest, errorMsg);
}

export function notFound(res: Response, errorMsg?: string) {
  sendError(res, StatusCode.NotFound, errorMsg);
}

export function ok<T>(res: Response, body?: T) {
  sendResponse(res, StatusCode.Ok, body);
}

export function created<T>(res: Response) {
  sendNoResponseBody(res, StatusCode.Created)
}
