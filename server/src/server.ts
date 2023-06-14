import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import config from "./config";
const app = express();

app.get("/test", (req: Request, res: Response) => {
  res.send("Nagpur News API");
});

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log("server started");
});
