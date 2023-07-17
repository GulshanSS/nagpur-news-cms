import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import config from "../config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: config.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
});

export const getSignedUrlForMedia = async (key: string) => {
  const params = {
    Bucket: config.AWS_BUCKET_NAME,
    Key: key,
  };
  const command = new GetObjectCommand(params);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return url;
};

export const uploadSingleFile = async (
  file: Express.Multer.File,
  imageName: string
) => {
  const params = {
    Bucket: config.AWS_BUCKET_NAME,
    Key: imageName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);

  return await s3.send(command);
};

export const deleteFileByKey = async (key: string) => {
  const params = {
    Bucket: config.AWS_BUCKET_NAME,
    Key: key,
  };

  const command = new DeleteObjectCommand(params);
  return await s3.send(command);
};
