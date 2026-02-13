import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';

export interface Question {
    question: string;
    options: string[];
    answer: string;
}

export interface GenerationRequest {
    subject: string;
    count: number;
    provider: 'openai' | 'claude' | 'gemini' | 'xai';
}

const SYSTEM_PROMPT = `You are an expert educator and exam creator. 
Your task is to generate multiple-choice questions for a given subject.
Return the output strictly as a valid JSON object with the following structure:
{
  "questions": [
    {
      "question": "Question text here. If the question involves code, format it using markdown code blocks (e.g., \`\`\`python ... \`\`\`).",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "Correct Option Text (must match one of the options exactly)"
    }
  ]
}
Do not include any markdown formatting for the JSON itself (like \`\`\`json). Just return the raw JSON string.`;

export async function generateQuestions(req: GenerationRequest): Promise<Question[]> {
    const { subject, count, provider } = req;
    const userPrompt = `Generate ${count} multiple-choice questions about "${subject}".`;

    try {
        let jsonResponse = "";

        if (provider === 'openai' || provider === 'xai') {
            const apiKey = provider === 'xai' ? process.env.XAI_API_KEY : process.env.OPENAI_API_KEY;
            const baseURL = provider === 'xai' ? "https://api.x.ai/v1" : undefined; // Check xAI docs for correct URL if needed, usually compatible with OpenAI SDK

            const openai = new OpenAI({ apiKey, baseURL });

            const completion = await openai.chat.completions.create({
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userPrompt }
                ],
                model: provider === 'xai' ? "grok-3" : "gpt-4o", // Adjust model names as needed
                response_format: { type: "json_object" }
            });

            jsonResponse = completion.choices[0].message.content || "";

        } else if (provider === 'claude') {
            const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

            const msg = await anthropic.messages.create({
                model: "claude-sonnet-4-5-20250929",
                max_tokens: 1024,
                system: SYSTEM_PROMPT,
                messages: [
                    { role: "user", content: userPrompt }
                ]
            });

            // Anthropic's content is an array of content blocks
            const textBlock = msg.content.find(c => c.type === 'text');
            if (textBlock && textBlock.type === 'text') {
                jsonResponse = textBlock.text;
            }

        } else if (provider === 'gemini') {
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", generationConfig: { responseMimeType: "application/json" } });

            const result = await model.generateContent([SYSTEM_PROMPT, userPrompt]);
            jsonResponse = result.response.text();
        }

        // Parse and validate
        const parsed = JSON.parse(jsonResponse);
        if (!parsed.questions || !Array.isArray(parsed.questions)) {
            throw new Error("Invalid JSON structure returned from LLM");
        }
        return parsed.questions;

    } catch (error) {
        console.error("LLM Generation Error:", error);
        throw error;
    }
}
