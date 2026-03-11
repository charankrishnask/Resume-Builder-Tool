import { useState, useCallback } from 'react';
import axios from 'axios';

export function useAI() {
    const [loading, setLoading] = useState({
        summary: false,
        improve: {},
        skills: false,
    });

    const generateSummary = useCallback(async ({ jobTitle, experience, name }) => {
        setLoading(prev => ({ ...prev, summary: true }));
        try {
            const { data } = await axios.post('/api/ai/summary', { jobTitle, experience, name });
            if (data.success) return data.summary;
            throw new Error(data.error);
        } finally {
            setLoading(prev => ({ ...prev, summary: false }));
        }
    }, []);

    const improveDescription = useCallback(async ({ description, title, company, id }) => {
        setLoading(prev => ({ ...prev, improve: { ...prev.improve, [id]: true } }));
        try {
            const { data } = await axios.post('/api/ai/improve', { description, title, company });
            if (data.success) return data.improved;
            throw new Error(data.error);
        } finally {
            setLoading(prev => ({ ...prev, improve: { ...prev.improve, [id]: false } }));
        }
    }, []);

    const suggestSkills = useCallback(async ({ jobTitle, experience, existingSkills }) => {
        setLoading(prev => ({ ...prev, skills: true }));
        try {
            const { data } = await axios.post('/api/ai/skills', { jobTitle, experience, existingSkills });
            if (data.success) return data.skills;
            throw new Error(data.error);
        } finally {
            setLoading(prev => ({ ...prev, skills: false }));
        }
    }, []);

    return { loading, generateSummary, improveDescription, suggestSkills };
}
