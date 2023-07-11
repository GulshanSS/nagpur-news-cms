import db from "../utils/db.server";
import hashGivenString from "../utils/hashGivenString";

export const getTokenByUserId = async (userId: number) => {
  return db.token.findUnique({
    where: {
      userId: userId,
    },
  });
};

export const createToken = async (token: string, userId: number) => {
  return db.token.create({
    data: {
      hashedToken: hashGivenString(token),
      userId,
    },
  });
};

export const updateToken = async (token: string, userId: number) => {
  return db.token.update({
    where: {
      userId,
    },
    data: {
      hashedToken: hashGivenString(token),
    },
  });
};

export const deleteToken = async (id: number) => {
  return db.token.delete({
    where: {
      id,
    },
  });
};
