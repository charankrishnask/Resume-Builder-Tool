import { useState, useEffect, useCallback } from 'react';
import api from '../api';

const DEFAULT_RESUME = {
    personalInfo: {
        name: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        portfolio: '',
    },
    summary: '',
    experience: [
        { id: crypto.randomUUID(), title: '', company: '', duration: '', description: '' }
    ],
    education: [
        { id: crypto.randomUUID(), degree: '', school: '', year: '' }
    ],
    skills: [],
    projects: [
        { id: crypto.randomUUID(), title: '', description: '', link: '' }
    ],
};

export function useResume() {
    const [resume, setResume] = useState(DEFAULT_RESUME);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [lastSaved, setLastSaved] = useState(null);

    // Load from Supabase on mount
    useEffect(() => {
        async function loadResume() {
            try {
                const { data } = await axios.get('/api/resume');
                if (data.success && data.data) {
                    setResume(prev => ({
                        ...DEFAULT_RESUME,
                        ...data.data,
                        experience: data.data.experience?.length ? data.data.experience : DEFAULT_RESUME.experience,
                        education: data.data.education?.length ? data.data.education : DEFAULT_RESUME.education,
                        projects: data.data.projects?.length ? data.data.projects : DEFAULT_RESUME.projects,
                        skills: data.data.skills || [],
                    }));
                    if (data.updatedAt) setLastSaved(new Date(data.updatedAt));
                }
            } catch (err) {
                console.warn('Could not load resume from server:', err.message);
            } finally {
                setIsLoading(false);
            }
        }
        loadResume();
    }, []);

    const saveResume = useCallback(async () => {
        setIsSaving(true);
        try {
            const { data } = await axios.post('/api/resume', { data: resume });
            if (data.success) {
                setLastSaved(new Date());
                return true;
            }
        } catch (err) {
            console.error('Save error:', err);
            throw err;
        } finally {
            setIsSaving(false);
        }
    }, [resume]);

    // Update personal info field
    const updatePersonalInfo = useCallback((field, value) => {
        setResume(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));
    }, []);

    // Update summary
    const updateSummary = useCallback((value) => {
        setResume(prev => ({ ...prev, summary: value }));
    }, []);

    // Experience
    const addExperience = useCallback(() => {
        setResume(prev => ({
            ...prev,
            experience: [...prev.experience, { id: crypto.randomUUID(), title: '', company: '', duration: '', description: '' }]
        }));
    }, []);

    const updateExperience = useCallback((id, field, value) => {
        setResume(prev => ({
            ...prev,
            experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
        }));
    }, []);

    const removeExperience = useCallback((id) => {
        setResume(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
    }, []);

    // Education
    const addEducation = useCallback(() => {
        setResume(prev => ({
            ...prev,
            education: [...prev.education, { id: crypto.randomUUID(), degree: '', school: '', year: '' }]
        }));
    }, []);

    const updateEducation = useCallback((id, field, value) => {
        setResume(prev => ({
            ...prev,
            education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e)
        }));
    }, []);

    const removeEducation = useCallback((id) => {
        setResume(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
    }, []);

    // Skills
    const addSkill = useCallback((skill) => {
        if (!skill.trim()) return;
        setResume(prev => {
            if (prev.skills.includes(skill.trim())) return prev;
            return { ...prev, skills: [...prev.skills, skill.trim()] };
        });
    }, []);

    const removeSkill = useCallback((skill) => {
        setResume(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
    }, []);

    const setSkills = useCallback((skills) => {
        setResume(prev => ({ ...prev, skills }));
    }, []);

    // Projects
    const addProject = useCallback(() => {
        setResume(prev => ({
            ...prev,
            projects: [...prev.projects, { id: crypto.randomUUID(), title: '', description: '', link: '' }]
        }));
    }, []);

    const updateProject = useCallback((id, field, value) => {
        setResume(prev => ({
            ...prev,
            projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p)
        }));
    }, []);

    const removeProject = useCallback((id) => {
        setResume(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
    }, []);

    const resetResume = useCallback(() => {
        setResume({
            personalInfo: { name: '', email: '', phone: '', location: '', linkedin: '', portfolio: '' },
            summary: '',
            experience: [{ id: crypto.randomUUID(), title: '', company: '', duration: '', description: '' }],
            education: [{ id: crypto.randomUUID(), degree: '', school: '', year: '' }],
            skills: [],
            projects: [{ id: crypto.randomUUID(), title: '', description: '', link: '' }],
        });
        setLastSaved(null);
    }, []);

    return {
        resume, isLoading, isSaving, lastSaved,
        saveResume, resetResume,
        updatePersonalInfo, updateSummary,
        addExperience, updateExperience, removeExperience,
        addEducation, updateEducation, removeEducation,
        addSkill, removeSkill, setSkills,
        addProject, updateProject, removeProject,
    };
}
