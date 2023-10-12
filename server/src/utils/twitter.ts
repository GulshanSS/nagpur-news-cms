import { TwitterApi, TwitterApiTokens } from "twitter-api-v2";
import config from "../config";

const tokens: TwitterApiTokens = {
  appKey: config.TWITTER_API_KEY,
  appSecret: config.TWITTER_API_KEY_SECRET,
  accessToken: config.TWITTER_ACCESS_TOKEN,
  accessSecret: config.TWITTER_ACCESS_TOKEN_SECRET,
};

const client = new TwitterApi(tokens);

export const postToTwitter = async (link: string, tweetText: string) => {
  return await client.v2.tweet(`${tweetText} ${link}`);
};
