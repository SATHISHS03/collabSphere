import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "./token.service";
import { Errors } from "../errors/errorFactory";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;
    if (!header) return next(Errors.Unauthorized());
    const token = header.split(" ")[1];
    const payload = verifyAccessToken(token);
    (req as any).user = payload;
    next();
  } catch (err: any) {
    next(Errors.Unauthorized());
  }
};
