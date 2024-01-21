import type { NextApiRequest, NextApiResponse } from "next";
import { OpenAI } from 'openai'

const configuration = new OpenAI({
  apiKey: "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",
  dangerouslyAllowBrowser : true
}); 

export default async function queryData(info: any) {
    const completion = await configuration.chat.completions.create({
        messages: [{ role: "system", content: info }],
        model: "gpt-4-1106-preview"
        //response_format: {"type": "json_object"}
    });
    
    return completion
}

