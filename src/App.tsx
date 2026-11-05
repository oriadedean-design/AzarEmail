import { useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { EditorPanel } from './components/EditorPanel';
import { PreviewStage } from './components/PreviewStage';
import {
  createSpamTestDraft,
  PRESET_TEMPLATES,
  TEMPLATE_ORDER,
} from './data/presetTemplates';
import { EmailTemplateConfig, TemplateKind } from './types/emailTemplate';
import {
  auditEmailTemplate,
  sanitizeEmailTemplate,
} from './utils/complianceEngine';
import { generateEmailHtml } from './utils/emailHtmlGenerator';

const NAV_LABELS: Record<TemplateKind, string> = {
  newsletter: 'Biweekly Newsletter',
  'seasonal-easter': 'Seasonal Card',
  'cause-spotlight': 'Cause Spotlight',
  announcement: 'Announcements',
};

export function App() {
  const [activeTemplateId, setActiveTemplateId] =
    useState<TemplateKind>('newsletter');
  const [templatesById, setTemplatesById] =
    useState<Record<TemplateKind, EmailTemplateConfig>>(PRESET_TEMPLATES);
  const [headerCopied, setHeaderCopied] = useState(false);

  const activeConfig = templatesById[activeTemplateId];

  const complianceReport = useMemo(
    () => auditEmailTemplate(activeConfig),
    [activeConfig]
  );

  const handleTemplateChange = (updated: EmailTemplateConfig) => {
    setTemplatesById((prev) => ({
      ...prev,
      [updated.id]: updated,
    }));
  };

  const handleResetPreset = () => {
    setTemplatesById((prev) => ({
      ...prev,
      [activeTemplateId]: PRESET_TEMPLATES[activeTemplateId],
    }));
  };

  const handleLoadSpamTest = () => {
    setTemplatesById((prev) => ({
      ...prev,
      [activeTemplateId]: createSpamTestDraft(prev[activeTemplateId]),
    }));
  };

  const handleSanitize = () => {
    setTemplatesById((prev) => ({
      ...prev,
      [activeTemplateId]: sanitizeEmailTemplate(prev[activeTemplateId]),
    }));
  };

  const handlePrimaryCopyHtml = async () => {
    const html = generateEmailHtml(activeConfig, {
      forPreview: false,
      simulateDarkMode: false,
      simulateImagesBlocked: false,
      interpolateSampleTokens: false,
    });
    try {
      await navigator.clipboard.writeText(html);
      setHeaderCopied(true);
      setTimeout(() => setHeaderCopied(false), 2200);
    } catch {
      const el = document.createElement('textarea');
      el.value = html;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setHeaderCopied(true);
      setTimeout(() => setHeaderCopied(false), 2200);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#171615]">
      {/* Top Bar Contract: Strictly 3 zones separated by gap-8 */}
      <header className="w-full bg-[#FFFFFF] border-b border-[#E6DECB] px-6 py-3.5">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single-element Brand Wordmark + Icon */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              setActiveTemplateId('newsletter');
            }}
            className="inline-flex items-center gap-2.5 text-xl font-bold tracking-tight text-[#171615] whitespace-nowrap shrink-0 font-editorial"
          >
            <img
              src="/assets/aistudio/Azarfaith_Main-Icon_1a063292.png"
              alt="AzarFaith"
              className="w-6 h-6 object-contain shrink-0"
            />
            <span>azarfaith</span>
          </a>

          {/* Zone 2: 4 Single-Line Template Navigation Links */}
          <nav
            aria-label="Email Templates"
            className="flex items-center gap-6 overflow-x-auto"
          >
            {TEMPLATE_ORDER.map((tplId) => {
              const isActive = activeTemplateId === tplId;
              return (
                <button
                  key={tplId}
                  type="button"
                  onClick={() => setActiveTemplateId(tplId)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`py-1.5 text-sm font-medium transition-colors whitespace-nowrap shrink-0 border-b-2 cursor-pointer ${
                    isActive
                      ? 'border-[#FF5E00] text-[#171615] font-semibold'
                      : 'border-transparent text-[#57524C] hover:text-[#171615]'
                  }`}
                >
                  {NAV_LABELS[tplId]}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center shrink-0">
            <button
              type="button"
              onClick={handlePrimaryCopyHtml}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#FF5E00] text-white hover:bg-[#E05200] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {headerCopied ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{headerCopied ? 'Copied Email HTML' : 'Copy Email HTML'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Split Workbench */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto flex flex-col lg:flex-row">
        <EditorPanel
          config={activeConfig}
          onChange={handleTemplateChange}
          onResetPreset={handleResetPreset}
          onLoadSpamTest={handleLoadSpamTest}
        />
        <PreviewStage
          config={activeConfig}
          report={complianceReport}
          onSanitize={handleSanitize}
        />
      </div>
    </div>
  );
}

export default App;
