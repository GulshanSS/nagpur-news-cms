import crypto from "crypto";
import config from "../config";

const hashGivenString = (data: string): string => {
  return crypto
    .createHash(config.HASHING_ALOGITHM)
    .update(data)
    .digest(config.HASHING_DIGEST);
};

export default hashGivenString;
