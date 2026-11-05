import React, { useState } from 'react';
import {
  AlertTriangle,
  Check,
  Image as ImageIcon,
  Plus,
  RotateCcw,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import {
  AZARFAITH_LOGOS,
  BRAND_PAIRINGS,
  CURATED_TEMPLATE_VISUALS,
  PHOTOGRAPHY_DIRECTIONS,
} from '../data/brandTokens';
import { PREVIEW_TEMPLATE_IMAGES } from '../data/previewMedia';
import {
  BrandPairingId,
  CaslClassification,
  EmailTemplateConfig,
  IllustrationMotifId,
  LogoColourwayId,
  PhotographyJobDirection,
} from '../types/emailTemplate';
import { BRAND_ILLUSTRATION_SPECS } from '../utils/brandIllustrations';

interface EditorPanelProps {
  config: EmailTemplateConfig;
  onChange: (updated: EmailTemplateConfig) => void;
  onResetPreset: () => void;
  onLoadSpamTest: () => void;
}

type EditorTab = 'copy-brand' | 'media-modules' | 'casl-ndpa';

export const EditorPanel: React.FC<EditorPanelProps> = ({
  config,
  onChange,
  onResetPreset,
  onLoadSpamTest,
}) => {
  const [activeTab, setActiveTab] = useState<EditorTab>('copy-brand');

  const updateField = <K extends keyof EmailTemplateConfig>(
    key: K,
    value: EmailTemplateConfig[K]
  ) => {
    onChange({ ...config, [key]: value });
  };

  const activePairing = BRAND_PAIRINGS[config.pairingId];
  const resolvedLogoKey =
    config.logoColourway === 'auto'
      ? activePairing.recommendedLogo
      : config.logoColourway;
  const activeLogoSpec = AZARFAITH_LOGOS[resolvedLogoKey];
  const curatedVisual = CURATED_TEMPLATE_VISUALS[config.id];

  const handleInsertToken = (token: string) => {
    if (config.bodyParagraphs.length === 0) {
      updateField('bodyParagraphs', [`${token} — `]);
      return;
    }
    const updated = [...config.bodyParagraphs];
    updated[0] = `${updated[0]} ${token}`;
    updateField('bodyParagraphs', updated);
  };

  const handleParagraphChange = (index: number, value: string) => {
    const updated = [...config.bodyParagraphs];
    updated[index] = value;
    updateField('bodyParagraphs', updated);
  };

  const handleAddParagraph = () => {
    updateField('bodyParagraphs', [
      ...config.bodyParagraphs,
      'Every piece is somebody. Share a concrete, dated update from the parish or community.',
    ]);
  };

  const handleRemoveParagraph = (index: number) => {
    if (config.bodyParagraphs.length <= 1) return;
    updateField(
      'bodyParagraphs',
      config.bodyParagraphs.filter((_, i) => i !== index)
    );
  };

  return (
    <aside className="w-full lg:w-[440px] xl:w-[468px] shrink-0 border-b lg:border-b-0 lg:border-r border-[#E6DECB] bg-[#FFFFFF] flex flex-col">
      {/* Editor Section Tabs */}
      <div className="px-5 pt-4 pb-3 border-b border-[#E6DECB] bg-[#FBF9F5]">
        <div
          role="tablist"
          aria-label="Template Editor Sections"
          className="grid grid-cols-3 gap-1 p-1 bg-[#EFE8DA] rounded-lg"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'copy-brand'}
            onClick={() => setActiveTab('copy-brand')}
            className={`px-2.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap truncate cursor-pointer ${
              activeTab === 'copy-brand'
                ? 'bg-[#FFFFFF] text-[#171615] shadow-xs'
                : 'text-[#57524C] hover:text-[#171615]'
            }`}
          >
            Copy &amp; Brand
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'media-modules'}
            onClick={() => setActiveTab('media-modules')}
            className={`px-2.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap truncate cursor-pointer ${
              activeTab === 'media-modules'
                ? 'bg-[#FFFFFF] text-[#171615] shadow-xs'
                : 'text-[#57524C] hover:text-[#171615]'
            }`}
          >
            Media &amp; Blocks
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'casl-ndpa'}
            onClick={() => setActiveTab('casl-ndpa')}
            className={`px-2.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap truncate cursor-pointer ${
              activeTab === 'casl-ndpa'
                ? 'bg-[#FFFFFF] text-[#171615] shadow-xs'
                : 'text-[#57524C] hover:text-[#171615]'
            }`}
          >
            CASL &amp; NDPA
          </button>
        </div>
      </div>

      {/* Scrollable Editor Form */}
      <div className="p-5 space-y-6 overflow-y-auto flex-1">
        {activeTab === 'copy-brand' && (
          <>
            {/* Approved Colour Pairings (Section 02) */}
            <section className="space-y-3 pb-5 border-b border-[#E6DECB]">
              <div className="flex items-baseline justify-between">
                <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-[#57524C]">
                  Brand Colour Pairing (Section 02)
                </h2>
                <span className="text-xs text-[#57524C]">
                  {activePairing.name}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {(Object.keys(BRAND_PAIRINGS) as BrandPairingId[]).map(
                  (pId) => {
                    const p = BRAND_PAIRINGS[pId];
                    const selected = config.pairingId === pId;
                    return (
                      <button
                        key={pId}
                        type="button"
                        onClick={() => updateField('pairingId', pId)}
                        className={`p-2.5 rounded-lg border text-left transition-colors cursor-pointer ${
                          selected
                            ? 'border-[#FF5E00] bg-[#FBF9F5]'
                            : 'border-[#E6DECB] bg-[#FFFFFF] hover:border-[#C9BFA9]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="flex items-center gap-1">
                            <span
                              className="w-3.5 h-3.5 rounded-xs border border-black/10"
                              style={{ backgroundColor: p.headerBg }}
                            />
                            <span
                              className="w-3.5 h-3.5 rounded-xs border border-black/10"
                              style={{ backgroundColor: p.accentPrimary }}
                            />
                            <span
                              className="w-3.5 h-3.5 rounded-xs border border-black/10"
                              style={{ backgroundColor: p.accentSecondary }}
                            />
                          </div>
                          {selected && (
                            <Check className="w-3.5 h-3.5 text-[#FF5E00]" />
                          )}
                        </div>
                        <p className="text-xs font-semibold text-[#171615] truncate">
                          {p.name}
                        </p>
                      </button>
                    );
                  }
                )}
              </div>

              {/* Logo Colourway & Partnership Co-Branding (Section 01) */}
              <div className="pt-2 space-y-3">
                <div>
                  <label
                    htmlFor="logo-colourway"
                    className="block text-xs font-medium text-[#171615] mb-1"
                  >
                    Logo Colourway (200px min width)
                  </label>
                  <select
                    id="logo-colourway"
                    value={config.logoColourway}
                    onChange={(e) =>
                      updateField(
                        'logoColourway',
                        e.target.value as LogoColourwayId
                      )
                    }
                    className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                  >
                    <option value="auto">
                      Auto-Matched ({activeLogoSpec.label})
                    </option>
                    <option value="main">
                      Primary (Orange Mark + Black Wordmark)
                    </option>
                    <option value="white">Reversed Pure White</option>
                    <option value="cream">Janna Cream (#f6ebd9)</option>
                    <option value="black">Monochrome Black</option>
                  </select>
                </div>

                <div
                  className="px-3.5 py-2.5 rounded-lg border border-[#E6DECB] flex items-center justify-between"
                  style={{ backgroundColor: activePairing.headerBg }}
                >
                  <img
                    src={activeLogoSpec.previewPath}
                    alt="Active AzarFaith Logo Preview"
                    className="h-6 w-auto object-contain"
                  />
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: activePairing.headerText }}
                  >
                    {activePairing.headerBg}
                  </span>
                </div>

                {/* Partner Co-Branding Lockup Toggle */}
                <div className="pt-1">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-medium text-[#171615]">
                      Co-Branded Partner Lockup (AzarFaith Leads)
                    </span>
                    <input
                      type="checkbox"
                      checked={config.partnerEnabled}
                      onChange={(e) =>
                        updateField('partnerEnabled', e.target.checked)
                      }
                      className="w-4 h-4 accent-[#FF5E00] rounded cursor-pointer"
                    />
                  </label>

                  {config.partnerEnabled && (
                    <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={config.partnerName}
                        onChange={(e) =>
                          updateField('partnerName', e.target.value)
                        }
                        placeholder="Partner ministry or parish name"
                        aria-label="Partner organization name"
                        className="sm:col-span-2 px-3 py-1.5 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                      />
                      <select
                        value={config.partnerLayout}
                        onChange={(e) =>
                          updateField(
                            'partnerLayout',
                            e.target.value as 'horizontal' | 'vertical'
                          )
                        }
                        aria-label="Partnership lockup orientation"
                        className="px-2.5 py-1.5 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                      >
                        <option value="horizontal">Horizontal</option>
                        <option value="vertical">Vertical</option>
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Inbox Envelope & Preheader */}
            <section className="space-y-3 pb-5 border-b border-[#E6DECB]">
              <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-[#57524C]">
                Inbox Envelope &amp; Hidden Preheader
              </h2>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="subject-line"
                    className="text-xs font-medium text-[#171615]"
                  >
                    Subject Line
                  </label>
                  <span className="text-[11px] text-[#57524C] tabular-nums">
                    {config.subjectLine.length} chars
                  </span>
                </div>
                <input
                  id="subject-line"
                  type="text"
                  value={config.subjectLine}
                  onChange={(e) => updateField('subjectLine', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="preheader-text"
                    className="text-xs font-medium text-[#171615]"
                  >
                    Hidden Preheader Snippet
                  </label>
                  <span className="text-[11px] text-[#57524C] tabular-nums">
                    {config.preheaderText.length} chars
                  </span>
                </div>
                <textarea
                  id="preheader-text"
                  rows={2}
                  value={config.preheaderText}
                  onChange={(e) => updateField('preheaderText', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                />
              </div>
            </section>

            {/* Editorial Copy & Bulletproof CTA */}
            <section className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-[#57524C]">
                  Campaign Copy &amp; CTA
                </h2>
                <button
                  type="button"
                  onClick={() => handleInsertToken('{{donor_first_name}}')}
                  className="text-[11px] font-semibold text-[#FF5E00] hover:underline cursor-pointer"
                >
                  + Insert {'{{donor_first_name}}'}
                </button>
              </div>

              <div>
                <label
                  htmlFor="kicker-input"
                  className="block text-xs font-medium text-[#171615] mb-1"
                >
                  Location &amp; Date Kicker
                </label>
                <input
                  id="kicker-input"
                  type="text"
                  value={config.locationDateKicker}
                  onChange={(e) =>
                    updateField('locationDateKicker', e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                />
              </div>

              <div>
                <label
                  htmlFor="headline-input"
                  className="block text-xs font-medium text-[#171615] mb-1"
                >
                  Display Headline (Martina Plantijn / Serif)
                </label>
                <input
                  id="headline-input"
                  type="text"
                  value={config.headline}
                  onChange={(e) => updateField('headline', e.target.value)}
                  className="w-full px-3 py-2 text-sm font-medium bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                />
              </div>

              <div>
                <label
                  htmlFor="subheading-input"
                  className="block text-xs font-medium text-[#171615] mb-1"
                >
                  Subheading (Onest Medium)
                </label>
                <input
                  id="subheading-input"
                  type="text"
                  value={config.subheading}
                  onChange={(e) => updateField('subheading', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                />
              </div>

              <div>
                <label
                  htmlFor="greeting-input"
                  className="block text-xs font-medium text-[#171615] mb-1"
                >
                  Greeting Line
                </label>
                <input
                  id="greeting-input"
                  type="text"
                  value={config.greetingLine}
                  onChange={(e) => updateField('greetingLine', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#171615]">
                    Body Narrative Paragraphs
                  </span>
                  <button
                    type="button"
                    onClick={handleAddParagraph}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#171615] hover:text-[#FF5E00] cursor-pointer"
                  >
                    <Plus className="w-3 h-3" /> Add Paragraph
                  </button>
                </div>
                {config.bodyParagraphs.map((para, idx) => (
                  <div key={idx} className="relative">
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) =>
                        handleParagraphChange(idx, e.target.value)
                      }
                      aria-label={`Body paragraph ${idx + 1}`}
                      className="w-full px-3 py-2 pr-8 text-xs leading-relaxed bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                    />
                    {config.bodyParagraphs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveParagraph(idx)}
                        title="Remove paragraph"
                        aria-label={`Remove paragraph ${idx + 1}`}
                        className="absolute top-2 right-2 p-1 text-[#57524C] hover:text-red-600 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <label
                  htmlFor="closing-quote"
                  className="block text-xs font-medium text-[#171615] mb-1"
                >
                  Closing Partnership Statement
                </label>
                <input
                  id="closing-quote"
                  type="text"
                  value={config.closingQuote}
                  onChange={(e) => updateField('closingQuote', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div>
                  <label
                    htmlFor="cta-label"
                    className="block text-xs font-medium text-[#171615] mb-1"
                  >
                    Bulletproof CTA Label
                  </label>
                  <input
                    id="cta-label"
                    type="text"
                    value={config.ctaLabel}
                    onChange={(e) => updateField('ctaLabel', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cta-url"
                    className="block text-xs font-medium text-[#171615] mb-1"
                  >
                    Destination HTTPS URL
                  </label>
                  <input
                    id="cta-url"
                    type="url"
                    value={config.ctaUrl}
                    onChange={(e) => updateField('ctaUrl', e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                  />
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'media-modules' && (
          <>
            {/* Dynamic Image Parameters (Section 05) */}
            <section className="space-y-3.5 pb-5 border-b border-[#E6DECB]">
              <div className="flex items-center justify-between">
                <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-[#57524C]">
                  Dynamic Image &amp; Sourcing
                </h2>
                <span className="text-[11px] text-[#57524C]">
                  {curatedVisual.width}&times;{curatedVisual.height}px
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1 p-1 bg-[#EFE8DA] rounded-lg">
                <button
                  type="button"
                  onClick={() =>
                    updateField('imageSourceMode', 'curated-asset')
                  }
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    config.imageSourceMode === 'curated-asset'
                      ? 'bg-[#FFFFFF] text-[#171615] shadow-xs'
                      : 'text-[#57524C] hover:text-[#171615]'
                  }`}
                >
                  Curated Brand Asset
                </button>
                <button
                  type="button"
                  onClick={() =>
                    updateField('imageSourceMode', 'dynamic-esp-url')
                  }
                  className={`px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    config.imageSourceMode === 'dynamic-esp-url'
                      ? 'bg-[#FFFFFF] text-[#171615] shadow-xs'
                      : 'text-[#57524C] hover:text-[#171615]'
                  }`}
                >
                  Dynamic ESP URL
                </button>
              </div>

              {config.imageSourceMode === 'curated-asset' ? (
                <div className="rounded-lg overflow-hidden border border-[#E6DECB] bg-[#FBF9F5]">
                  <img
                    src={PREVIEW_TEMPLATE_IMAGES[config.id]}
                    alt={config.imageAltText}
                    className="w-full h-36 object-cover"
                  />
                  <div className="px-3 py-2 text-[11px] text-[#57524C] flex items-center justify-between">
                    <span>{curatedVisual.mediumType}</span>
                    <ImageIcon className="w-3.5 h-3.5 shrink-0" />
                  </div>
                </div>
              ) : (
                <div>
                  <label
                    htmlFor="dynamic-img-url"
                    className="block text-xs font-medium text-[#171615] mb-1"
                  >
                    Dynamic HTTPS Image URL (Supports {'{{merge_tags}}'})
                  </label>
                  <input
                    id="dynamic-img-url"
                    type="url"
                    value={config.dynamicImageUrl}
                    onChange={(e) =>
                      updateField('dynamicImageUrl', e.target.value)
                    }
                    placeholder="https://cdn.azarfaith.com/campaigns/{{campaign_slug}}/hero.jpg"
                    className="w-full px-3 py-2 text-xs font-mono bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="img-alt"
                  className="block text-xs font-medium text-[#171615] mb-1"
                >
                  Descriptive Alt Text (Shown when images are blocked)
                </label>
                <textarea
                  id="img-alt"
                  rows={2}
                  value={config.imageAltText}
                  onChange={(e) => updateField('imageAltText', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                />
              </div>

              <div>
                <label
                  htmlFor="img-caption"
                  className="block text-xs font-medium text-[#171615] mb-1"
                >
                  Town, Month &amp; Source Attribution (Section 05)
                </label>
                <input
                  id="img-caption"
                  type="text"
                  value={config.imageCaption}
                  onChange={(e) => updateField('imageCaption', e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                />
              </div>

              <div>
                <span className="block text-xs font-medium text-[#171615] mb-1.5">
                  Image-Blocked Fallback Background
                </span>
                <div className="flex items-center gap-2">
                  {['#f6ebd9', '#ff5e00', '#52106a', '#4164fe', '#f6ab00'].map(
                    (hex) => (
                      <button
                        key={hex}
                        type="button"
                        onClick={() => updateField('imageFallbackHex', hex)}
                        aria-label={`Set fallback background ${hex}`}
                        className={`w-7 h-7 rounded-md border cursor-pointer ${
                          config.imageFallbackHex.toLowerCase() === hex
                            ? 'ring-2 ring-[#171615] ring-offset-1 border-white'
                            : 'border-black/15'
                        }`}
                        style={{ backgroundColor: hex }}
                      />
                    )
                  )}
                  <span className="text-xs font-mono text-[#57524C] ml-1">
                    {config.imageFallbackHex}
                  </span>
                </div>
              </div>

              {/* Section 05: Three Photography Directions */}
              <div className="pt-2 border-t border-[#E6DECB] space-y-2">
                <label
                  htmlFor="photo-direction"
                  className="block text-xs font-medium text-[#171615]"
                >
                  Photography Direction (Section 05 · Three Jobs)
                </label>
                <select
                  id="photo-direction"
                  value={config.photographyDirection || 'aftermath'}
                  onChange={(e) =>
                    updateField(
                      'photographyDirection',
                      e.target.value as PhotographyJobDirection
                    )
                  }
                  className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                >
                  <option value="record">
                    01 · Real Events (The Record — Placed, Dated &amp; Sourced)
                  </option>
                  <option value="affected">
                    02 · The Affected (Named Portrait in Place — No Pity Posters)
                  </option>
                  <option value="aftermath">
                    03 · The Aftermath (Lived Change — Roof On, School Open)
                  </option>
                </select>
                <p className="text-[11px] text-[#57524C] leading-relaxed">
                  {
                    PHOTOGRAPHY_DIRECTIONS[
                      config.photographyDirection || 'aftermath'
                    ].ruleSummary
                  }
                </p>
              </div>

              {/* Section 04 & 05: Uniform-Line Illustration Motif & Duotone Puzzle Band */}
              <div className="pt-2 border-t border-[#E6DECB] space-y-2.5">
                <div>
                  <label
                    htmlFor="illustration-motif"
                    className="block text-xs font-medium text-[#171615] mb-1"
                  >
                    Uniform-Line Illustration Motif (Section 04)
                  </label>
                  <select
                    id="illustration-motif"
                    value={config.illustrationMotif || 'hands-partnership'}
                    onChange={(e) =>
                      updateField(
                        'illustrationMotif',
                        e.target.value as IllustrationMotifId
                      )
                    }
                    className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                  >
                    {Object.values(BRAND_ILLUSTRATION_SPECS).map((spec) => (
                      <option key={spec.id} value={spec.id}>
                        {spec.title}
                      </option>
                    ))}
                    <option value="none">Hidden (No Illustration Callout)</option>
                  </select>
                </div>

                <label className="flex items-center justify-between cursor-pointer pt-0.5">
                  <span className="text-xs font-medium text-[#171615]">
                    Duotone Circular-Tab Puzzle Pattern Band (Section 05)
                  </span>
                  <input
                    type="checkbox"
                    checked={config.showDuotonePuzzlePattern !== false}
                    onChange={(e) =>
                      updateField('showDuotonePuzzlePattern', e.target.checked)
                    }
                    className="w-4 h-4 accent-[#FF5E00] rounded cursor-pointer"
                  />
                </label>
              </div>
            </section>

            {/* Template-Specific Structured Blocks */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-[#57524C]">
                  {config.templateLabel} Module
                </h2>
                <button
                  type="button"
                  onClick={onResetPreset}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#57524C] hover:text-[#171615] cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Preset
                </button>
              </div>

              {config.id === 'newsletter' && (
                <div className="space-y-4">
                  {config.newsletterDispatches.map((disp, idx) => (
                    <div
                      key={disp.id}
                      className="p-3.5 rounded-lg border border-[#E6DECB] bg-[#FBF9F5] space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#171615]">
                          Field Dispatch #{idx + 1}
                        </span>
                        <input
                          type="text"
                          value={disp.trackedAmountNaira}
                          onChange={(e) => {
                            const next = [...config.newsletterDispatches];
                            next[idx] = {
                              ...disp,
                              trackedAmountNaira: e.target.value,
                            };
                            updateField('newsletterDispatches', next);
                          }}
                          aria-label={`Dispatch ${idx + 1} tracked Naira`}
                          className="w-32 px-2 py-1 text-[11px] font-semibold text-right bg-[#FFFFFF] border border-[#E6DECB] rounded text-[#FF5E00]"
                        />
                      </div>
                      <input
                        type="text"
                        value={disp.locationAndDate}
                        onChange={(e) => {
                          const next = [...config.newsletterDispatches];
                          next[idx] = {
                            ...disp,
                            locationAndDate: e.target.value,
                          };
                          updateField('newsletterDispatches', next);
                        }}
                        placeholder="Town & Date"
                        className="w-full px-2.5 py-1.5 text-[11px] bg-[#FFFFFF] border border-[#E6DECB] rounded text-[#171615]"
                      />
                      <input
                        type="text"
                        value={disp.title}
                        onChange={(e) => {
                          const next = [...config.newsletterDispatches];
                          next[idx] = { ...disp, title: e.target.value };
                          updateField('newsletterDispatches', next);
                        }}
                        placeholder="Dispatch headline"
                        className="w-full px-2.5 py-1.5 text-xs font-semibold bg-[#FFFFFF] border border-[#E6DECB] rounded text-[#171615]"
                      />
                      <textarea
                        rows={2}
                        value={disp.summary}
                        onChange={(e) => {
                          const next = [...config.newsletterDispatches];
                          next[idx] = { ...disp, summary: e.target.value };
                          updateField('newsletterDispatches', next);
                        }}
                        className="w-full px-2.5 py-1.5 text-xs bg-[#FFFFFF] border border-[#E6DECB] rounded text-[#171615]"
                      />
                    </div>
                  ))}
                </div>
              )}

              {config.id === 'seasonal-easter' && (
                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="season-label"
                      className="block text-xs font-medium text-[#171615] mb-1"
                    >
                      Seasonal Banner Label
                    </label>
                    <input
                      id="season-label"
                      type="text"
                      value={config.seasonalCardSeasonLabel}
                      onChange={(e) =>
                        updateField('seasonalCardSeasonLabel', e.target.value)
                      }
                      className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="season-quote"
                      className="block text-xs font-medium text-[#171615] mb-1"
                    >
                      Unity Reflection / Scripture Pull-Quote
                    </label>
                    <textarea
                      id="season-quote"
                      rows={3}
                      value={config.seasonalScriptureText}
                      onChange={(e) =>
                        updateField('seasonalScriptureText', e.target.value)
                      }
                      className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="season-ref"
                      className="block text-xs font-medium text-[#171615] mb-1"
                    >
                      Reference Citation
                    </label>
                    <input
                      id="season-ref"
                      type="text"
                      value={config.seasonalScriptureRef}
                      onChange={(e) =>
                        updateField('seasonalScriptureRef', e.target.value)
                      }
                      className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615]"
                    />
                  </div>
                </div>
              )}

              {config.id === 'cause-spotlight' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label
                        htmlFor="raised-naira"
                        className="block text-xs font-medium text-[#171615] mb-1"
                      >
                        Raised (₦ Naira)
                      </label>
                      <input
                        id="raised-naira"
                        type="number"
                        min={0}
                        step={10000}
                        value={config.causeRaisedNaira}
                        onChange={(e) =>
                          updateField(
                            'causeRaisedNaira',
                            Number(e.target.value) || 0
                          )
                        }
                        className="w-full px-3 py-2 text-xs font-mono tabular-nums bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="goal-naira"
                        className="block text-xs font-medium text-[#171615] mb-1"
                      >
                        Goal (₦ Naira)
                      </label>
                      <input
                        id="goal-naira"
                        type="number"
                        min={1000}
                        step={10000}
                        value={config.causeGoalNaira}
                        onChange={(e) =>
                          updateField(
                            'causeGoalNaira',
                            Number(e.target.value) || 1000
                          )
                        }
                        className="w-full px-3 py-2 text-xs font-mono tabular-nums bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 items-end">
                    <div>
                      <label
                        htmlFor="supporters-count"
                        className="block text-xs font-medium text-[#171615] mb-1"
                      >
                        Partner Count
                      </label>
                      <input
                        id="supporters-count"
                        type="number"
                        min={1}
                        value={config.causeSupportersCount}
                        onChange={(e) =>
                          updateField(
                            'causeSupportersCount',
                            Number(e.target.value) || 1
                          )
                        }
                        className="w-full px-3 py-2 text-xs font-mono tabular-nums bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615]"
                      />
                    </div>
                    <label className="flex items-center gap-2 pb-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={config.causeUseDynamicProgressTag}
                        onChange={(e) =>
                          updateField(
                            'causeUseDynamicProgressTag',
                            e.target.checked
                          )
                        }
                        className="w-4 h-4 accent-[#FF5E00]"
                      />
                      <span className="text-[11px] font-medium text-[#171615]">
                        Use {'{{campaign_progress_pct}}'}
                      </span>
                    </label>
                  </div>

                  <div className="space-y-2 pt-1">
                    <span className="block text-xs font-medium text-[#171615]">
                      Verified Budget Line Items
                    </span>
                    {config.causeLineItems.map((item, idx) => (
                      <div
                        key={item.id}
                        className="grid grid-cols-3 gap-2 p-2 rounded-lg border border-[#E6DECB] bg-[#FBF9F5]"
                      >
                        <input
                          type="text"
                          value={item.item}
                          onChange={(e) => {
                            const next = [...config.causeLineItems];
                            next[idx] = { ...item, item: e.target.value };
                            updateField('causeLineItems', next);
                          }}
                          className="col-span-2 px-2 py-1 text-xs bg-[#FFFFFF] border border-[#E6DECB] rounded"
                        />
                        <input
                          type="text"
                          value={item.allocation}
                          onChange={(e) => {
                            const next = [...config.causeLineItems];
                            next[idx] = { ...item, allocation: e.target.value };
                            updateField('causeLineItems', next);
                          }}
                          className="px-2 py-1 text-xs font-mono text-right bg-[#FFFFFF] border border-[#E6DECB] rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {config.id === 'announcement' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2.5">
                    <div>
                      <label
                        htmlFor="ann-ref"
                        className="block text-xs font-medium text-[#171615] mb-1"
                      >
                        Release Code
                      </label>
                      <input
                        id="ann-ref"
                        type="text"
                        value={config.announcementReferenceCode}
                        onChange={(e) =>
                          updateField(
                            'announcementReferenceCode',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 text-xs font-mono bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615]"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="ann-date"
                        className="block text-xs font-medium text-[#171615] mb-1"
                      >
                        Effective Window
                      </label>
                      <input
                        id="ann-date"
                        type="text"
                        value={config.announcementEffectiveDate}
                        onChange={(e) =>
                          updateField(
                            'announcementEffectiveDate',
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="block text-xs font-medium text-[#171615]">
                      Payment &amp; Ledger Settlement Schedule
                    </span>
                    {config.announcementRails.map((rail, idx) => (
                      <div
                        key={rail.id}
                        className="grid grid-cols-3 gap-2 p-2 rounded-lg border border-[#E6DECB] bg-[#FBF9F5]"
                      >
                        <input
                          type="text"
                          value={rail.channel}
                          onChange={(e) => {
                            const next = [...config.announcementRails];
                            next[idx] = { ...rail, channel: e.target.value };
                            updateField('announcementRails', next);
                          }}
                          className="col-span-2 px-2 py-1 text-xs bg-[#FFFFFF] border border-[#E6DECB] rounded"
                        />
                        <input
                          type="text"
                          value={rail.settlementWindow}
                          onChange={(e) => {
                            const next = [...config.announcementRails];
                            next[idx] = {
                              ...rail,
                              settlementWindow: e.target.value,
                            };
                            updateField('announcementRails', next);
                          }}
                          className="px-2 py-1 text-xs font-semibold text-right bg-[#FFFFFF] border border-[#E6DECB] rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </>
        )}

        {activeTab === 'casl-ndpa' && (
          <>
            {/* Canada's Anti-Spam Legislation (CASL) */}
            <section className="space-y-3.5 pb-5 border-b border-[#E6DECB]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FF5E00]" />
                <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-[#57524C]">
                  Canada Anti-Spam (CASL) Disclosure
                </h2>
              </div>

              <div>
                <label
                  htmlFor="casl-class"
                  className="block text-xs font-medium text-[#171615] mb-1"
                >
                  CASL Legal Basis Classification
                </label>
                <select
                  id="casl-class"
                  value={config.caslClassification}
                  onChange={(e) =>
                    updateField(
                      'caslClassification',
                      e.target.value as CaslClassification
                    )
                  }
                  className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615] focus:outline-none focus:border-[#FF5E00]"
                >
                  <option value="charity-exemption">
                    Registered Charity Fundraising Exemption (CASL s. 10(9)(b))
                  </option>
                  <option value="cem-express-consent">
                    Commercial Electronic Message — Express Consent (CEM)
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="legal-org"
                  className="block text-xs font-medium text-[#171615] mb-1"
                >
                  Legal Sender Entity Name
                </label>
                <input
                  id="legal-org"
                  type="text"
                  value={config.legalOrganizationName}
                  onChange={(e) =>
                    updateField('legalOrganizationName', e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615]"
                />
              </div>

              <div>
                <label
                  htmlFor="canada-addr"
                  className="block text-xs font-medium text-[#171615] mb-1"
                >
                  Canada Physical Mailing Address
                </label>
                <input
                  id="canada-addr"
                  type="text"
                  value={config.canadaOfficeAddress}
                  onChange={(e) =>
                    updateField('canadaOfficeAddress', e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615]"
                />
              </div>

              <div>
                <label
                  htmlFor="nigeria-addr"
                  className="block text-xs font-medium text-[#171615] mb-1"
                >
                  Nigeria Head Office Address (Section 06)
                </label>
                <input
                  id="nigeria-addr"
                  type="text"
                  value={config.nigeriaOfficeAddress}
                  onChange={(e) =>
                    updateField('nigeriaOfficeAddress', e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label
                    htmlFor="sender-email"
                    className="block text-xs font-medium text-[#171615] mb-1"
                  >
                    Active Contact Email
                  </label>
                  <input
                    id="sender-email"
                    type="email"
                    value={config.senderEmail}
                    onChange={(e) => updateField('senderEmail', e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="support-phone"
                    className="block text-xs font-medium text-[#171615] mb-1"
                  >
                    Active Support Phone
                  </label>
                  <input
                    id="support-phone"
                    type="text"
                    value={config.supportPhone}
                    onChange={(e) =>
                      updateField('supportPhone', e.target.value)
                    }
                    className="w-full px-3 py-2 text-xs bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615]"
                  />
                </div>
              </div>
            </section>

            {/* Nigeria Data Protection Act (NDPA / NDPR) & Opt-Out Links */}
            <section className="space-y-3.5 pb-5 border-b border-[#E6DECB]">
              <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-[#57524C]">
                Nigeria Data Protection (NDPA / NCC)
              </h2>

              <div>
                <label
                  htmlFor="ndpa-basis"
                  className="block text-xs font-medium text-[#171615] mb-1"
                >
                  Consent Basis &amp; Data Rights Statement
                </label>
                <textarea
                  id="ndpa-basis"
                  rows={3}
                  value={config.ndpaConsentBasis}
                  onChange={(e) =>
                    updateField('ndpaConsentBasis', e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs leading-relaxed bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615]"
                />
              </div>

              <div>
                <label
                  htmlFor="unsub-url"
                  className="block text-xs font-medium text-[#171615] mb-1"
                >
                  One-Click Unsubscribe HTTPS URL
                </label>
                <input
                  id="unsub-url"
                  type="url"
                  value={config.unsubscribeUrl}
                  onChange={(e) =>
                    updateField('unsubscribeUrl', e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs font-mono bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615]"
                />
              </div>

              <div>
                <label
                  htmlFor="privacy-url"
                  className="block text-xs font-medium text-[#171615] mb-1"
                >
                  NDPA Privacy Policy &amp; Rights URL
                </label>
                <input
                  id="privacy-url"
                  type="url"
                  value={config.privacyPolicyUrl}
                  onChange={(e) =>
                    updateField('privacyPolicyUrl', e.target.value)
                  }
                  className="w-full px-3 py-2 text-xs font-mono bg-[#FBF9F5] border border-[#E6DECB] rounded-lg text-[#171615]"
                />
              </div>
            </section>

            {/* Anti-Phishing & Spam Filter Sandbox */}
            <section className="space-y-2.5">
              <h2 className="font-sans text-xs font-bold uppercase tracking-wider text-[#57524C]">
                Anti-Scam Filter Verification
              </h2>
              <p className="text-xs text-[#57524C] leading-relaxed">
                Test how the built-in phishing and deliverability guardrail catches
                advance-fee keywords, ALL CAPS shouting, and unverified links.
              </p>
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={onLoadSpamTest}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-[#E6DECB] bg-[#FBF9F5] text-[#171615] hover:border-[#FF5E00] transition-colors cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-[#D97706]" />
                  Simulate Risky Draft
                </button>
                <button
                  type="button"
                  onClick={onResetPreset}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-[#E6DECB] bg-[#FFFFFF] text-[#57524C] hover:text-[#171615] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Restore Clean Preset
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </aside>
  );
};
