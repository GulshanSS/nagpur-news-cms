import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import config from "../config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";
import { watermarkImage } from "./sharp";

const s3 = new S3Client({
  region: config.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
});

const cloudFront = new CloudFrontClient({
  region: config.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
});

export const invalidateCloudFrontCache = async (key: string) => {
  const invalidateParams = {
    DistributionId: config.CLOUDFRONT_DISTRIBUTION_ID,
    InvalidationBatch: {
      CallerReference: key,
      Paths: {
        Quantity: 1,
        Items: ["/" + key],
      },
    },
  };

  const invalidationCommand = new CreateInvalidationCommand(invalidateParams);
  await cloudFront.send(invalidationCommand);
};

export const getSignedUrlForMedia = async (key: string) => {

  // Get SignedUrl from Cloudfront

  // const url = await getSignedUrl({
  //   url: `${config.CLOUDFRONT_URL}/${key}`,
  //   dateLessThan: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
  //   privateKey: config.CLOUDFRONT_PRIVATE_KEY,
  //   keyPairId: config.CLOUDFRONT_KEY_PAIR_ID,
  // });

  // Get SignedUrl from S3

  const command = new GetObjectCommand({
    Bucket: config.AWS_BUCKET_NAME,
    Key: key,
  })

  const url = getSignedUrl(s3, command);

  return url;
};

export const uploadSingleFile = async (
  file: Express.Multer.File,
  imageName: string
) => {
  const imageBuffer = await watermarkImage(file);

  const params = {
    Bucket: config.AWS_BUCKET_NAME,
    Key: imageName,
    Body: imageBuffer ? imageBuffer : file.buffer,
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
