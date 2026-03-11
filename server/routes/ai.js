const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');

// Lazy client — reads env var at request time (not at module load)
function getClient() {
    const key = process.env.GROQ_API_KEY;
    if (!key || key.includes('your-groq')) {
        throw new Error('GROQ_API_KEY is not set. Add it to your .env file and restart the server.');
    }
    return new Groq({ apiKey: key });
}

async function chat(messages, maxTokens = 300) {
    const groq = getClient();
    const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile', // Free, open-source Llama 3.3
        messages,
        max_tokens: maxTokens,
        temperature: 0.7,
    });
    return completion.choices[0].message.content.trim();
}

// POST /api/ai/summary - Generate professional summary
router.post('/summary', async (req, res) => {
    try {
        const { jobTitle, experience, name } = req.body;
        if (!jobTitle) return res.status(400).json({ success: false, error: 'jobTitle is required' });

        const experienceSummary = experience && experience.length > 0
            ? experience.map(e => `${e.title} at ${e.company} (${e.duration})`).join(', ')
            : 'no prior experience listed';

        const summary = await chat([{
            role: 'user',
            content: `Write a compelling 2-3 sentence professional summary for a resume. The person is ${name || 'a professional'} applying for or working as a ${jobTitle}. Their experience includes: ${experienceSummary}. Make it confident, concise, and impactful. Return ONLY the summary text, no extra commentary.`
        }], 300);

        res.json({ success: true, summary });
    } catch (err) {
        console.error('POST /api/ai/summary error:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/ai/improve - Improve work experience description
router.post('/improve', async (req, res) => {
    try {
        const { description, title, company } = req.body;
        if (!description) return res.status(400).json({ success: false, error: 'description is required' });

        const improved = await chat([{
            role: 'user',
            content: `Rewrite this work experience description to sound more impactful and professional for a resume. Role: ${title || 'professional'} at ${company || 'company'}.\n\nOriginal description: "${description}"\n\nRequirements:\n- Use strong action verbs\n- Quantify achievements where possible (use reasonable estimates if not given)\n- Keep it concise (2-4 bullet points or sentences)\n- Make it ATS-friendly\n\nReturn ONLY the improved description text, no extra commentary or labels.`
        }], 400);

        res.json({ success: true, improved });
    } catch (err) {
        console.error('POST /api/ai/improve error:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/ai/skills - Suggest relevant skills
router.post('/skills', async (req, res) => {
    try {
        const { jobTitle, experience, existingSkills } = req.body;
        if (!jobTitle) return res.status(400).json({ success: false, error: 'jobTitle is required' });

        const existing = existingSkills && existingSkills.length > 0
            ? `Already listed skills: ${existingSkills.join(', ')}.`
            : '';

        const expText = experience && experience.length > 0
            ? experience.map(e => `${e.title} at ${e.company}`).join(', ')
            : '';

        const skillsText = await chat([{
            role: 'user',
            content: `Suggest 5-8 relevant skills for a ${jobTitle} resume. ${expText ? `Experience: ${expText}.` : ''} ${existing} Return ONLY a comma-separated list of skills, nothing else. Do not duplicate existing skills.`
        }], 200);

        const skills = skillsText.split(',').map(s => s.trim()).filter(Boolean);
        res.json({ success: true, skills });
    } catch (err) {
        console.error('POST /api/ai/skills error:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
