import React, { useMemo, useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Download,
  Eye,
  EyeOff,
  Monitor,
  Moon,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Sun,
} from 'lucide-react';
import {
  AZARFAITH_LOGOS,
  AZARFAITH_PALETTE,
  FIGMA_BRAND_GUIDELINE_LINKS,
  LOGO_MISUSE_DONTS,
  PHOTOGRAPHY_DIRECTIONS,
  STATIONERY_SIGNATORIES,
  TYPOGRAPHY_HIERARCHY_SPECS,
} from '../data/brandTokens';
import { PREVIEW_TEMPLATE_IMAGES } from '../data/previewMedia';
import { ComplianceReport, EmailTemplateConfig } from '../types/emailTemplate';
import {
  BRAND_ILLUSTRATION_SPECS,
  renderBrandMotifSvg,
} from '../utils/brandIllustrations';
import {
  generateEmailHtml,
  generatePlainTextEmail,
} from '../utils/emailHtmlGenerator';

interface PreviewStageProps {
  config: EmailTemplateConfig;
  report: ComplianceReport;
  onSanitize: () => void;
}

type StageViewMode = 'preview' | 'html' | 'audit';

export const PreviewStage: React.FC<PreviewStageProps> = ({
  config,
  report,
  onSanitize,
}) => {
  const [stageMode, setStageMode] = useState<StageViewMode>('preview');
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [simulateDarkMode, setSimulateDarkMode] = useState(false);
  const [simulateImagesBlocked, setSimulateImagesBlocked] = useState(false);
  const [interpolateTokens, setInterpolateTokens] = useState(true);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedPlain, setCopiedPlain] = useState(false);

  const previewHtml = useMemo(
    () =>
      generateEmailHtml(config, {
        forPreview: true,
        previewImageOverride: PREVIEW_TEMPLATE_IMAGES[config.id],
        previewOrigin:
          typeof window !== 'undefined' ? window.location.origin : '',
        simulateDarkMode,
        simulateImagesBlocked,
        interpolateSampleTokens: interpolateTokens,
      }),
    [config, simulateDarkMode, simulateImagesBlocked, interpolateTokens]
  );

  const exportHtml = useMemo(
    () =>
      generateEmailHtml(config, {
        forPreview: false,
        simulateDarkMode: false,
        simulateImagesBlocked: false,
        interpolateSampleTokens: false,
      }),
    [config]
  );

  const plainText = useMemo(() => generatePlainTextEmail(config), [config]);

  const handleCopyExportHtml = async () => {
    try {
      await navigator.clipboard.writeText(exportHtml);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2200);
    } catch {
      // Fallback textarea copy
      const el = document.createElement('textarea');
      el.value = exportHtml;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 2200);
    }
  };

  const handleCopyPlainText = async () => {
    try {
      await navigator.clipboard.writeText(plainText);
      setCopiedPlain(true);
      setTimeout(() => setCopiedPlain(false), 2200);
    } catch {
      setCopiedPlain(false);
    }
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([exportHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `azarfaith-${config.id}-template.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const displaySubject = interpolateTokens
    ? config.subjectLine.replace(/\{\{donor_first_name\}\}/gi, 'Chinedu')
    : config.subjectLine;
  const displayPreheader = interpolateTokens
    ? config.preheaderText.replace(/\{\{donor_first_name\}\}/gi, 'Chinedu')
    : config.preheaderText;

  return (
    <main className="flex-1 min-w-0 bg-[#F5EFE4] flex flex-col">
      {/* Workspace Toolbar */}
      <div className="px-5 py-3 bg-[#FBF9F5] border-b border-[#E6DECB] flex flex-wrap items-center justify-between gap-3">
        {/* Stage View Switcher */}
        <div
          role="tablist"
          aria-label="Workspace View Mode"
          className="flex items-center gap-1 p-1 bg-[#EFE8DA] rounded-lg"
        >
          <button
            type="button"
            role="tab"
            aria-selected={stageMode === 'preview'}
            onClick={() => setStageMode('preview')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              stageMode === 'preview'
                ? 'bg-[#FFFFFF] text-[#171615] shadow-xs'
                : 'text-[#57524C] hover:text-[#171615]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Live Preview
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={stageMode === 'html'}
            onClick={() => setStageMode('html')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              stageMode === 'html'
                ? 'bg-[#FFFFFF] text-[#171615] shadow-xs'
                : 'text-[#57524C] hover:text-[#171615]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            HTML Code
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={stageMode === 'audit'}
            onClick={() => setStageMode('audit')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              stageMode === 'audit'
                ? 'bg-[#FFFFFF] text-[#171615] shadow-xs'
                : 'text-[#57524C] hover:text-[#171615]'
            }`}
          >
            {report.isReadyToSend ? (
              <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
            ) : (
              <ShieldAlert className="w-3.5 h-3.5 text-[#DC2626]" />
            )}
            Compliance Audit ({report.passCount}/{report.checks.length})
          </button>
        </div>

        {/* Client Simulation Controls & Unboxed Compliance Readout */}
        <div className="flex flex-wrap items-center gap-2">
          {stageMode === 'preview' && (
            <>
              <div className="flex items-center gap-1 p-1 bg-[#EFE8DA] rounded-lg">
                <button
                  type="button"
                  onClick={() => setViewport('desktop')}
                  aria-label="Desktop 600px preview"
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    viewport === 'desktop'
                      ? 'bg-[#FFFFFF] text-[#171615] shadow-xs'
                      : 'text-[#57524C] hover:text-[#171615]'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  600px
                </button>
                <button
                  type="button"
                  onClick={() => setViewport('mobile')}
                  aria-label="Mobile 375px preview"
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    viewport === 'mobile'
                      ? 'bg-[#FFFFFF] text-[#171615] shadow-xs'
                      : 'text-[#57524C] hover:text-[#171615]'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  375px
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSimulateDarkMode(!simulateDarkMode)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  simulateDarkMode
                    ? 'bg-[#171615] text-[#F6EBD9] border-[#171615]'
                    : 'bg-[#FFFFFF] text-[#57524C] border-[#E6DECB] hover:text-[#171615]'
                }`}
              >
                {simulateDarkMode ? (
                  <Moon className="w-3.5 h-3.5" />
                ) : (
                  <Sun className="w-3.5 h-3.5" />
                )}
                Dark Client
              </button>

              <button
                type="button"
                onClick={() => setSimulateImagesBlocked(!simulateImagesBlocked)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  simulateImagesBlocked
                    ? 'bg-[#171615] text-[#F6EBD9] border-[#171615]'
                    : 'bg-[#FFFFFF] text-[#57524C] border-[#E6DECB] hover:text-[#171615]'
                }`}
              >
                <EyeOff className="w-3.5 h-3.5" />
                Images Blocked
              </button>

              <button
                type="button"
                onClick={() => setInterpolateTokens(!interpolateTokens)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  interpolateTokens
                    ? 'bg-[#FFFFFF] text-[#171615] border-[#E6DECB]'
                    : 'bg-[#EFE8DA] text-[#171615] border-[#D8CEBA]'
                }`}
              >
                {interpolateTokens ? 'Sample Donor Data' : 'Raw {{tags}}'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Unboxed Compliance & Ratio Summary Strip */}
      <div className="px-5 py-2 bg-[#FFFFFF] border-b border-[#E6DECB] flex flex-wrap items-center justify-between gap-2 text-xs text-[#57524C]">
        <div className="flex flex-wrap items-center gap-2">
          {report.isReadyToSend ? (
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#16A34A]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              CASL &amp; NDPA Compliant
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-semibold text-[#DC2626]">
              <AlertCircle className="w-3.5 h-3.5" />
              {report.errorCount} Compliance Action
              {report.errorCount > 1 ? 's' : ''} Required
            </span>
          )}
          <span aria-hidden="true">&middot;</span>
          <span className="tabular-nums">
            Text/Image Ratio: {report.textToImageRatio.textPercent}:
            {report.textToImageRatio.imagePercent} (
            {report.textToImageRatio.wordCount} words)
          </span>
          <span aria-hidden="true">&middot;</span>
          <span className="tabular-nums">
            Spam Flags: {report.spamTriggers.length}
          </span>
        </div>

        <span className="text-[11px] text-[#57524C]">
          MSO VML Buttons + 600px Fluid Hybrid Tables
        </span>
      </div>

      {/* Anti-Phishing & Compliance Alert Banner (Appears when issues are detected) */}
      {(report.spamTriggers.length > 0 || !report.isReadyToSend) && (
        <div className="mx-5 mt-4 p-4 rounded-lg border border-red-300 bg-red-50/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-red-900">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>
                Deliverability &amp; Anti-Phishing Guardrail Triggered
              </span>
            </div>
            <p className="text-xs text-red-800 leading-relaxed">
              {report.spamTriggers.length > 0
                ? `Flagged "${report.spamTriggers[0].phrase}" in ${report.spamTriggers[0].field} (${report.spamTriggers[0].reason}).`
                : report.checks.find((c) => c.severity === 'error')?.detail}
            </p>
          </div>
          <button
            type="button"
            onClick={onSanitize}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#FF5E00] text-white hover:bg-[#E05200] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Sanitize Copy &amp; Links
          </button>
        </div>
      )}

      {/* Stage Content */}
      <div className="flex-1 p-5 overflow-y-auto">
        {stageMode === 'preview' && (
          <div className="max-w-[680px] mx-auto space-y-3">
            {/* Realistic Email Client Envelope Header */}
            <div className="bg-[#FFFFFF] border border-[#E6DECB] rounded-lg px-4 py-3 space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="truncate">
                  <span className="text-[#57524C] font-medium">From: </span>
                  <span className="font-semibold text-[#171615]">
                    {config.senderName}
                  </span>{' '}
                  <span className="text-[#57524C] font-mono text-[11px]">
                    &lt;{config.senderEmail}&gt;
                  </span>
                </div>
                <span className="text-[11px] font-mono text-[#57524C] tabular-nums shrink-0 ml-2">
                  {viewport === 'desktop' ? '600px Desktop' : '375px Mobile'}
                </span>
              </div>
              <div className="text-sm font-semibold text-[#171615] truncate">
                {displaySubject}
              </div>
              <div className="text-xs text-[#57524C] truncate">
                <span className="font-medium text-[#171615]">Preheader: </span>
                {displayPreheader}
              </div>
            </div>

            {/* Responsive Email Iframe */}
            <div className="flex justify-center">
              <div
                className="transition-all duration-200 border border-[#D8CEBA] rounded-lg overflow-hidden bg-white shadow-xs"
                style={{
                  width: viewport === 'desktop' ? '624px' : '375px',
                  maxWidth: '100%',
                }}
              >
                <iframe
                  title={`${config.templateLabel} Live Email Preview`}
                  srcDoc={previewHtml}
                  className="w-full border-0 block"
                  style={{ height: '940px' }}
                />
              </div>
            </div>
          </div>
        )}

        {stageMode === 'html' && (
          <div className="max-w-[920px] mx-auto space-y-4">
            {/* Validation Confirmation Banner per Output Protocol */}
            <div className="p-4 rounded-lg border border-[#E6DECB] bg-[#FFFFFF] space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {report.isReadyToSend ? (
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-[#D97706]" />
                  )}
                  <h3 className="text-sm font-semibold text-[#171615]">
                    ESP-Ready Production HTML Validation Summary
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyExportHtml}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#FF5E00] text-white hover:bg-[#E05200] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {copiedHtml ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copiedHtml ? 'Copied <!DOCTYPE html>' : 'Copy <!DOCTYPE html>'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyPlainText}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-[#E6DECB] bg-[#FBF9F5] text-[#171615] hover:border-[#FF5E00] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    {copiedPlain ? (
                      <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    {copiedPlain ? 'Copied Plain Text' : 'Copy Plain Text'}
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadHtml}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-[#E6DECB] bg-[#FBF9F5] text-[#171615] hover:border-[#FF5E00] transition-colors whitespace-nowrap cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Download .html
                  </button>
                </div>
              </div>
              <p className="text-xs text-[#57524C] leading-relaxed">
                Self-contained <code className="font-mono">600px</code> hybrid
                table layout with MSO <code className="font-mono">&lt;v:roundrect&gt;</code>{' '}
                bulletproof CTA buttons, inline CSS, hidden preheader,{' '}
                <code className="font-mono">https://</code> verified URLs, and
                hardcoded CASL + NDPA/NDPR compliance disclosures. Look for{' '}
                <code className="font-mono">&lt;!-- EDIT COPY HERE --&gt;</code> and{' '}
                <code className="font-mono">&lt;!-- DYNAMIC IMAGE URL HERE --&gt;</code>{' '}
                comments for manual ESP tweaks.
              </p>
            </div>

            {/* Raw HTML Code Block */}
            <div className="rounded-lg border border-[#2C2926] bg-[#171615] text-[#F6EBD9] overflow-hidden">
              <div className="px-4 py-2.5 bg-[#22201E] border-b border-[#332F2B] flex items-center justify-between text-xs">
                <span className="font-mono text-[#C7BFB3]">
                  azarfaith-{config.id}-template.html
                </span>
                <span className="font-mono text-[#C7BFB3] tabular-nums">
                  {exportHtml.split('\n').length} lines &middot;{' '}
                  {(exportHtml.length / 1024).toFixed(1)} KB
                </span>
              </div>
              <pre className="p-4 text-xs font-mono leading-relaxed overflow-x-auto max-h-[760px] overflow-y-auto select-all">
                <code>{exportHtml}</code>
              </pre>
            </div>
          </div>
        )}

        {stageMode === 'audit' && (
          <div className="max-w-[920px] mx-auto space-y-6">
            {/* Detailed Compliance & Deliverability Audit Table */}
            <div className="bg-[#FFFFFF] border border-[#E6DECB] rounded-lg overflow-hidden">
              <div className="px-5 py-4 border-b border-[#E6DECB] flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-semibold text-[#171615]">
                    Legal Compliance &amp; Deliverability Gate
                  </h3>
                  <p className="text-xs text-[#57524C]">
                    Enforces Canada&rsquo;s CASL, Nigeria&rsquo;s NDPA / NCC,
                    anti-phishing link rules, and AzarFaith Visual Identity
                    standards.
                  </p>
                </div>
                {!report.isReadyToSend && (
                  <button
                    type="button"
                    onClick={onSanitize}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#FF5E00] text-white hover:bg-[#E05200] cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Auto-Sanitize Issues
                  </button>
                )}
              </div>

              <div className="divide-y divide-[#E6DECB]">
                {report.checks.map((check) => (
                  <div
                    key={check.id}
                    className="px-5 py-3.5 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-mono uppercase text-[11px] text-[#57524C]">
                          {check.category}
                        </span>
                        <span aria-hidden="true">&middot;</span>
                        <span className="font-semibold text-[#171615]">
                          {check.label}
                        </span>
                      </div>
                      <p className="text-xs text-[#57524C] leading-relaxed">
                        {check.detail}
                      </p>
                    </div>
                    <span
                      className={`text-[11px] font-mono font-semibold uppercase shrink-0 ${
                        check.severity === 'pass'
                          ? 'text-[#16A34A]'
                          : check.severity === 'warning'
                          ? 'text-[#D97706]'
                          : 'text-[#DC2626]'
                      }`}
                    >
                      {check.severity === 'pass'
                        ? 'PASS'
                        : check.severity === 'warning'
                        ? 'REVIEW'
                        : 'BLOCKED'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official AzarFaith Brand Guideline Reference (Sections 01 to 06) */}
            <div className="bg-[#FFFFFF] border border-[#E6DECB] rounded-lg p-5 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#E6DECB] pb-4">
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-[#FF5E00]">
                    {FIGMA_BRAND_GUIDELINE_LINKS.version}
                  </p>
                  <h3 className="text-base font-semibold text-[#171615] mt-0.5">
                    AzarFaith Visual Identity System (Sections 01–06)
                  </h3>
                  <p className="text-xs text-[#57524C]">
                    Synchronized with the official Figma Brand Guidelines and
                    Dev Mode specification.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <a
                    href={FIGMA_BRAND_GUIDELINE_LINKS.prototypeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg border border-[#E6DECB] bg-[#FBF9F5] font-medium text-[#171615] hover:border-[#FF5E00] transition-colors"
                  >
                    Figma Prototype &rarr;
                  </a>
                  <a
                    href={FIGMA_BRAND_GUIDELINE_LINKS.devModeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg border border-[#E6DECB] bg-[#FBF9F5] font-medium text-[#171615] hover:border-[#FF5E00] transition-colors"
                  >
                    Figma Dev Mode &rarr;
                  </a>
                </div>
              </div>

              {/* Section 01: Logos, Icons & Don'ts */}
              <div className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#171615]">
                    01. Logo &amp; Standalone Icon System (Min Digital Width: 200px)
                  </h4>
                  <span className="text-xs text-[#57524C]">
                    Partnership Rule: AzarFaith always takes leading position
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {Object.values(AZARFAITH_LOGOS).map((logo) => {
                    const isDark = logo.id === 'white' || logo.id === 'cream';
                    return (
                      <div
                        key={logo.id}
                        className={`p-3 rounded-lg border border-[#E6DECB] space-y-2.5 ${
                          isDark ? 'bg-[#171615]' : 'bg-[#FBF9F5]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <img
                            src={logo.previewPath}
                            alt={logo.label}
                            className="h-5 w-auto object-contain"
                          />
                          <img
                            src={logo.iconPreviewPath}
                            alt={`${logo.label} Icon`}
                            className="h-5 w-5 object-contain shrink-0"
                          />
                        </div>
                        <p
                          className={`text-[11px] font-medium ${
                            isDark ? 'text-[#F6EBD9]' : 'text-[#57524C]'
                          }`}
                        >
                          {logo.label}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="p-3 rounded-lg bg-[#FBF9F5] border border-[#E6DECB]">
                  <p className="text-[11px] font-semibold text-[#171615] mb-1.5">
                    Protected Logomark Integrity Rules (Section 01 Don&rsquo;ts):
                  </p>
                  <p className="text-xs text-[#57524C] leading-relaxed">
                    {LOGO_MISUSE_DONTS.join(' · ')}
                  </p>
                </div>
              </div>

              {/* Section 02: Colours */}
              <div className="space-y-3 pt-4 border-t border-[#E6DECB]">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#171615]">
                    02. Official Brand Colour Palette
                  </h4>
                  <span className="text-xs text-[#57524C]">
                    Azar Orange (#ff5e00) is our defining colour
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2.5">
                  {AZARFAITH_PALETTE.map((swatch) => (
                    <div key={swatch.name} className="space-y-1.5">
                      <div
                        className="h-12 rounded-md border border-black/10"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <div>
                        <p className="text-[11px] font-semibold text-[#171615] leading-tight">
                          {swatch.name}
                        </p>
                        <p className="text-[10px] font-mono text-[#57524C]">
                          {swatch.hex}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 03: Typography Hierarchy */}
              <div className="space-y-3 pt-4 border-t border-[#E6DECB]">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#171615]">
                    03. Typography &amp; Optical Hierarchy
                  </h4>
                  <span className="text-xs text-[#57524C]">
                    Martina Plantijn + Onest (Fallback: Inter)
                  </span>
                </div>
                <div className="divide-y divide-[#E6DECB] border border-[#E6DECB] rounded-lg overflow-hidden">
                  {TYPOGRAPHY_HIERARCHY_SPECS.map((spec) => (
                    <div
                      key={spec.role}
                      className="p-3 bg-[#FBF9F5] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                    >
                      <div>
                        <p className="text-xs font-semibold text-[#171615]">
                          {spec.role} &middot;{' '}
                          <span className="font-normal text-[#57524C]">
                            {spec.typeface}
                          </span>
                        </p>
                        <p className="text-xs text-[#57524C] italic mt-0.5">
                          &ldquo;{spec.sample}&rdquo;
                        </p>
                      </div>
                      <div className="text-[11px] font-mono text-[#57524C] shrink-0">
                        Size: {spec.size} &middot; Leading: {spec.leading}{' '}
                        &middot; Tracking: {spec.tracking}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 04 & 05: Uniform-Line Illustrations, Puzzle Structure & Photography */}
              <div className="space-y-3 pt-4 border-t border-[#E6DECB]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#171615]">
                  04 &amp; 05. Uniform-Line Illustration Library &amp; Three Photography Jobs
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {Object.values(BRAND_ILLUSTRATION_SPECS).map((motif) => (
                    <div
                      key={motif.id}
                      className="p-3 rounded-lg border border-[#E6DECB] bg-[#FBF9F5] flex items-center gap-3"
                    >
                      <div
                        className="shrink-0"
                        dangerouslySetInnerHTML={{
                          __html: renderBrandMotifSvg(
                            motif.id,
                            '#ff5e00',
                            '#f6ab00',
                            '#f6ebd9',
                            '#171615'
                          ),
                        }}
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#171615] truncate">
                          {motif.title}
                        </p>
                        <p className="text-[11px] text-[#57524C] leading-snug mt-0.5">
                          {motif.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
                  {Object.values(PHOTOGRAPHY_DIRECTIONS).map((dir) => (
                    <div
                      key={dir.id}
                      className="p-3 rounded-lg border border-[#E6DECB] bg-[#FBF9F5] space-y-1"
                    >
                      <p className="text-xs font-semibold text-[#171615]">
                        {dir.step}
                      </p>
                      <p className="text-[11px] text-[#57524C] leading-relaxed">
                        {dir.ruleSummary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 06: Stationery & Verified Signatories */}
              <div className="space-y-2.5 pt-4 border-t border-[#E6DECB]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#171615]">
                  06. Official Stationery &amp; Head Office Signatories
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {STATIONERY_SIGNATORIES.map((sig) => (
                    <div
                      key={sig.name}
                      className="p-3 rounded-lg border border-[#E6DECB] bg-[#FBF9F5] text-xs space-y-0.5"
                    >
                      <p className="font-semibold text-[#171615]">
                        {sig.name} &middot;{' '}
                        <span className="font-normal text-[#57524C]">
                          {sig.role}
                        </span>
                      </p>
                      <p className="text-[#57524C] font-mono text-[11px]">
                        {sig.email} &middot; {sig.phone}
                      </p>
                      <p className="text-[#57524C] text-[11px]">{sig.address}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
