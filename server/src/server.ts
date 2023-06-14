import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import config from "./config";
import logger from "./utils/logger";
const app = express();

app.get("/test", (req: Request, res: Response) => {
  res.send("Nagpur News API");
});

const PORT = config.PORT;

app.listen(PORT, () => {
  logger.info(`Server listening on http://localhost:${PORT}`);
  logger.info(`Test URI http://localhost:${PORT}/test`);
});
