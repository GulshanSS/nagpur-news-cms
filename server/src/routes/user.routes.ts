import { Router } from "express";
import {
  createUserHandler,
  deleteUserByIdHandler,
  getAllUsersExceptAdminHandler,
  getLoggedInUserHandler,
  getUserByIdHandler,
  getUsersExceptAdminByNameHandler,
  resetPasswordHandler,
  updateUserByIdHandler,
} from "../controller/user.controller";
import { authorize } from "../middleware/authorize";
import { isAuthenticated } from "../middleware/isAuthenticated";
import validateSchema from "../middleware/validateSchema";
import {
  createUserSchema,
  getUserSchema,
  resetPasswordSchema,
  updateUserSchema,
} from "../schemas/user.schema";

const UserRouter = Router();

UserRouter.get(
  "/me",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  getLoggedInUserHandler
);
UserRouter.get(
  "/:userId",
  [isAuthenticated, authorize("ADMIN")],
  validateSchema(getUserSchema),
  getUserByIdHandler
);
UserRouter.get(
  "/",
  [isAuthenticated, authorize("ADMIN")],
  getAllUsersExceptAdminHandler
);
UserRouter.get(
  "/search/:name",
  [isAuthenticated, authorize("ADMIN")],
  getUsersExceptAdminByNameHandler
);
UserRouter.post(
  "/create",
  [isAuthenticated, authorize("ADMIN")],
  validateSchema(createUserSchema),
  createUserHandler
);
UserRouter.put(
  "/:userId",
  [isAuthenticated, authorize("ADMIN")],
  validateSchema(updateUserSchema),
  updateUserByIdHandler
);
UserRouter.patch(
  "/reset-password",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  validateSchema(resetPasswordSchema),
  resetPasswordHandler
);
UserRouter.delete(
  "/:userId/delete",
  [isAuthenticated, authorize("ADMIN")],
  deleteUserByIdHandler
);

export default UserRouter;
