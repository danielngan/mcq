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

export const generateQuestions = async (req: GenerationRequest): Promise<Question[]> => {
    const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    });

    if (!response.ok) {
        throw new Error('Failed to generate questions');
    }

    const data = await response.json();
    return data.questions;
};
