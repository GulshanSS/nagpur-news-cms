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
  CLOUDFRONT_URL: process.env.CLOUDFRONT_URL as string,
  CLOUDFRONT_PRIVATE_KEY: process.env.CLOUDFRONT_PRIVATE_KEY as string,
  CLOUDFRONT_KEY_PAIR_ID: process.env.CLOUDFRONT_KEY_PAIR_ID as string,
  CLOUDFRONT_DISTRIBUTION_ID: process.env.CLOUDFRONT_DISTRIBUTION_ID as string,
  PAGE_LIMIT: parseInt(process.env.PAGE_LIMIT as string),
  CURR_PAGE: parseInt(process.env.CURR_PAGE as string),
  IMAGE_KIT_PRIVATE_KEY: process.env.IMAGE_KIT_PRIVATE_KEY as string,
  IMAGE_KIT_PUBLIC_KEY: process.env.IMAGE_KIT_PUBLIC_KEY as string,
  IMAGE_KIT_URL_ENDPOINT: process.env.IMAGE_KIT_URL_ENDPOINT as string,
  TWITTER_API_KEY: process.env.TWITTER_API_KEY as string,
  TWITTER_API_KEY_SECRET: process.env.TWITTER_API_KEY_SECRET as string,
  TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN as string,
  TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN as string,
  TWITTER_ACCESS_TOKEN_SECRET: process.env
    .TWITTER_ACCESS_TOKEN_SECRET as string,
  FACEBOOK_PAGE_ACCESS_TOKEN: process.env.FACEBOOK_PAGE_ACCESS_TOKEN as string,
  FACEBOOK_PAGE_ID: process.env.FACEBOOK_PAGE_ID as string,
  FACEBOOK_POST_BASE_URL: process.env.FACEBOOK_POST_BASE_URL as string,
  NAGPUR_NEWS_URI: process.env.NAGPUR_NEWS_URI as string,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME as string,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY as string,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET as string,
  CLOUDINARY_API_URL: process.env.CLOUDINARY_API_URL as string,
};
