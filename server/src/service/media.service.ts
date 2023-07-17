import { Media } from "@prisma/client";
import db from "../utils/db.server";

export const getAllMedia = async () => {
  return await db.media.findMany({});
};

export const getMediaById = async (mediaId: number) => {
  return await db.media.findUnique({
    where: {
      id: mediaId,
    },
  });
};

export const createMedia = async (data: Pick<Media, "type" | "key">) => {
  return await db.media.create({
    data: data,
  });
};
