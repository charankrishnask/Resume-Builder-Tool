// Executive Template — Premium dark header band, typography-forward, prestigious layout

function Divider({ color = '#b8860b' }) {
    return <div style={{ height: '1px', background: `linear-gradient(90deg, ${color}, transparent)`, margin: '10px 0' }} />;
}

function SectionTitle({ children }) {
    return (
        <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '20px', height: '2px', background: '#b8860b' }} />
            <h3 style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#b8860b', margin: 0,
            }}>
                {children}
            </h3>
            <div style={{ flex: 1, height: '1px', background: 'rgba(184,134,11,0.25)' }} />
        </div>
    );
}

export default function ExecutiveTemplate({ resume }) {
    const { personalInfo: p = {}, summary, experience = [], education = [], skills = [], projects = [] } = resume;

    return (
        <div style={{ fontFamily: 'Georgia, serif', background: '#ffffff', color: '#1a1a1a', minHeight: '100%' }}>
            {/* Dark header band */}
            <div style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)',
                padding: '32px 36px 28px',
                position: 'relative',
                overflow: 'hidden',
            }}>
                {/* Gold accent line */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #b8860b, #f0c040, #b8860b)' }} />
                {/* Subtle texture overlay */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.04, background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.5) 10px, rgba(255,255,255,0.5) 11px)' }} />

                <div style={{ position: 'relative' }}>
                    <h1 style={{
                        fontFamily: '"Playfair Display", Georgia, serif',
                        fontSize: '32px', fontWeight: 900, color: '#f8fafc',
                        margin: '0 0 6px', letterSpacing: '-0.01em', lineHeight: 1.1
                    }}>
                        {p.name || 'Your Name'}
                    </h1>
                    {experience[0]?.title && (
                        <div style={{
                            fontSize: '14px', color: '#b8860b', fontWeight: 600,
                            letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '18px',
                            fontFamily: '"Inter", sans-serif'
                        }}>
                            {experience[0].title}{experience[0].company ? ` · ${experience[0].company}` : ''}
                        </div>
                    )}

                    {/* Contact row */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
                        {[
                            { val: p.email, label: p.email },
                            { val: p.phone, label: p.phone },
                            { val: p.location, label: p.location },
                            { val: p.linkedin, label: p.linkedin ? 'LinkedIn' : null },
                            { val: p.portfolio, label: p.portfolio ? 'Portfolio' : null },
                        ].filter(x => x.label).map(({ val, label }, i) => (
                            <div key={i} style={{ fontSize: '11px', color: '#94a3b8', fontFamily: '"Inter", sans-serif', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#b8860b' }} />
                                {label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Gold sub-band */}
            <div style={{ background: 'linear-gradient(90deg, #b8860b, #d4a017)', height: '2px' }} />

            {/* Body */}
            <div style={{ display: 'flex', gap: 0 }}>
                {/* Main */}
                <div style={{ flex: 1, padding: '24px 28px' }}>
                    {summary && (
                        <div style={{ marginBottom: '22px' }}>
                            <SectionTitle>Executive Profile</SectionTitle>
                            <p style={{ fontSize: '12px', color: '#374151', lineHeight: 1.8, margin: 0, fontStyle: 'italic', borderLeft: '3px solid #b8860b', paddingLeft: '12px' }}>
                                {summary}
                            </p>
                        </div>
                    )}

                    {experience.filter(e => e.title || e.company).length > 0 && (
                        <div style={{ marginBottom: '22px' }}>
                            <SectionTitle>Career History</SectionTitle>
                            {experience.filter(e => e.title || e.company).map((exp, i) => (
                                <div key={exp.id || i} style={{ marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: '14px', color: '#0f172a' }}>{exp.title}</div>
                                            <div style={{ fontSize: '12px', color: '#64748b', fontWeight: 600, fontFamily: '"Inter", sans-serif', letterSpacing: '0.02em' }}>{exp.company}</div>
                                        </div>
                                        {exp.duration && (
                                            <div style={{ fontSize: '10px', color: '#b8860b', background: 'rgba(184,134,11,0.1)', border: '1px solid rgba(184,134,11,0.3)', padding: '3px 10px', borderRadius: '4px', flexShrink: 0, fontFamily: '"Inter", sans-serif', fontWeight: 600 }}>
                                                {exp.duration}
                                            </div>
                                        )}
                                    </div>
                                    {exp.description && <p style={{ fontSize: '12px', color: '#475569', lineHeight: 1.7, margin: '7px 0 0', paddingLeft: '8px', borderLeft: '1px solid #e2e8f0' }}>{exp.description}</p>}
                                </div>
                            ))}
                        </div>
                    )}

                    {projects.filter(pr => pr.title).length > 0 && (
                        <div>
                            <SectionTitle>Key Projects</SectionTitle>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                {projects.filter(pr => pr.title).map((proj, i) => (
                                    <div key={proj.id || i} style={{ padding: '10px 12px', border: '1px solid #e2e8f0', borderTop: '2px solid #b8860b', borderRadius: '4px' }}>
                                        <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: '12px', color: '#0f172a', marginBottom: '4px' }}>{proj.title}</div>
                                        {proj.description && <p style={{ fontSize: '10px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>{proj.description}</p>}
                                        {proj.link && <div style={{ fontSize: '9px', color: '#b8860b', marginTop: '4px', fontFamily: '"Inter", sans-serif' }}>{proj.link}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div style={{ width: '210px', background: '#f8fafc', borderLeft: '1px solid #e2e8f0', padding: '24px 16px', flexShrink: 0 }}>
                    {education.filter(e => e.degree || e.school).length > 0 && (
                        <div style={{ marginBottom: '22px' }}>
                            <SectionTitle>Education</SectionTitle>
                            {education.filter(e => e.degree || e.school).map((edu, i) => (
                                <div key={edu.id || i} style={{ marginBottom: '12px', paddingLeft: '8px', borderLeft: '2px solid rgba(184,134,11,0.4)' }}>
                                    <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 700, fontSize: '11px', color: '#0f172a' }}>{edu.degree}</div>
                                    <div style={{ fontSize: '10px', color: '#64748b', fontFamily: '"Inter", sans-serif', marginTop: '2px' }}>{edu.school}</div>
                                    {edu.year && <div style={{ fontSize: '9px', color: '#b8860b', fontFamily: '"Inter", sans-serif', fontWeight: 600, marginTop: '2px' }}>{edu.year}</div>}
                                </div>
                            ))}
                        </div>
                    )}

                    {skills.length > 0 && (
                        <div>
                            <SectionTitle>Expertise</SectionTitle>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                {skills.map(skill => (
                                    <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ width: '5px', height: '5px', transform: 'rotate(45deg)', background: '#b8860b', flexShrink: 0 }} />
                                        <span style={{ fontSize: '11px', color: '#374151', fontFamily: '"Inter", sans-serif' }}>{skill}</span>
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
