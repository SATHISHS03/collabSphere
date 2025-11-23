import { ZodIssue } from "zod";

export const formatZodErrors = (issues: ZodIssue[]) =>
  issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
    code: issue.code.toUpperCase(),
  }));
