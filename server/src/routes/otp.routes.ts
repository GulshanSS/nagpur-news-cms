import { Router } from "express";
import { sendOtpHandler, verifyOtpHandler } from "../controller/otp.controller";
import validateSchema from "../middleware/validateSchema";
import { sendOtpSchema, verifyOtpSchema } from "../schemas/otp.schema";

const OtpRouter = Router();

OtpRouter.post("/send-otp", validateSchema(sendOtpSchema), sendOtpHandler);
OtpRouter.post(
  "/verify-otp",
  validateSchema(verifyOtpSchema),
  verifyOtpHandler
);

export default OtpRouter;
