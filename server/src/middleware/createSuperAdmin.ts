import { Request, Response, NextFunction } from "express";
import asyncHandler from "./asyncHandler";
import config from "../config";
import { createUser, getUserByRole } from "../service/user.service";
import { Role } from "@prisma/client";
import { CreateUserInput } from "../schemas/user.schema";
import { hash } from "../utils/bcrypt";
import logger from "../utils/logger";

const createSuperAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const role = config.ROLE as Role;
    const users = await getUserByRole(role);
    if (users.length === 0) {
      const adminData: CreateUserInput["body"] & {
        password: string;
        role: Role;
      } = {
        name: config.ADMIN_NAME,
        email: config.ADMIN_EMAIL,
        password: await hash(config.ADMIN_PASSWORD),
        role: config.ROLE as Role,
      };
      await createUser(adminData);
    }
    next();
  }
);

export default createSuperAdmin;
