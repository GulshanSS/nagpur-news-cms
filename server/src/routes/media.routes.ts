import { Router } from "express";
import uploader from "../utils/multer";
import {
  getAllMediaHandler,
  uploadSingleFileHandler,
} from "../controller/media.Controller";

const MediaRouter = Router();

MediaRouter.get("/", getAllMediaHandler);

MediaRouter.post(
  "/upload/single",
  uploader.single("file"),
  uploadSingleFileHandler
);

export default MediaRouter;
