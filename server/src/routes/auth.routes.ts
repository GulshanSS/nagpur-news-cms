import { Router } from "express";
import {
  loginUserHandler,
  logoutHandler,
  refreshTokenHandler,
  registerUserHandler,
} from "../controller/auth.controller";
import validateSchema from "../middleware/validateSchema";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";
import { refreshTokenSchema } from "../schemas/refreshToken.schema";

const AuthRouter = Router();

AuthRouter.post(
  "/register",
  validateSchema(createUserSchema),
  registerUserHandler
);
AuthRouter.post("/login", validateSchema(loginUserSchema), loginUserHandler);
AuthRouter.get(
  "/refresh-token",
  validateSchema(refreshTokenSchema),
  refreshTokenHandler
);
AuthRouter.delete("/logout", logoutHandler);

export default AuthRouter;
