import { useState } from 'react';
import { Lock, Check, Sparkles, Crown, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

const TEMPLATES_CONFIG = [
    {
        id: 'classic',
        name: 'Classic',
        description: 'Clean two-column, timeless',
        badge: 'FREE',
        badgeColor: '#22c55e',
        locked: false,
        preview: { bg: '#ffffff', accent: '#1e293b', secondary: '#64748b' },
        icon: Zap,
    },
    {
        id: 'modern',
        name: 'Modern',
        description: 'Colored header, icon-based contacts',
        badge: 'FREE',
        badgeColor: '#22c55e',
        locked: false,
        preview: { bg: '#f8fafc', accent: '#6366f1', secondary: '#ec4899' },
        icon: Sparkles,
    },
    {
        id: 'executive',
        name: 'Executive',
        description: 'Premium dark header, typography-focused',
        badge: 'PREMIUM',
        badgeColor: '#f59e0b',
        locked: true,
        preview: { bg: '#0f172a', accent: '#f59e0b', secondary: '#e2e8f0' },
        icon: Crown,
    },
];

function TemplateMiniPreview({ config }) {
    const { preview } = config;
    return (
        <div style={{
            background: preview.bg,
            borderRadius: '8px',
            height: '90px',
            overflow: 'hidden',
            position: 'relative',
        }}>
            {/* Mini header */}
            <div style={{ background: preview.accent, height: config.id === 'classic' ? '0px' : config.id === 'executive' ? '35px' : '28px', width: '100%' }} />
            {/* Mini lines */}
            <div style={{ padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {config.id === 'classic' && (
                    <>
                        <div style={{ width: '60%', height: '7px', background: preview.accent, borderRadius: '3px', marginTop: '4px' }} />
                        <div style={{ width: '40%', height: '4px', background: preview.secondary, borderRadius: '3px' }} />
                        <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
                                <div style={{ width: '80%', height: '3px', background: '#e2e8f0', borderRadius: '2px' }} />
                                <div style={{ width: '90%', height: '3px', background: '#e2e8f0', borderRadius: '2px' }} />
                                <div style={{ width: '70%', height: '3px', background: '#e2e8f0', borderRadius: '2px' }} />
                            </div>
                            <div style={{ width: '35%', display: 'flex', flexDirection: 'column', gap: '3px', background: '#f1f5f9', borderRadius: '4px', padding: '4px' }}>
                                <div style={{ width: '90%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
                                <div style={{ width: '70%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
                            </div>
                        </div>
                    </>
                )}
                {config.id === 'modern' && (
                    <>
                        <div style={{ display: 'flex', gap: '4px', marginTop: '2px' }}>
                            {[40, 35, 50].map((w, i) => (
                                <div key={i} style={{ width: `${w}%`, height: '3px', background: preview.secondary + '60', borderRadius: '2px' }} />
                            ))}
                        </div>
                        <div style={{ width: '50%', height: '3px', background: '#e2e8f0', borderRadius: '2px', marginTop: '2px' }} />
                        <div style={{ width: '80%', height: '3px', background: '#e2e8f0', borderRadius: '2px' }} />
                        <div style={{ width: '65%', height: '3px', background: '#e2e8f0', borderRadius: '2px' }} />
                    </>
                )}
                {config.id === 'executive' && (
                    <>
                        <div style={{ width: '65%', height: '5px', background: preview.accent, borderRadius: '2px' }} />
                        <div style={{ width: '45%', height: '3px', background: preview.secondary + '60', borderRadius: '2px' }} />
                        <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                            <div style={{ width: '2px', background: preview.accent, borderRadius: '1px', alignSelf: 'stretch' }} />
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
                                <div style={{ width: '85%', height: '3px', background: '#334155', borderRadius: '2px' }} />
                                <div style={{ width: '70%', height: '3px', background: '#334155', borderRadius: '2px' }} />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default function TemplateSelector({ selected, onSelect }) {
    const [unlockedPremium, setUnlockedPremium] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Clear any previously persisted unlock — premium resets on every session
    useState(() => { localStorage.removeItem('premium_unlocked'); });

    const handleSelect = (tmpl) => {
        if (tmpl.locked && !unlockedPremium) {
            setShowModal(true);
            return;
        }
        onSelect(tmpl.id);
    };

    const handleUnlock = () => {
        setUnlockedPremium(true);
        setShowModal(false);
        onSelect('executive');
        toast.success('🎉 Executive template unlocked!', {
            style: { background: '#1e293b', color: '#e2e8f0', border: '1px solid rgba(245,158,11,0.4)' },
            iconTheme: { primary: '#f59e0b', secondary: '#fff' }
        });
    };

    return (
        <>
            <div style={{ marginBottom: '16px' }}>
                <div style={{ marginBottom: '12px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366f1' }}>Choose Template</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                    {TEMPLATES_CONFIG.map(tmpl => {
                        const isLocked = tmpl.locked && !unlockedPremium;
                        const isSelected = selected === tmpl.id;
                        const Icon = tmpl.icon;
                        return (
                            <div
                                key={tmpl.id}
                                className={`template-card ${isSelected ? 'selected' : ''}`}
                                onClick={() => handleSelect(tmpl)}
                                style={{ opacity: isLocked ? 0.85 : 1 }}
                            >
                                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div style={{ padding: '8px 8px 0' }}>
                                        <TemplateMiniPreview config={tmpl} />
                                    </div>
                                    <div style={{ padding: '10px 10px 10px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3px' }}>
                                            <span style={{ fontWeight: 600, fontSize: '13px', color: '#e2e8f0' }}>{tmpl.name}</span>
                                            {isSelected && <Check size={13} color="#6366f1" />}
                                            {isLocked && <Lock size={12} color="#f59e0b" />}
                                        </div>
                                        <div style={{ fontSize: '10px', color: '#475569' }}>{tmpl.description}</div>
                                        <div style={{ marginTop: '6px' }}>
                                            <span style={{
                                                fontSize: '9px', fontWeight: 700, letterSpacing: '0.07em',
                                                color: tmpl.badgeColor,
                                                background: tmpl.badgeColor + '18',
                                                border: `1px solid ${tmpl.badgeColor}40`,
                                                padding: '2px 7px', borderRadius: '20px'
                                            }}>
                                                {isLocked ? '🔒 LOCKED' : tmpl.badge}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Upgrade Modal */}
            {showModal && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
                    zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <div style={{
                        background: 'linear-gradient(135deg, #1e1e3a, #1a1a2e)',
                        border: '1px solid rgba(245,158,11,0.3)',
                        borderRadius: '20px', padding: '32px', maxWidth: '380px', width: '90%',
                        textAlign: 'center', position: 'relative'
                    }}>
                        <div style={{
                            width: 60, height: 60, borderRadius: '50%', margin: '0 auto 16px',
                            background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <Crown size={28} color="white" />
                        </div>
                        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '22px', fontWeight: 700, margin: '0 0 8px', color: '#f8fafc' }}>
                            Executive Template
                        </h3>
                        <p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.7, margin: '0 0 24px' }}>
                            Unlock the premium Executive template — perfect for senior roles. Features a bold dark header band, refined typography, and a prestigious layout.
                        </p>
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                Not now
                            </button>
                            <button
                                onClick={handleUnlock}
                                style={{
                                    background: 'linear-gradient(135deg, #f59e0b, #fbbf24)', color: '#1a1a2e',
                                    border: 'none', borderRadius: '10px', padding: '10px 20px',
                                    fontWeight: 700, fontSize: '14px', cursor: 'pointer',
                                    display: 'flex', alignItems: 'center', gap: '6px',
                                    boxShadow: '0 4px 20px rgba(245,158,11,0.4)'
                                }}
                            >
                                <Crown size={15} /> Unlock Free (Demo)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
