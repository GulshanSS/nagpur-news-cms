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
    logger.info("Checking if super admin exists");
    if (users.length === 0) {
      const adminData: CreateUserInput["body"] = {
        email: config.ADMIN_EMAIL,
        password: await hash(config.ADMIN_PASSWORD),
        role: config.ROLE as Role,
      };
      await createUser(adminData);
      logger.info("Super Admin Created");
    }
    next();
  }
);

export default createSuperAdmin;
