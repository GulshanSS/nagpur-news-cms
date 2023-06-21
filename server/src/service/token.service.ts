import { User } from "@prisma/client";
import db from "../utils/db.server";
import hashGivenString from "../utils/hashGivenString";

export const whiteListRefreshToken = async (data: {
  refreshToken: string;
  jti: string;
  user: User;
}) => {
  return await db.refreshToken.create({
    data: {
      id: data.jti,
      hashedToken: hashGivenString(data.refreshToken),
      userId: data.user.id,
    },
  });
};

export const getRefreshTokenById = async (refreshTokenId: string) => {
  return await db.refreshToken.findUnique({
    where: {
      id: refreshTokenId,
    },
  });
};

export const revokeRefreshTokenById = async (refreshTokenId: string) => {
  return await db.refreshToken.update({
    where: {
      id: refreshTokenId,
    },
    data: {
      revoked: true,
    },
  });
};

export const checkRefreshTokenAssignedToUser = async (userId: string) => {
  return await db.refreshToken.findMany({
    where: {
      userId: parseInt(userId),
    },
  });
};

export const revokeAllRefreshTokenAssignedToUser = async (userId: string) => {
  return await db.refreshToken.updateMany({
    where: {
      userId: parseInt(userId),
    },
    data: {
      revoked: true,
    },
  });
};

export const deleteAllRefreshTokenAssginedToUser = async (userId: string) => {
  return await db.refreshToken.deleteMany({
    where: {
      userId: parseInt(userId),
    },
  });
};
