import ImageKit from "imagekit";
import config from "../config";

const imageKit = new ImageKit({
  publicKey: config.IMAGE_KIT_PUBLIC_KEY,
  privateKey: config.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: config.IMAGE_KIT_URL_ENDPOINT,
});

export const getSignedUrlIK = (url: string) => {
  return imageKit.url({
    path: `/${url}`,
    queryParameters: {
      v: "1",
    },
    signed: true,
  });
};
