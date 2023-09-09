import { Router } from "express";
import { getAllTagsHandler, getTagBySlugHandler } from "./tag.controller";

const PublicTagRouter = Router();

PublicTagRouter.get("/", getAllTagsHandler);
PublicTagRouter.get("/:slug", getTagBySlugHandler);

export default PublicTagRouter;
