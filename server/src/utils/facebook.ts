import { URLSearchParams } from "url";
import config from "../config";

const FACEBOOK_POST_URL = `${config.FACEBOOK_POST_BASE_URL}/${config.FACEBOOK_PAGE_ID}/feed`;

const queryParameter = new URLSearchParams({
  access_token: config.FACEBOOK_PAGE_ACCESS_TOKEN,
});

export const postToFacebookPage = async (link: string, message: string) => {
  return await fetch(`${FACEBOOK_POST_URL}?${queryParameter.toString()}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      link,
    }),
  });
};
