import * as jwt from "jsonwebtoken";
import { env } from "../config/env";

const ACCESS_EXPIRES = env.JWT_EXPIRATION;
const REFRESH_EXPIRES = env.JWT_REFRESH_EXPIRATION;

export const generateAccessToken = (payload: object) =>
  jwt.sign(payload, env.JWT_SECRET as jwt.Secret, {
    expiresIn: ACCESS_EXPIRES as jwt.SignOptions["expiresIn"],
  });
export const generateRefreshToken = (payload: object) =>
  jwt.sign(payload, env.JWT_REFRESH_SECRET as jwt.Secret, {
    expiresIn: REFRESH_EXPIRES as jwt.SignOptions["expiresIn"],
  });
export const verifyAccessToken = (token: string) =>
  jwt.verify(token, env.JWT_SECRET as jwt.Secret) as any;
export const verifyRefreshToken = (token: string) =>
  jwt.verify(token, env.JWT_REFRESH_SECRET as jwt.Secret) as any;
