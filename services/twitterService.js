import { twitterV2 } from "../config/twitter.js";

// Function to post a tweet
export async function tweet(text) {
  try {
    return await twitterV2.tweet(text);
  } catch (error) {
    console.error(" Failed to tweet:", error);
    throw error;
  }
}

// Function to get a user's tweets by user ID
export async function getUserTweets(userId, max = 10) {
  return twitterV2.userTimeline(userId, {
    max_results: max,
  });
}
