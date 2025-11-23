import { prisma } from "../db/prisma";
import { SignupDTO, SigninDTO } from "./auth.types";
import { hashPassword, comparePassword } from "./auth.utils";
import { generateAccessToken, generateRefreshToken } from "./token.service";
import { Errors } from "../errors/errorFactory";

export const signupService = async (data: SignupDTO) => {
  const existing = await prisma.user.findFirst({
    where: { OR: [{ email: data.email }, { username: data.username }] },
  });
  if (existing) {
    const field = existing.email === data.email ? "email" : "username";
    throw Errors.Conflict(`${field} already exists`);
  }

  const hashed = await hashPassword(data.password);
  const user = await prisma.user.create({
    data: { username: data.username, email: data.email, passwordHash: hashed },
    select: { id: true, username: true, email: true },
  });

  const tokens = {
    accessToken: generateAccessToken({ id: user.id }),
    refreshToken: generateRefreshToken({ id: user.id }),
  };
  await prisma.refreshToken.create({
    data: { token: tokens.refreshToken, userId: user.id },
  });

  return { user, tokens };
};

export const signinService = async (data: SigninDTO) => {
  const user = await prisma.user.findFirst({
    where: { OR: [{ email: data.identifier }, { username: data.identifier }] },
  });
  if (!user) throw Errors.InvalidCredentials();

  const ok = await comparePassword(data.password, user.passwordHash);
  if (!ok) throw Errors.InvalidCredentials();

  const tokens = {
    accessToken: generateAccessToken({ id: user.id }),
    refreshToken: generateRefreshToken({ id: user.id }),
  };
  await prisma.refreshToken.create({
    data: { token: tokens.refreshToken, userId: user.id },
  });

  return {
    user: { id: user.id, username: user.username, email: user.email },
    tokens,
  };
};

export const revokeRefreshToken = async (token: string) => {
  await prisma.refreshToken.deleteMany({ where: { token } });
};
export const rotateRefreshToken = async (oldToken: string, userId: string) => {
  await prisma.refreshToken.deleteMany({ where: { token: oldToken } });
  const newToken = generateRefreshToken({ id: userId });
  await prisma.refreshToken.create({ data: { token: newToken, userId } });
  return newToken;
};
