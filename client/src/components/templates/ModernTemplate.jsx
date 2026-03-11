// Modern Template — Colored indigo/pink gradient header, icon-based contacts, accent sidebar

const ICONS = {
    email: '✉',
    phone: '☎',
    location: '⊙',
    linkedin: '⊞',
    portfolio: '⊕',
};

function Tag({ children }) {
    return (
        <span style={{
            display: 'inline-block',
            background: 'rgba(99,102,241,0.12)',
            color: '#4338ca',
            border: '1px solid rgba(99,102,241,0.25)',
            padding: '3px 10px',
            borderRadius: '20px',
            fontSize: '10px',
            fontWeight: 600,
            marginRight: '5px',
            marginBottom: '5px',
        }}>
            {children}
        </span>
    );
}

function SectionTitle({ children, accent = '#6366f1' }) {
    return (
        <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '3px', height: '16px', background: `linear-gradient(${accent}, #ec4899)`, borderRadius: '2px' }} />
                <h3 style={{ fontFamily: 'Inter, sans-serif', fontSize: '11px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: accent, margin: 0 }}>
                    {children}
                </h3>
            </div>
            <div style={{ height: '1px', background: `linear-gradient(90deg, ${accent}30, transparent)`, margin: '6px 0 0' }} />
        </div>
    );
}

export default function ModernTemplate({ resume }) {
    const { personalInfo: p = {}, summary, experience = [], education = [], skills = [], projects = [] } = resume;

    return (
        <div style={{ fontFamily: 'Inter, sans-serif', background: '#ffffff', color: '#1a1a1a', minHeight: '100%' }}>
            {/* Header */}
            <div style={{
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 40%, #7c3aed 100%)',
                padding: '28px 28px 24px',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Decorative circles */}
                <div style={{ position: 'absolute', top: -20, right: -20, width: 120, height: 120, borderRadius: '50%', background: 'rgba(255,255,255,0.08)' }} />
                <div style={{ position: 'absolute', bottom: -30, right: 80, width: 80, height: 80, borderRadius: '50%', background: 'rgba(236,72,153,0.2)' }} />

                <h1 style={{ fontFamily: 'Inter, sans-serif', fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: '0 0 4px', letterSpacing: '-0.03em', position: 'relative' }}>
                    {p.name || 'Your Name'}
                </h1>
                {experience[0]?.title && (
                    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', fontWeight: 500, marginBottom: '14px', position: 'relative' }}>
                        {experience[0].title}{experience[0].company ? ` · ${experience[0].company}` : ''}
                    </div>
                )}

                {/* Contact pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', position: 'relative' }}>
                    {[
                        { key: 'email', val: p.email, icon: '✉' },
                        { key: 'phone', val: p.phone, icon: '☎' },
                        { key: 'location', val: p.location, icon: '⊙' },
                        { key: 'linkedin', val: p.linkedin ? p.linkedin.replace(/https?:\/\/(www\.)?/, '') : null, icon: 'in' },
                        { key: 'portfolio', val: p.portfolio ? p.portfolio.replace(/https?:\/\/(www\.)?/, '') : null, icon: '⊕' },
                    ].filter(x => x.val).map(({ key, val, icon }) => (
                        <div key={key} style={{
                            display: 'flex', alignItems: 'center', gap: '5px',
                            background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            borderRadius: '20px', padding: '4px 10px',
                            fontSize: '11px', color: '#ffffff', fontWeight: 500,
                        }}>
                            <span style={{ fontSize: '10px' }}>{icon}</span>
                            <span style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{val}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Body */}
            <div style={{ display: 'flex', padding: '0' }}>
                {/* Main */}
                <div style={{ flex: 1, padding: '22px 24px' }}>
                    {summary && (
                        <div style={{ marginBottom: '20px' }}>
                            <SectionTitle>About Me</SectionTitle>
                            <p style={{ fontSize: '12px', color: '#374151', lineHeight: 1.75, margin: 0 }}>{summary}</p>
                        </div>
                    )}

                    {experience.filter(e => e.title || e.company).length > 0 && (
                        <div style={{ marginBottom: '20px' }}>
                            <SectionTitle>Work Experience</SectionTitle>
                            {experience.filter(e => e.title || e.company).map((exp, i) => (
                                <div key={exp.id || i} style={{ marginBottom: '14px', paddingLeft: '12px', borderLeft: '2px solid #e0e7ff' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '13px', color: '#1e1b4b' }}>{exp.title}</div>
                                            <div style={{ fontSize: '12px', color: '#6366f1', fontWeight: 600 }}>{exp.company}</div>
                                        </div>
                                        {exp.duration && (
                                            <span style={{ fontSize: '10px', color: '#ffffff', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', padding: '2px 8px', borderRadius: '20px', fontWeight: 600, flexShrink: 0 }}>
                                                {exp.duration}
                                            </span>
                                        )}
                                    </div>
                                    {exp.description && <p style={{ fontSize: '12px', color: '#4b5563', lineHeight: 1.65, margin: '6px 0 0' }}>{exp.description}</p>}
                                </div>
                            ))}
                        </div>
                    )}

                    {projects.filter(pr => pr.title).length > 0 && (
                        <div>
                            <SectionTitle>Projects</SectionTitle>
                            {projects.filter(pr => pr.title).map((proj, i) => (
                                <div key={proj.id || i} style={{ marginBottom: '12px', padding: '10px 12px', background: '#f8f9ff', borderRadius: '8px', border: '1px solid #e0e7ff' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                        <div style={{ fontWeight: 700, fontSize: '12px', color: '#312e81' }}>{proj.title}</div>
                                        {proj.link && <span style={{ fontSize: '10px', color: '#6366f1' }}>{proj.link}</span>}
                                    </div>
                                    {proj.description && <p style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div style={{ width: '200px', background: '#f8f9ff', padding: '22px 16px', borderLeft: '1px solid #e0e7ff', flexShrink: 0 }}>
                    {skills.length > 0 && (
                        <div style={{ marginBottom: '20px' }}>
                            <SectionTitle>Skills</SectionTitle>
                            <div style={{ marginTop: '8px' }}>
                                {skills.map(skill => <Tag key={skill}>{skill}</Tag>)}
                            </div>
                        </div>
                    )}

                    {education.filter(e => e.degree || e.school).length > 0 && (
                        <div>
                            <SectionTitle>Education</SectionTitle>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                                {education.filter(e => e.degree || e.school).map((edu, i) => (
                                    <div key={edu.id || i} style={{ padding: '8px', background: '#ffffff', borderRadius: '8px', border: '1px solid #e0e7ff' }}>
                                        <div style={{ fontWeight: 700, fontSize: '11px', color: '#312e81' }}>{edu.degree}</div>
                                        <div style={{ fontSize: '10px', color: '#6366f1', fontWeight: 500 }}>{edu.school}</div>
                                        {edu.year && <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '2px' }}>{edu.year}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
