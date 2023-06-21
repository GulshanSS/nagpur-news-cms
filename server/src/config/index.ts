import { BinaryToTextEncoding } from "crypto";

export default {
  PORT: parseInt(process.env.PORT!) as Number,
  HASHING_ALOGITHM: process.env.HASHING_ALGORITHM as string,
  HASHING_DIGEST: process.env.HASHING_DIGEST as BinaryToTextEncoding,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET as string,
  JWT_ACCESS_TOKEN_EXPIRE_TIME: process.env
    .JWT_ACCESS_TOKEN_EXPIRE_TIME as string,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET as string,
  JWT_REFRESH_TOKEN_EXPIRE_TIME: process.env
    .JWT_REFRESH_TOKEN_EXPIRE_TIME as string,
  SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS as string),
  ACCESS_TOKEN_COOKIE_EXPIRE_TIME: parseInt(
    process.env.ACCESS_TOKEN_COOKIE_EXPIRE_TIME as string
  ),
  REFRESH_TOKEN_COOKIE_EXPIRE_TIME: parseInt(
    process.env.ACCESS_TOKEN_COOKIE_EXPIRE_TIME as string
  ),
};
