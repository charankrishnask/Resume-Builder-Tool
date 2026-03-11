import { useState } from 'react';
import {
    User, Mail, Phone, MapPin, Linkedin, Globe,
    Briefcase, GraduationCap, Code2, FolderOpen,
    Plus, Trash2, Wand2, Loader2, ChevronDown, ChevronUp,
    FileText
} from 'lucide-react';
import toast from 'react-hot-toast';

function SectionHeader({ icon: Icon, title, badge }) {
    return (
        <div className="section-heading">
            <Icon size={13} />
            {title}
            {badge && <span className="ai-badge">{badge}</span>}
        </div>
    );
}

function Collapsible({ title, icon: Icon, children, defaultOpen = true, isDark }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: '16px' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: isDark ? 'rgba(255,255,255,0.03)' : '#ffffff',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : '#e2e8f0'}`,
          borderRadius: open ? '12px 12px 0 0' : '12px', padding: '12px 16px',
          cursor: 'pointer', color: isDark ? '#e2e8f0' : '#0f172a', fontFamily: 'Inter, sans-serif',
          transition: 'all 0.2s'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, fontSize: '13px' }}>
          <Icon size={15} color="#6366f1" /> {title}
        </span>
        {open ? <ChevronUp size={15} color={isDark ? '#64748b' : '#94a3b8'} /> : <ChevronDown size={15} color={isDark ? '#64748b' : '#94a3b8'} />}
      </button>
      {open && (
        <div style={{
          background: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc',
          border: `1px solid ${isDark ? 'rgba(255,255,255,0.07)' : '#e2e8f0'}`,
          borderTop: 'none', borderRadius: '0 0 12px 12px', padding: '16px',
          transition: 'all 0.2s'
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function ResumeForm({
  resume, isLoading, isDark, aiHook,
    onUpdatePersonalInfo, onUpdateSummary,
    onAddExperience, onUpdateExperience, onRemoveExperience,
    onAddEducation, onUpdateEducation, onRemoveEducation,
    onAddSkill, onRemoveSkill, onSetSkills,
    onAddProject, onUpdateProject, onRemoveProject,
}) {
    const [skillInput, setSkillInput] = useState('');

    const { loading, generateSummary, improveDescription, suggestSkills } = aiHook;

    if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', flexDirection: 'column', gap: '12px' }}>
        <div className="spinner" style={{ width: '28px', height: '28px', borderWidth: '3px' }} />
        <span style={{ color: isDark ? '#475569' : '#64748b', fontSize: '13px' }}>Loading your resume...</span>
      </div>
    );
  }

    const handleGenerateSummary = async () => {
        const jobTitle = resume.experience[0]?.title || '';
        if (!jobTitle && !resume.personalInfo.name) {
            toast.error('Please add your job title or name first.');
            return;
        }
        try {
            const summary = await generateSummary({
                jobTitle: jobTitle || resume.personalInfo.name,
                experience: resume.experience,
                name: resume.personalInfo.name,
            });
            onUpdateSummary(summary);
            toast.success('Summary generated!', {
                style: { background: '#1e293b', color: '#e2e8f0', border: '1px solid rgba(99,102,241,0.3)' }
            });
        } catch (err) {
            toast.error('AI generation failed. Check API key.');
        }
    };

    const handleImproveDescription = async (exp) => {
        if (!exp.description) {
            toast.error('Please add a description first.');
            return;
        }
        try {
            const improved = await improveDescription({ description: exp.description, title: exp.title, company: exp.company, id: exp.id });
            onUpdateExperience(exp.id, 'description', improved);
            toast.success('Description improved!', {
                style: { background: '#1e293b', color: '#e2e8f0', border: '1px solid rgba(99,102,241,0.3)' }
            });
        } catch (err) {
            toast.error('AI improvement failed. Check API key.');
        }
    };

    const handleSuggestSkills = async () => {
        const jobTitle = resume.experience[0]?.title || '';
        if (!jobTitle) {
            toast.error('Please add a job title in Work Experience first.');
            return;
        }
        try {
            const skills = await suggestSkills({ jobTitle, experience: resume.experience, existingSkills: resume.skills });
            const newSkills = skills.filter(s => !resume.skills.includes(s));
            newSkills.forEach(s => onAddSkill(s));
            toast.success(`Added ${newSkills.length} suggested skills!`, {
                style: { background: '#1e293b', color: '#e2e8f0', border: '1px solid rgba(99,102,241,0.3)' }
            });
        } catch (err) {
            toast.error('AI skill suggestion failed. Check API key.');
        }
    };

    const handleAddSkill = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            onAddSkill(skillInput);
            setSkillInput('');
        }
    };

    return (
        <div style={{ paddingBottom: '24px' }}>
            <div style={{ marginBottom: '20px', paddingLeft: '4px' }}>
        <h2 style={{ fontWeight: 700, fontSize: '18px', margin: 0, color: isDark ? '#e2e8f0' : '#0f172a' }}>Edit Resume</h2>
        <p style={{ color: isDark ? '#475569' : '#64748b', fontSize: '12px', margin: '4px 0 0' }}>Fill in your details below — preview updates live</p>
      </div>

            {/* Personal Info */}
            <Collapsible title="Personal Information" icon={User} isDark={isDark}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {[
                        { field: 'name', placeholder: 'Full Name', icon: User },
                        { field: 'email', placeholder: 'Email Address', icon: Mail },
                        { field: 'phone', placeholder: 'Phone Number', icon: Phone },
                        { field: 'location', placeholder: 'City, Country', icon: MapPin },
                        { field: 'linkedin', placeholder: 'LinkedIn URL', icon: Linkedin },
                        { field: 'portfolio', placeholder: 'Portfolio URL', icon: Globe },
                    ].map(({ field, placeholder, icon: Icon }) => (
                        <div key={field} style={{ position: 'relative', gridColumn: field === 'name' ? 'span 2' : 'auto' }}>
                            <Icon size={13} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#475569' }} />
                            <input
                                className="form-input"
                                placeholder={placeholder}
                                value={resume.personalInfo[field] || ''}
                                onChange={e => onUpdatePersonalInfo(field, e.target.value)}
                                style={{ paddingLeft: '32px' }}
                            />
                        </div>
                    ))}
                </div>
            </Collapsible>

            {/* Summary */}
            <Collapsible title="Professional Summary" icon={FileText} isDark={isDark}>
                <div style={{ marginBottom: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        className="btn btn-ai"
                        onClick={handleGenerateSummary}
                        disabled={loading.summary}
                    >
                        {loading.summary ? <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} /> : <Wand2 size={12} />}
                        {loading.summary ? 'Generating...' : 'AI Generate'}
                    </button>
                </div>
                <textarea
                    className="form-input"
                    placeholder="Write a compelling professional summary..."
                    value={resume.summary || ''}
                    onChange={e => onUpdateSummary(e.target.value)}
                    rows={4}
                    style={{ resize: 'vertical', lineHeight: '1.6' }}
                />
            </Collapsible>

            {/* Work Experience */}
            <Collapsible title="Work Experience" icon={Briefcase} isDark={isDark}>
                {resume.experience.map((exp, idx) => (
                    <div key={exp.id} className="entry-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Experience #{idx + 1}</span>
                            <div style={{ display: 'flex', gap: '6px' }}>
                                <button
                                    className="btn btn-ai"
                                    onClick={() => handleImproveDescription(exp)}
                                    disabled={loading.improve[exp.id]}
                                >
                                    {loading.improve[exp.id] ? <Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} /> : <Wand2 size={11} />}
                                    {loading.improve[exp.id] ? 'Improving...' : 'AI Improve'}
                                </button>
                                {resume.experience.length > 1 && (
                                    <button className="btn btn-danger" onClick={() => onRemoveExperience(exp.id)}>
                                        <Trash2 size={11} />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '8px' }}>
                            <input className="form-input" placeholder="Job Title" value={exp.title} onChange={e => onUpdateExperience(exp.id, 'title', e.target.value)} />
                            <input className="form-input" placeholder="Company" value={exp.company} onChange={e => onUpdateExperience(exp.id, 'company', e.target.value)} />
                            <input className="form-input" placeholder="Duration (e.g. Jan 2022 - Present)" value={exp.duration} onChange={e => onUpdateExperience(exp.id, 'duration', e.target.value)} style={{ gridColumn: 'span 2' }} />
                        </div>
                        <textarea
                            className="form-input"
                            placeholder="Describe your responsibilities and achievements..."
                            value={exp.description}
                            onChange={e => onUpdateExperience(exp.id, 'description', e.target.value)}
                            rows={3}
                            style={{ resize: 'vertical', lineHeight: '1.6' }}
                        />
                    </div>
                ))}
                <button className="btn btn-add" onClick={onAddExperience}>
                    <Plus size={14} /> Add Experience
                </button>
            </Collapsible>

            {/* Education */}
            <Collapsible title="Education" icon={GraduationCap} isDark={isDark}>
                {resume.education.map((edu, idx) => (
                    <div key={edu.id} className="entry-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Education #{idx + 1}</span>
                            {resume.education.length > 1 && (
                                <button className="btn btn-danger" onClick={() => onRemoveEducation(edu.id)}>
                                    <Trash2 size={11} />
                                </button>
                            )}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                            <input className="form-input" placeholder="Degree / Qualification" value={edu.degree} onChange={e => onUpdateEducation(edu.id, 'degree', e.target.value)} style={{ gridColumn: 'span 2' }} />
                            <input className="form-input" placeholder="School / University" value={edu.school} onChange={e => onUpdateEducation(edu.id, 'school', e.target.value)} />
                            <input className="form-input" placeholder="Year (e.g. 2020)" value={edu.year} onChange={e => onUpdateEducation(edu.id, 'year', e.target.value)} />
                        </div>
                    </div>
                ))}
                <button className="btn btn-add" onClick={onAddEducation}>
                    <Plus size={14} /> Add Education
                </button>
            </Collapsible>

            {/* Skills */}
            <Collapsible title="Skills" icon={Code2} isDark={isDark}>
                <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn btn-ai" onClick={handleSuggestSkills} disabled={loading.skills}>
                        {loading.skills ? <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} /> : <Wand2 size={12} />}
                        {loading.skills ? 'Suggesting...' : 'AI Suggest Skills'}
                    </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '12px', minHeight: '32px' }}>
                    {resume.skills.map(skill => (
                        <span key={skill} className="tag">
                            {skill}
                            <button onClick={() => onRemoveSkill(skill)}>×</button>
                        </span>
                    ))}
                    {resume.skills.length === 0 && (
                        <span style={{ color: '#374151', fontSize: '12px', fontStyle: 'italic' }}>No skills added yet</span>
                    )}
                </div>
                <input
                    className="form-input"
                    placeholder="Type a skill and press Enter..."
                    value={skillInput}
                    onChange={e => setSkillInput(e.target.value)}
                    onKeyDown={handleAddSkill}
                    onBlur={() => { if (skillInput.trim()) { onAddSkill(skillInput); setSkillInput(''); } }}
                />
            </Collapsible>

            {/* Projects */}
            <Collapsible title="Projects (Optional)" icon={FolderOpen} defaultOpen={false} isDark={isDark}>
                {resume.projects.map((proj, idx) => (
                    <div key={proj.id} className="entry-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 600 }}>Project #{idx + 1}</span>
                            {resume.projects.length > 1 && (
                                <button className="btn btn-danger" onClick={() => onRemoveProject(proj.id)}>
                                    <Trash2 size={11} />
                                </button>
                            )}
                        </div>
                        <input className="form-input" placeholder="Project Name" value={proj.title} onChange={e => onUpdateProject(proj.id, 'title', e.target.value)} style={{ marginBottom: '8px' }} />
                        <textarea
                            className="form-input"
                            placeholder="Describe the project..."
                            value={proj.description}
                            onChange={e => onUpdateProject(proj.id, 'description', e.target.value)}
                            rows={2}
                            style={{ resize: 'vertical', marginBottom: '8px' }}
                        />
                        <input className="form-input" placeholder="Project Link (optional)" value={proj.link} onChange={e => onUpdateProject(proj.id, 'link', e.target.value)} />
                    </div>
                ))}
                <button className="btn btn-add" onClick={onAddProject}>
                    <Plus size={14} /> Add Project
                </button>
            </Collapsible>
        </div>
    );
}
