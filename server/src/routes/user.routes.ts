import { Router } from "express";
import {
  createUserHandler,
  deleteUserByIdHandler,
  getLoggedInUserHandler,
  getUserByIdHandler,
} from "../controller/user.controller";
import { authorize } from "../middleware/authorize";
import { isAuthenticated } from "../middleware/isAuthenticated";

const UserRouter = Router();

UserRouter.get(
  "/me",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  getLoggedInUserHandler
);
UserRouter.get(
  "/:userId",
  [isAuthenticated, authorize("ADMIN")],
  getUserByIdHandler
);
UserRouter.get(
  "/create",
  [isAuthenticated, authorize("ADMIN")],
  createUserHandler
);
UserRouter.get(
  "/:userId/delete",
  [isAuthenticated, authorize("ADMIN")],
  deleteUserByIdHandler
);

export default UserRouter;
