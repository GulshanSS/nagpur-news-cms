import { Router } from "express";
import { isAuthenticated } from "../middleware/isAuthenticated";
import { authorize } from "../middleware/authorize";
import {
  createTagHandler,
  deleteTagByIdHandler,
  getAllTagsHandler,
  getTagByIdHandler,
  getTagByNameHandler,
  updateTagByIdHandler,
} from "../controller/tag.controller";
import validateSchema from "../middleware/validateSchema";
import {
  createTagSchema,
  deleteTagSchema,
  getTagSchema,
  updateTagSchema,
} from "../schemas/tag.schema";

const TagRouter = Router();

TagRouter.get(
  "/",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  getAllTagsHandler
);

TagRouter.get(
  "/:tagId",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  validateSchema(getTagSchema),
  getTagByIdHandler
);

TagRouter.get(
  "/search/:name",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  getTagByNameHandler
);

TagRouter.post(
  "/create",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  validateSchema(createTagSchema),
  createTagHandler
);

TagRouter.put(
  "/:tagId/update",
  [isAuthenticated, authorize("ADMIN", "TEAM")],
  validateSchema(updateTagSchema),
  updateTagByIdHandler
);

TagRouter.delete(
  "/:tagId/delete",
  [isAuthenticated, authorize("ADMIN")],
  validateSchema(deleteTagSchema),
  deleteTagByIdHandler
);

export default TagRouter;
