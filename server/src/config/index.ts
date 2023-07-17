import { BinaryToTextEncoding } from "crypto";

export default {
  PORT: parseInt(process.env.PORT!) as number,
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
  MAIL_SERVICE: process.env.MAIL_SERVICE as string,
  MAIl_HOST: process.env.MAIl_HOST as string,
  MAIL_PORT: parseInt(process.env.MAIL_PORT as string),
  MAIL_USERNAME: process.env.MAIL_USERNAME as string,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD as string,
  ROLE: process.env.ROLE as string,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
  ADMIN_NAME: process.env.ADMIN_NAME as string,
  EMAIL_TYPE_OTP: process.env.EMAIL_TYPE_OTP as string,
  EMAIL_TYPE_ACCOUNT_CREATION: process.env
    .EMAIL_TYPE_ACCOUNT_CREATION as string,
  CHARACTERS: process.env.CHARACTERS as string,
  PASSWORD_LENGTH: parseInt(process.env.PASSWORD_LENGTH!) as number,
  CMS_URL: process.env.CMS_URL as string,
  EMAIL_TYPE_SEND_RESET_PASSWORD_LINK: process.env
    .EMAIL_TYPE_SEND_RESET_PASSWORD_LINK as string,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME as string,
  AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION as string,
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY as string,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY as string,
};
