import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";
import config from "../config";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const uploadOptimizedImage = async (file: Express.Multer.File) => {
  let initialData = {
    publicId: "",
    url: "",
  };

  if (!file) {
    return initialData;
  }

  const imageBuffer = file.buffer;

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "twitter-facebook-cards",
          transformation: [
            {
              width: 1200,
              height: 628,
              crop: "fill",
              gravity: "auto",
            },
            {
              quality: "auto",
              fetch_format: "auto",
            },
          ],
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      Readable.from(imageBuffer).pipe(stream);
    });

    return {
      publicId: (result as UploadApiResponse)?.public_id,
      url: (result as UploadApiResponse)?.url,
    };
  } catch (error) {
    console.error("Error uploading image:", error);
    return initialData;
  }
};
