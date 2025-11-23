import { Request, Response, NextFunction } from "express";
import { signupSchema, signinSchema, refreshSchema } from "./auth.validation";
import {
  signupService,
  signinService,
  rotateRefreshToken,
  revokeRefreshToken,
} from "./auth.service";
import { formatZodErrors } from "../utils/zodFormatter";
import { SuccessResponse, ErrorResponse } from "../utils/apiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { prisma } from "../db/prisma";

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const parsed = signupSchema.safeParse(req.body);
  if (!parsed.success)
    return res
      .status(400)
      .json(
        ErrorResponse(
          400,
          "VALIDATION_ERROR",
          "Invalid input",
          formatZodErrors(parsed.error.issues)
        )
      );

  const result = await signupService(parsed.data);
  return res.status(201).json(SuccessResponse(201, "User created", result.user , result.tokens));
});

export const signin = asyncHandler(async (req: Request, res: Response) => {
  const parsed = signinSchema.safeParse(req.body);
  if (!parsed.success)
    return res
      .status(400)
      .json(
        ErrorResponse(
          400,
          "VALIDATION_ERROR",
          "Invalid input",
          formatZodErrors(parsed.error.issues)
        )
      );

  const result = await signinService({
    identifier: parsed.data.identifier,
    password: parsed.data.password,
  });
  return res
    .status(200)
    .json(SuccessResponse(200, "Signin successful",result.user,result.tokens));
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const parsed = refreshSchema.safeParse(req.body);
    if (!parsed.success)
      return res
        .status(400)
        .json(
          ErrorResponse(
            400,
            "VALIDATION_ERROR",
            "Invalid input",
            formatZodErrors(parsed.error.issues)
          )
        );

    const payload: any = require("jsonwebtoken").verify(
      parsed.data.refreshToken,
      require("../config/env").env.JWT_REFRESH_SECRET
    );
    const stored = await prisma.refreshToken.findUnique({
      where: { token: parsed.data.refreshToken },
    });
    if (!stored)
      return res
        .status(401)
        .json(ErrorResponse(401, "INVALID_TOKEN", "Refresh token invalid"));

    const newToken = await rotateRefreshToken(
      parsed.data.refreshToken,
      payload.id
    );
    return res
      .status(200)
      .json(SuccessResponse(200, "Token rotated", { refreshToken: newToken }));
  }
);

export const signout = asyncHandler(async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) await revokeRefreshToken(token);
  return res.status(200).json(SuccessResponse(200, "Signed out", null));
});
