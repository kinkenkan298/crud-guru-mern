import type { Response } from "express";

export enum MessageType {
  SUCCESS = "success",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
}
export interface APIResponse<T = unknown> {
  res: Response;
  success?: boolean;
  message?: string;
  error?: string;
  data: T;
  statusCode: number;
  type: MessageType;
}

const successResponse = <T>({
  res,
  message,
  data,
  success = true,
  statusCode = 200,
  type = MessageType.SUCCESS,
}: APIResponse<T>): Response => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    type,
  } as APIResponse<T>);
};
const errorResponse = <T>(
  res: Response,
  message: string,
  data: T,
  statusCode = 500,
  type = MessageType.ERROR,
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    data,
    type,
  } as APIResponse<T>);
};

export { errorResponse, successResponse };
