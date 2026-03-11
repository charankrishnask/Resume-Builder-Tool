const express = require('express');
const router = express.Router();
const supabase = require('../supabase');

const USER_ID = 'default-user'; // Single-user flow

// GET /api/resume - fetch saved resume
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('resumes')
            .select('data, updated_at')
            .eq('user_id', USER_ID)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = no rows found
            throw error;
        }

        res.json({ success: true, data: data ? data.data : null, updatedAt: data ? data.updated_at : null });
    } catch (err) {
        console.error('GET /api/resume error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// POST /api/resume - upsert resume data
router.post('/', async (req, res) => {
    try {
        const { data: resumeData } = req.body;
        if (!resumeData) return res.status(400).json({ success: false, error: 'No resume data provided' });

        const { data, error } = await supabase
            .from('resumes')
            .upsert(
                { user_id: USER_ID, data: resumeData, updated_at: new Date().toISOString() },
                { onConflict: 'user_id' }
            )
            .select()
            .single();

        if (error) throw error;

        res.json({ success: true, data: data.data, updatedAt: data.updated_at });
    } catch (err) {
        console.error('POST /api/resume error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// DELETE /api/resume - clear resume data
router.delete('/', async (req, res) => {
    try {
        const { error } = await supabase
            .from('resumes')
            .delete()
            .eq('user_id', USER_ID);

        if (error) throw error;

        res.json({ success: true, message: 'Resume cleared' });
    } catch (err) {
        console.error('DELETE /api/resume error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
