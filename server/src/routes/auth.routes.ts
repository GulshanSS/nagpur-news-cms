import { Router } from "express";
import {
  loginUserHandler,
  logoutHandler,
  refreshTokenHandler,
  resetPasswordByTokenHandler,
  sendRestPasswordLinkHandler,
} from "../controller/auth.controller";
import validateSchema from "../middleware/validateSchema";
import {
  loginUserSchema,
  sendRestPasswordLinkSchema,
} from "../schemas/user.schema";

const AuthRouter = Router();

AuthRouter.post("/login", validateSchema(loginUserSchema), loginUserHandler);
AuthRouter.post(
  "/reset-password-link",
  validateSchema(sendRestPasswordLinkSchema),
  sendRestPasswordLinkHandler
);
AuthRouter.post("/reset-password/:token", resetPasswordByTokenHandler);
AuthRouter.get("/refresh-token", refreshTokenHandler);
AuthRouter.delete("/logout", logoutHandler);

export default AuthRouter;
