import { Router } from "express";
import uploader from "../utils/multer";
import {
  getAllMediaHandler,
  updateMediaByIdHandler,
  uploadSingleFileHandler,
} from "../controller/media.Controller";

const MediaRouter = Router();

MediaRouter.get("/", getAllMediaHandler);

MediaRouter.post(
  "/upload/single",
  uploader.single("file"),
  uploadSingleFileHandler
);

MediaRouter.put("/update", uploader.single("file"), updateMediaByIdHandler);

export default MediaRouter;
