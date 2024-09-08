import { URLSearchParams } from "url";
import config from "../config";

const FACEBOOK_POST_URL = `${config.FACEBOOK_POST_BASE_URL}/${config.FACEBOOK_PAGE_ID}`;

export const postToFacebookPage = async (
  file: Express.Multer.File,
  link: string,
  message: string
) => {

  const feedResponse = await fetch(`${FACEBOOK_POST_URL}/feed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
      link: link,
      access_token: config.FACEBOOK_PAGE_ACCESS_TOKEN,
    }),
  });

  const photoData = await feedResponse.json();

  console.log(photoData);
};
