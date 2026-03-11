// Classic Template — Clean two-column layout, black/white, professional serif typography

function Section({ title }) {
    return (
        <div style={{ borderBottom: '2px solid #1e293b', marginBottom: '8px', paddingBottom: '4px' }}>
            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '13px', fontWeight: 700, color: '#1e293b', margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {title}
            </h3>
        </div>
    );
}

export default function ClassicTemplate({ resume }) {
    const { personalInfo: p = {}, summary, experience = [], education = [], skills = [], projects = [] } = resume;

    return (
        <div style={{ fontFamily: 'Georgia, serif', background: '#ffffff', color: '#1a1a1a', display: 'flex', minHeight: '100%' }}>
            {/* Right sidebar */}
            <div style={{ width: '32%', background: '#f1f5f9', padding: '28px 18px', borderRight: '1px solid #e2e8f0', flexShrink: 0 }}>
                {/* Contact */}
                <div style={{ marginBottom: '24px' }}>
                    <Section title="Contact" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
                        {p.email && <div style={{ fontSize: '11px', color: '#334155', wordBreak: 'break-all' }}>✉ {p.email}</div>}
                        {p.phone && <div style={{ fontSize: '11px', color: '#334155' }}>📞 {p.phone}</div>}
                        {p.location && <div style={{ fontSize: '11px', color: '#334155' }}>📍 {p.location}</div>}
                        {p.linkedin && <div style={{ fontSize: '11px', color: '#3b82f6', wordBreak: 'break-all' }}>in {p.linkedin.replace('https://', '').replace('http://', '')}</div>}
                        {p.portfolio && <div style={{ fontSize: '11px', color: '#3b82f6', wordBreak: 'break-all' }}>🌐 {p.portfolio.replace('https://', '').replace('http://', '')}</div>}
                    </div>
                </div>

                {/* Skills */}
                {skills.length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                        <Section title="Skills" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '10px' }}>
                            {skills.map(skill => (
                                <div key={skill} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#1e293b', flexShrink: 0 }} />
                                    <span style={{ fontSize: '11px', color: '#334155' }}>{skill}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {education.filter(e => e.degree || e.school).length > 0 && (
                    <div>
                        <Section title="Education" />
                        <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {education.filter(e => e.degree || e.school).map((edu, i) => (
                                <div key={edu.id || i}>
                                    <div style={{ fontWeight: 700, fontSize: '11px', color: '#1e293b' }}>{edu.degree}</div>
                                    <div style={{ fontSize: '11px', color: '#475569' }}>{edu.school}</div>
                                    {edu.year && <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>{edu.year}</div>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Main content */}
            <div style={{ flex: 1, padding: '28px 24px' }}>
                {/* Name & Title */}
                <div style={{ marginBottom: '20px', borderBottom: '3px solid #1e293b', paddingBottom: '16px' }}>
                    <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 700, color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                        {p.name || 'Your Name'}
                    </h1>
                    {experience[0]?.title && (
                        <div style={{ fontSize: '14px', color: '#475569', fontStyle: 'italic' }}>
                            {experience[0].title} {experience[0].company ? `at ${experience[0].company}` : ''}
                        </div>
                    )}
                </div>

                {/* Summary */}
                {summary && (
                    <div style={{ marginBottom: '20px' }}>
                        <Section title="Professional Summary" />
                        <p style={{ fontSize: '12px', color: '#334155', lineHeight: 1.7, margin: '10px 0 0' }}>{summary}</p>
                    </div>
                )}

                {/* Work Experience */}
                {experience.filter(e => e.title || e.company).length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <Section title="Work Experience" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
                            {experience.filter(e => e.title || e.company).map((exp, i) => (
                                <div key={exp.id || i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '13px', color: '#1e293b' }}>{exp.title}</div>
                                            <div style={{ fontSize: '12px', color: '#475569', fontStyle: 'italic' }}>{exp.company}</div>
                                        </div>
                                        {exp.duration && <div style={{ fontSize: '11px', color: '#94a3b8', flexShrink: 0, marginLeft: '8px' }}>{exp.duration}</div>}
                                    </div>
                                    {exp.description && (
                                        <p style={{ fontSize: '12px', color: '#334155', lineHeight: 1.6, margin: '6px 0 0' }}>
                                            {exp.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Projects */}
                {projects.filter(pr => pr.title).length > 0 && (
                    <div>
                        <Section title="Projects" />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                            {projects.filter(pr => pr.title).map((proj, i) => (
                                <div key={proj.id || i}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div style={{ fontWeight: 700, fontSize: '12px', color: '#1e293b' }}>{proj.title}</div>
                                        {proj.link && <a href={proj.link} style={{ fontSize: '10px', color: '#3b82f6' }}>{proj.link}</a>}
                                    </div>
                                    {proj.description && <p style={{ fontSize: '11px', color: '#475569', lineHeight: 1.5, margin: '4px 0 0' }}>{proj.description}</p>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
