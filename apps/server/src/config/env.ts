import dotenv from "dotenv";
dotenv.config();

export const env = {
  JWT_SECRET: process.env.JWT_SECRET || "",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || "15m",
  JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || "30d",
};
