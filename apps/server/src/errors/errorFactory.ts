import { AppError } from "./AppError";

export const Errors = {
  ValidationError: (details: any[] = []) =>
    new AppError(400, "VALIDATION_ERROR", "Invalid input data", details),
  Unauthorized: (message = "Unauthorized") =>
    new AppError(401, "UNAUTHORIZED", message),
  InvalidCredentials: () =>
    new AppError(
      401,
      "INVALID_CREDENTIALS",
      "Invalid email/username or password"
    ),
  Conflict: (message = "Conflict") => new AppError(409, "CONFLICT", message),
  NotFound: (message = "Not found") => new AppError(404, "NOT_FOUND", message),
  ServerError: (message = "Internal server error") =>
    new AppError(500, "SERVER_ERROR", message),
};
