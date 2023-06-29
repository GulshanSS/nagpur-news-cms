import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
  createUser,
  deleteUserById,
  getUserById,
} from "../service/user.service";
import { AppError, HttpCode } from "../exceptions/AppError";
import { CreateUserInput } from "../schemas/user.schema";
import { hash } from "../utils/bcrypt";
import { Role } from "@prisma/client";

export const getLoggedInUserHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = res.locals.userId;
    const foundUser = await getUserById(userId);
    if (!foundUser) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User Not Found",
        })
      );
    }
    return res.status(HttpCode.OK).json({
      success: true,
      user: {
        id: foundUser.id,
        email: foundUser.email,
        verified: foundUser.verified,
      },
    });
  }
);

export const getUserByIdHandler = asyncHandler(
  async (
    req: Request<{ userId: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.params.userId;
    const foundUser = await getUserById(userId);
    if (!foundUser) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User Not Found",
        })
      );
    }

    const { password, ...user } = foundUser;

    return res.status(HttpCode.OK).json({
      success: true,
      user,
    });
  }
);

export const createUserHandler = asyncHandler(
  async (
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const data = req.body;
    const createUserInput = {
      ...data,
      password: await hash(data.password),
      role: "TEAM" as Role,
    };
    await createUser(createUserInput);

    return res.status(HttpCode.CREATED).json({
      success: true,
      message: "User created Successful",
    });
  }
);

export const deleteUserByIdHandler = asyncHandler(
  async (
    req: Request<{ userId: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.params.userId;
    const foundUser = await getUserById(userId);
    if (!foundUser) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User not found",
        })
      );
    }
    await deleteUserById(userId);
    return res.status(HttpCode.OK).json({
      success: true,
      message: `User delete successfully with email ${foundUser.email}`,
    });
  }
);
