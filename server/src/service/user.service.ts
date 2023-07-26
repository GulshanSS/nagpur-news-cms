import { Role, User } from "@prisma/client";
import { CreateUserInput, UpdateUserInput } from "../schemas/user.schema";
import db from "../utils/db.server";

export const createUser = async (
  user: Pick<User, "email" | "name" | "password"> &
    Partial<Pick<User, "active">>
) => {
  return db.user.create({
    data: user,
  });
};

export const verifyUser = async (userId: string, verified: boolean) => {
  return await db.user.update({
    where: {
      id: parseInt(userId),
    },
    data: {
      verified,
    },
  });
};

export const resetPassword = async (id: string, password: string) => {
  return await db.user.update({
    where: {
      id: parseInt(id),
    },
    data: {
      password,
    },
  });
};

export const updateUserNameOrEmailById = async (
  userId: string,
  user: Partial<UpdateUserInput["body"]>
) => {
  return await db.user.update({
    where: {
      id: parseInt(userId),
    },
    data: user!,
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

export const getUserByRole = async (role: Role) => {
  return await db.user.findMany({
    where: {
      role,
    },
  });
};

export const getAllUsers = async () => {
  return await db.user.findMany({
    where: {
      role: "TEAM",
    },
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
  });
};

export const getUsersByName = async (name: string) => {
  return await db.user.findMany({
    where: {
      role: "TEAM",
      name: {
        contains: name,
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
      {
        updatedAt: "desc",
      },
    ],
  });
};

export const deleteUserById = async (userId: string) => {
  return await db.user.delete({
    where: {
      id: parseInt(userId),
    },
  });
};
