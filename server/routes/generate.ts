import { Router } from 'express';
import { generateQuestions, GenerationRequest } from '../services/llm';

const router = Router();

router.post('/generate', async (req, res) => {
    try {
        const { subject, count, provider } = req.body;

        if (!subject || !count || !provider) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const questions = await generateQuestions({
            subject,
            count: Number(count),
            provider: provider as any
        });

        res.json({ questions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate questions' });
    }
});

export default router;
