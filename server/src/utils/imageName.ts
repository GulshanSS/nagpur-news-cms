import crypto from "crypto";

export const randomImageName = (bytpes = 32) =>
  crypto.randomBytes(bytpes).toString("hex");
