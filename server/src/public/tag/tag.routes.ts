import { Router } from "express";
import { getAllTagsHandler, getTagByIdHandler } from "./tag.controller";
import validateSchema from "../../middleware/validateSchema";
import { getTagSchema } from "../../schemas/tag.schema";

const PublicTagRouter = Router();

PublicTagRouter.get("/", getAllTagsHandler);
PublicTagRouter.get("/:tagId", validateSchema(getTagSchema), getTagByIdHandler);

export default PublicTagRouter;
