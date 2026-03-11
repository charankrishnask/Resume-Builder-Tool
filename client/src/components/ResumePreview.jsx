import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';

export default function ResumePreview({ resume, template }) {
  const renderTemplate = () => {
    switch (template) {
      case 'modern': return <ModernTemplate resume={resume} />;
      case 'executive': return <ExecutiveTemplate resume={resume} />;
      default: return <ClassicTemplate resume={resume} />;
    }
  };

  return renderTemplate();
}
