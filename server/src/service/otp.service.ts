import db from "../utils/db.server";
import hashGivenString from "../utils/hashGivenString";

export const createOtp = async (userId: string, otp: string) => {
  return await db.oneTimePasscode.create({
    data: {
      userId: parseInt(userId),
      hashedOTP: hashGivenString(otp),
    },
  });
};

export const updateOtp = async (userId: string, otp: string) => {
  return await db.oneTimePasscode.update({
    where: {
      userId: parseInt(userId),
    },
    data: {
      hashedOTP: hashGivenString(otp),
    },
  });
};

export const getOtp = async (userId: string) => {
  return await db.oneTimePasscode.findUnique({
    where: {
      userId: parseInt(userId),
    },
  });
};

export const deleteOtp = async (userId: string) => {
  return await db.oneTimePasscode.delete({
    where: {
      userId: parseInt(userId),
    },
  });
};
