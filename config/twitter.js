import dotenv from "dotenv";
dotenv.config();
import { TwitterApi } from "twitter-api-v2";

// Create a Twitter API client using OAuth 1.0a User Context
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,         // API Key
  appSecret: process.env.TWITTER_API_SECRET,   // API Secret
  accessToken: process.env.TWITTER_ACCESS_TOKEN, // Access Token
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET, // Access Token Secret
});

// Create scoped clients for different API versions
const twitterV1 = twitterClient.v1;       // v1.1 (media upload, legacy endpoints)
const twitterV2 = twitterClient.v2;       // v2 (tweets, users, timelines)
const twitterRO = twitterClient.readOnly; // Read-only client

// Export clients for reuse across the app
export {
  twitterClient,
  twitterV1,
  twitterV2,
  twitterRO,
};
