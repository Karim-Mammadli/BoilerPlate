import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from 'openai'

const configuration = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function queryData(info: any) {
    const completion = await configuration.chat.completions.create({
        messages: [{ role: "system", content: info }],
        model: "gpt-4",
    });
    
    return completion
}

