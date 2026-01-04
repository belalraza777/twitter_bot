import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.API_BASE_URL || undefined, // optional override
});

// Function to generate a tweet using AI based on a topic and tone 
const generateTweetWithAI = async (topic) => {
    if (!topic) {
        throw new Error("Topic is required to generate a tweet.");
    }
    if (Array.isArray(topic)) {
        topic = topic.join(" | ");
    }
    if (typeof topic !== "string") {
        throw new Error("Topic must be a string or an array of strings.");
    }


    const systemPrompt = [
        "You are a Twitter bot.",
        "Generate a concise tweet (max 280 characters).",
        "Return ONLY a valid JSON object with keys:",
        "Topic may be string, or array of strings chosen one of the following options.",
        "No politics, sexual content, violence, or controversial topics.",
        "No extra text. No markdown.",
        "No hard word to understand.",
        "More human-like.",
        "Give Open answers.",
        "Use emojis appropriately.",
        "More Human-like and Add Humor.",
    ].join(" ");

    const userPrompt = [
        `Topic: ${topic}`,
        `Tone: "Professional" | "Casual" | "Humorous" | "Inspirational" | "Informative"`,
    ].join("\n");

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            temperature: 0.8,
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
        });

        const raw = response.choices?.[0]?.message?.content;
        if (!raw) {
            throw new Error("No content returned from OpenAI");
        }

        return JSON.parse(raw);
    } catch (error) {
        console.error(
            "Tweet generation error:",
            error?.response?.data || error.message || error
        );
        throw error;
    }
};


// Function to find trending topics using AI
const findTrendingTopicsWithAI = async ({
    category = "technology",
    region = "global",
    limit = 5,
}) => {
    const systemPrompt = [
        "You are a Twitter trend analyzer.",
        "Identify currently trending topics suitable for tweets.",
        "Return ONLY a valid JSON object with keys:",
        "category (string), region (string), trends (array of strings).",
        "No explanations. No extra text.",
    ].join(" ");

    const userPrompt = [
        `Category: ${category}`,
        `Region: ${region}`,
        `Number of trends: ${limit}`,
    ].join("\n");

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            temperature: 0.6,
            response_format: { type: "json_object" },
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
        });

        const raw = response.choices?.[0]?.message?.content;
        if (!raw) {
            throw new Error("No content returned from OpenAI");
        }

        return JSON.parse(raw);
    } catch (error) {
        console.error(
            "Trending topic error:",
            error?.response?.data || error.message || error
        );
        throw error;
    }
};


export { generateTweetWithAI, findTrendingTopicsWithAI };
