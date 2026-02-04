import type { NextFunction, Request, Response } from "express";
import { logger } from "logger";
import { errorResponse } from "../utils/apiResponse";
import { HttpException } from "../utils/httpException";

export const errorHandler = (
  err: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof HttpException) {
    errorResponse(res, err.message, err.status);
    return;
  }

  logger.error("Unexpected error: " + err);
  errorResponse(res, "Internal Server Error", 500);
};
