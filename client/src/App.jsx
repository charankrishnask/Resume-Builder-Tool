import { useState, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Download, Save, Loader2, Clock, FileText, FilePlus, Sun, Moon } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useResume } from './hooks/useResume';
import { useAI } from './hooks/useAI';
import ResumeForm from './components/ResumeForm';
import TemplateSelector from './components/TemplateSelector';
import ResumePreview from './components/ResumePreview';

function formatTime(date) {
  if (!date) return null;
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function App() {
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [isExporting, setIsExporting] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const previewRef = useRef(null);

  const resumeHook = useResume();
  const aiHook = useAI();
  const { resume, isSaving, lastSaved, saveResume, resetResume } = resumeHook;

  // Derived theme values for inline styles
  const t = {
    appBg: isDark
      ? 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%)'
      : 'linear-gradient(135deg, #e2e8f0 0%, #f1f5f9 50%, #e8eef5 100%)',
    headerBg: isDark ? 'rgba(10,10,20,0.85)' : 'rgba(255,255,255,0.92)',
    headerBorder: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
    logoSubtext: isDark ? '#475569' : '#64748b',
    textMain: isDark ? '#e2e8f0' : '#0f172a',
    textMuted: isDark ? '#475569' : '#64748b',
    formPanelBg: 'transparent',
    previewBg: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.06)',
    previewBorder: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)',
    previewBoxShadow: isDark ? '0 20px 60px rgba(0,0,0,0.5)' : '0 20px 60px rgba(0,0,0,0.1)',
    savedText: isDark ? '#475569' : '#64748b',
  };

  const handleNewResume = () => {
    if (window.confirm('Start a new resume? All current details will be cleared.')) {
      resetResume();
      toast.success('New resume started!', {
        style: { background: isDark ? '#1e293b' : '#fff', color: isDark ? '#e2e8f0' : '#0f172a', border: '1px solid rgba(99,102,241,0.3)' },
        iconTheme: { primary: '#6366f1', secondary: '#fff' }
      });
    }
  };

  const handleSave = async () => {
    try {
      await saveResume();
      toast.success('Resume saved successfully!', {
        style: { background: isDark ? '#1e293b' : '#fff', color: isDark ? '#e2e8f0' : '#0f172a', border: '1px solid rgba(99,102,241,0.3)' },
        iconTheme: { primary: '#6366f1', secondary: '#fff' }
      });
    } catch (err) {
      toast.error('Failed to save resume. Check server connection.');
    }
  };

  const handleDownloadPDF = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2, useCORS: true, logging: false, backgroundColor: '#ffffff',
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [canvas.width / 2, canvas.height / 2] });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      const name = resume.personalInfo?.name || 'resume';
      pdf.save(`${name.replace(/\s+/g, '_')}_resume.pdf`);
      toast.success('PDF downloaded!', {
        style: { background: isDark ? '#1e293b' : '#fff', color: isDark ? '#e2e8f0' : '#0f172a', border: '1px solid rgba(99,102,241,0.3)' },
        iconTheme: { primary: '#6366f1', secondary: '#fff' }
      });
    } catch (err) {
      toast.error('PDF export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div data-theme={isDark ? 'dark' : 'light'} style={{ minHeight: '100vh', background: t.appBg, transition: 'background 0.3s ease' }}>
      <Toaster position="top-right" />

      {/* Header */}
      <header style={{
        background: t.headerBg,
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${t.headerBorder}`,
        position: 'sticky', top: 0, zIndex: 100, padding: '0 24px',
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: 36, height: 36, borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={18} color="white" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '16px', letterSpacing: '-0.02em' }}>
                <span className="gradient-text">Resume</span>
                <span style={{ color: t.textMain }}>Builder</span>
              </div>
              <div style={{ fontSize: '10px', color: t.logoSubtext, letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '-2px' }}>AI-Powered</div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Theme toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                width: 36, height: 36, borderRadius: '10px', cursor: 'pointer', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.07)',
                color: isDark ? '#fbbf24' : '#6366f1',
                transition: 'all 0.25s ease',
                flexShrink: 0,
              }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button className="btn btn-secondary" onClick={handleNewResume} title="Clear all fields and start a new resume" style={{ fontSize: '13px', padding: '8px 14px' }}>
              <FilePlus size={14} /> New Resume
            </button>

            {lastSaved && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: t.savedText, fontSize: '12px' }}>
                <Clock size={12} /><span>Saved at {formatTime(lastSaved)}</span>
              </div>
            )}

            <button className="btn btn-secondary" onClick={handleSave} disabled={isSaving} style={{ fontSize: '13px', padding: '8px 14px' }}>
              {isSaving ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />}
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button className="btn btn-primary" onClick={handleDownloadPDF} disabled={isExporting} style={{ fontSize: '13px', padding: '8px 14px' }}>
              {isExporting ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Download size={14} />}
              {isExporting ? 'Exporting...' : 'Download PDF'}
            </button>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '24px', display: 'grid', gridTemplateColumns: '420px 1fr', gap: '24px', alignItems: 'start' }}>

        {/* Left: Form */}
        <div style={{ position: 'sticky', top: '88px', maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', paddingRight: '4px' }}>
          <ResumeForm
            resume={resumeHook.resume}
            isLoading={resumeHook.isLoading}
            isDark={isDark}
            aiHook={aiHook}
            onUpdatePersonalInfo={resumeHook.updatePersonalInfo}
            onUpdateSummary={resumeHook.updateSummary}
            onAddExperience={resumeHook.addExperience}
            onUpdateExperience={resumeHook.updateExperience}
            onRemoveExperience={resumeHook.removeExperience}
            onAddEducation={resumeHook.addEducation}
            onUpdateEducation={resumeHook.updateEducation}
            onRemoveEducation={resumeHook.removeEducation}
            onAddSkill={resumeHook.addSkill}
            onRemoveSkill={resumeHook.removeSkill}
            onSetSkills={resumeHook.setSkills}
            onAddProject={resumeHook.addProject}
            onUpdateProject={resumeHook.updateProject}
            onRemoveProject={resumeHook.removeProject}
          />
        </div>

        {/* Right: Preview */}
        <div>
          <TemplateSelector selected={selectedTemplate} onSelect={setSelectedTemplate} isDark={isDark} />
          <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6366f1' }}>Live Preview</span>
            <span style={{ fontSize: '9px', color: t.textMuted, background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)', border: `1px solid ${t.previewBorder}`, borderRadius: '20px', padding: '2px 8px', letterSpacing: '0.05em' }}>A4 format</span>
          </div>
          <div style={{ background: t.previewBg, borderRadius: '16px', padding: '16px', border: `1px solid ${t.previewBorder}`, boxShadow: t.previewBoxShadow, transition: 'all 0.3s ease' }}>
            <div ref={previewRef} style={{ width: '100%', minHeight: '842px', background: '#ffffff', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 30px rgba(0,0,0,0.3)', fontFamily: "'Inter', sans-serif" }}>
              <ResumePreview resume={resume} template={selectedTemplate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
