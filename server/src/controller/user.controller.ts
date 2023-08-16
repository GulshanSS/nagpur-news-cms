import { Request, Response, NextFunction } from "express";
import asyncHandler from "../middleware/asyncHandler";
import {
  createUser,
  deleteUserById,
  getUserById,
  verifyUser,
  updateUserNameOrEmailById,
  getUsersByName,
  getUserByEmail,
  resetPassword,
  getAllUsers,
} from "../service/user.service";
import { AppError, HttpCode } from "../exceptions/AppError";
import {
  CreateUserInput,
  ResetPasswordInput,
  UpdateUserInput,
} from "../schemas/user.schema";
import { hash } from "../utils/bcrypt";
import { Role } from "@prisma/client";
import { sendEmail } from "../utils/email";
import config from "../config";
import { generatePassword } from "../utils/password";
import db from "../utils/db.server";

export const getLoggedInUserHandler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId: string = res.locals.payload.userId;
    const foundUser = await getUserById(userId);
    if (!foundUser) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User Not Found",
        })
      );
    }
    const { password, ...rest } = foundUser;
    return res.status(HttpCode.OK).json({
      success: true,
      user: rest,
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

export const getAllUsersExceptAdminHandler = asyncHandler(
  async (
    req: Request<{}, {}, {}, { page?: string; limit?: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const userId: string = res.locals.payload.userId;

    const page = req.query.page ? parseInt(req.query.page) : config.CURR_PAGE;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : config.PAGE_LIMIT;
    const skip = (page - 1) * limit;
    const total = await db.user.count({
      where: {
        id: {
          not: parseInt(userId),
        },
        name: {
          not: {
            contains: config.ADMIN_NAME,
          },
        },
      },
    });

    if (total === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "No users found",
        })
      );
    }

    const pages = Math.ceil(total / limit);

    if (page > pages || page <= 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "No Page Found",
        })
      );
    }

    const users = await getAllUsers(userId, skip, limit);

    return res.status(HttpCode.OK).json({
      success: true,
      users,
      count: total,
      page,
      pages,
    });
  }
);

export const getUsersExceptAdminByNameHandler = asyncHandler(
  async (
    req: Request<{ name: string }, {}, {}, { page?: string; limit?: string }>,
    res: Response,
    next: NextFunction
  ) => {
    const userId: string = res.locals.payload.userId;
    const name = req.params.name;

    const page = req.query.page ? parseInt(req.query.page) : config.CURR_PAGE;
    const limit = req.query.limit
      ? parseInt(req.query.limit)
      : config.PAGE_LIMIT;
    const skip = (page - 1) * limit;
    const total = await db.user.count({
      where: {
        id: {
          not: parseInt(userId),
        },
        name: {
          contains: name,
          not: {
            contains: config.ADMIN_NAME,
          },
        },
      },
    });

    if (total === 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: `User not found with name ${name}`,
        })
      );
    }

    const pages = Math.ceil(total / limit);

    if (page > pages || page <= 0) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "No Page Found",
        })
      );
    }

    const users = await getUsersByName(userId, name, skip, limit);

    return res.status(HttpCode.OK).json({
      success: true,
      users,
      count: users.length,
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
    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
      return next(
        new AppError({
          httpCode: HttpCode.BAD_REQUEST,
          description: `User with ${existingUser.email} is already in use`,
        })
      );
    }
    const password = generatePassword();
    const createUserInput = {
      name: data.name,
      email: data.email,
      active: data.active,
      password: await hash(password),
      role: data.setAsAdmin ? ("ADMIN" as Role) : ("TEAM" as Role),
    };
    const user = await createUser(createUserInput);
    await sendEmail(user.email, password, config.EMAIL_TYPE_ACCOUNT_CREATION);
    return res.status(HttpCode.CREATED).json({
      success: true,
      message: `User created successfully with ${user.email}`,
    });
  }
);

export const resetPasswordHandler = asyncHandler(
  async (
    req: Request<{}, {}, ResetPasswordInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const userId: string = res.locals.payload.userId;
    const existingUser = await getUserById(userId);
    console.log(existingUser);
    if (!existingUser) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User Not Found",
        })
      );
    }
    const hashedPassword = await hash(req.body.password);
    await resetPassword(userId, hashedPassword);
    return res.status(HttpCode.OK).json({
      success: true,
      message: `Password Reset Successfully`,
    });
  }
);

export const updateUserByIdHandler = asyncHandler(
  async (
    req: Request<UpdateUserInput["params"], {}, UpdateUserInput["body"]>,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.params.userId;
    const existingUser = await getUserById(userId);
    if (!existingUser) {
      return next(
        new AppError({
          httpCode: HttpCode.NOT_FOUND,
          description: "User not found",
        })
      );
    }
    const data = req.body;
    if (data?.email) {
      await verifyUser(userId, false);
    }
    await updateUserNameOrEmailById(userId, data);
    return res.status(HttpCode.OK).json({
      success: true,
      message: "User Successfully Updated",
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
