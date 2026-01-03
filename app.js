import { tweet } from "./services/twitterService.js";
import { findTrendingTopicsWithAI, generateTweetWithAI } from "./services/ai.js";

async function main() {
    try {
        //Genrate Trending Topics
        const trendingTopics = await findTrendingTopicsWithAI("technology/coding", "global", 3);
        console.log(trendingTopics.trends);
        //Generate Tweet Content Based on Trending Topics
        const tweetContent = await generateTweetWithAI(trendingTopics.trends);
        console.log("Generated Tweet:", tweetContent, tweetContent.Tweet);
        //Post Tweet to Twitter
        await tweet(tweetContent.Tweet);
    } catch (error) {
        console.error("Error in main execution:", error);
    }
}

main();

