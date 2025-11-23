import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";
import { ErrorResponse } from "./apiResponse";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Global Error:", err);

  if (err instanceof AppError) {
    return res
      .status(err.status)
      .json(
        ErrorResponse(err.status, err.code, err.message, err.details || [])
      );
  }

  return res
    .status(500)
    .json(ErrorResponse(500, "SERVER_ERROR", "Internal server error", []));
};
