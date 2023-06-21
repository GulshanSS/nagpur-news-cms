import { CreateUserInput, UpdateUserInput } from "../schemas/user.schema";
import db from "../utils/db.server";

export const createUser = async (user: CreateUserInput["body"]) => {
  return db.user.create({
    data: user,
  });
};

export const updateUserById = async (
  userId: string,
  user: UpdateUserInput["body"]
) => {
  return await db.user.update({
    where: {
      id: parseInt(userId),
    },
    data: user,
  });
};

export const getUserById = async (userId: string) => {
  return await db.user.findUnique({
    where: {
      id: parseInt(userId),
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
};

export const getAllUsers = async () => {
  return await db.user.findMany({
    where: {
      role: "TEAM",
    },
  });
};

export const deleteUserById = async (userId: string) => {
  return await db.user.delete({
    where: {
      id: parseInt(userId),
    },
  });
};
