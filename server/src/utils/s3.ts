import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import config from "../config";
import { getSignedUrl } from "@aws-sdk/cloudfront-signer";
import {
  CloudFrontClient,
  CreateInvalidationCommand,
} from "@aws-sdk/client-cloudfront";

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
  const url = await getSignedUrl({
    url: `${config.CLOUDFRONT_URL}/${key}`,
    dateLessThan: new Date(Date.now() + 1000 * 60 * 60 * 24).toString(),
    privateKey: config.CLOUDFRONT_PRIVATE_KEY,
    keyPairId: config.CLOUDFRONT_KEY_PAIR_ID,
  });
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
