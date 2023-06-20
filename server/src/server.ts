import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import config from "./config";
import logger from "./utils/logger";
import CategoryRouter from "./routes/category.routes";
import errorMiddlerware from "./middleware/errorMiddleware";
const app = express();

app.use(express.json());

app.get("/test", (_: Request, res: Response) => {
  res.send("Nagpur News API");
});

app.use("/api/v1/category", CategoryRouter);

app.use(errorMiddlerware);

const PORT = config.PORT;

app.listen(PORT, () => {
  logger.info(`Server listening on http://localhost:${PORT}`);
  logger.info(`Test URI http://localhost:${PORT}/test`);
});
