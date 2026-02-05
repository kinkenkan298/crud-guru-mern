import type { NextFunction, Request, Response } from "express";
import { logger } from "logger";
import { ZodError } from "zod";
import { errorResponse, MessageType } from "../utils/apiResponse";
import { HttpException } from "../utils/httpException";

export const errorHandler = (
  err: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof HttpException) {
    errorResponse({
      res,
      message: err.message,
      statusCode: err.status,
      data: null,
      type: MessageType.ERROR,
    });
    return;
  }

  if (err instanceof ZodError) {
    const errors = err.issues.map((error) => ({
      field: error.path.join("."),
      message: error.message,
      code: error.code,
    }));
    logger.error({
      error: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      ip: req.ip,
      body: req.body,
      params: req.params,
      query: req.query,
    });
    errorResponse({
      res,
      message: "Validation error",
      statusCode: 400,
      data: errors,
      type: MessageType.ERROR,
    });
    return;
  }

  logger.error(
    {
      error: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method,
      ip: req.ip,
      body: req.body,
      params: req.params,
      query: req.query,
    },
    "Error occurred",
  );
  errorResponse({
    res,
    message: "Internal Server Error",
    statusCode: 500,
    data: null,
    type: MessageType.ERROR,
  });
};
