import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import config from "./config";
import logger from "./utils/logger";
import CategoryRouter from "./routes/category.routes";
import errorMiddlerware from "./middleware/errorMiddleware";
import AuthRouter from "./routes/auth.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import OtpRouter from "./routes/otp.routes";
import TagRouter from "./routes/tag.routes";

const app = express();

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.json());

app.get("/test", (_: Request, res: Response) => {
  res.send("Nagpur News API");
});

app.use("/api/v1", AuthRouter);
app.use("/api/v1", OtpRouter);
app.use("/api/v1/category", CategoryRouter);
app.use("/api/v1/tag", TagRouter);

app.use(errorMiddlerware);

const PORT = config.PORT;

app.listen(PORT, () => {
  logger.info(`Server listening on http://localhost:${PORT}`);
  logger.info(`Test URI http://localhost:${PORT}/test`);
});
