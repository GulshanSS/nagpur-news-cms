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

export const createMedia = async (
  data: Pick<Media, "type" | "key" | "testimonialId">
) => {
  return await db.media.create({
    data: data,
  });
};

export const updateMedia = async (
  mediaId: number,
  data: Pick<Media, "key" | "type">
) => {
  return await db.media.update({
    where: {
      id: mediaId,
    },
    data,
  });
};
