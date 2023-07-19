import { Router } from "express";
import uploader from "../utils/multer";
import {
  getAllMediaHandler,
  updateMediaByIdHandler,
  uploadSingleFileForPromotionaryArticleHandler,
  uploadSingleFileForTestimonialHandler,
} from "../controller/media.Controller";

const MediaRouter = Router();

MediaRouter.get("/", getAllMediaHandler);

MediaRouter.post(
  "/upload/single/testimonial",
  uploader.single("file"),
  uploadSingleFileForTestimonialHandler
);

MediaRouter.post(
  "/upload/single/promotionary-article",
  uploader.single("file"),
  uploadSingleFileForPromotionaryArticleHandler
);

MediaRouter.put("/update", uploader.single("file"), updateMediaByIdHandler);

export default MediaRouter;
