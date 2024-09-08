import {
  TwitterApi,
  TwitterApiTokens,
  TwitterApiV2Settings,
} from "twitter-api-v2";
import config from "../config";

TwitterApiV2Settings.deprecationWarnings = false;

const tokens: TwitterApiTokens = {
  appKey: config.TWITTER_API_KEY,
  appSecret: config.TWITTER_API_KEY_SECRET,
  accessToken: config.TWITTER_ACCESS_TOKEN,
  accessSecret: config.TWITTER_ACCESS_TOKEN_SECRET,
};

const client = new TwitterApi(tokens);

export const postToTwitter = async (
  file: Express.Multer.File,
  link: string,
  tweetText: string
) => {
  // const mediaId = await client.v1.uploadMedia(file.buffer, {
  //   type: file.mimetype,
  // });
  return await client.v2.tweet({
    text: `${tweetText} ${link}`,
    // media: {
    //   media_ids: [mediaId],
    // },
  });
};
