import {
  AZARFAITH_LOGOS,
  BRAND_PAIRINGS,
  CURATED_TEMPLATE_VISUALS,
  PHOTOGRAPHY_DIRECTIONS,
} from '../data/brandTokens';
import { EmailTemplateConfig } from '../types/emailTemplate';
import {
  BRAND_ILLUSTRATION_SPECS,
  renderBrandMotifSvg,
} from './brandIllustrations';

export interface EmailRenderOptions {
  forPreview: boolean;
  previewImageOverride?: string;
  previewOrigin?: string;
  simulateDarkMode?: boolean;
  simulateImagesBlocked?: boolean;
  interpolateSampleTokens?: boolean;
}

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function applyMergeTags(text: string, interpolate: boolean): string {
  if (!interpolate) return text;
  return text
    .replace(/\{\{donor_first_name\}\}/gi, 'Chinedu')
    .replace(/\{\{donor_full_name\}\}/gi, 'Chinedu Okafor')
    .replace(/\{\{campaign_progress_pct\}\}/gi, '77')
    .replace(/\{\{campaign_slug\}\}/gi, 'makurdi-clean-water')
    .replace(/\{\{donor_id\}\}/gi, 'dnr_84210')
    .replace(/\{\{unsubscribe_token\}\}/gi, 'af_unsub_9482a');
}

function formatNaira(amount: number): string {
  return '₦' + Math.max(0, Math.round(amount)).toLocaleString('en-NG');
}

function renderBulletproofButton(
  label: string,
  url: string,
  bgColor: string,
  textColor: string
): string {
  const safeLabel = escapeHtml(label);
  const safeUrl = escapeHtml(url);
  const estimatedWidth = Math.min(460, Math.max(220, label.length * 10 + 72));

  return `
    <!-- MSO VML BULLETPROOF BUTTON (Min 48px tap target) -->
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin:0;">
      <tr>
        <td align="center" bgcolor="${bgColor}" style="border-radius:6px;background-color:${bgColor};">
          <!--[if mso]>
          <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${safeUrl}" style="height:50px;v-text-anchor:middle;width:${estimatedWidth}px;" arcsize="12%" strokecolor="${bgColor}" fillcolor="${bgColor}">
            <w:anchorlock/>
            <center style="color:${textColor};font-family:'Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:bold;">${safeLabel}</center>
          </v:roundrect>
          <![endif]-->
          <!--[if !mso]><!-->
          <a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="mobile-full-btn" style="display:inline-block;padding:15px 28px;font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:700;line-height:20px;color:${textColor};text-decoration:none;border-radius:6px;background-color:${bgColor};min-width:44px;text-align:center;">
            ${safeLabel}
          </a>
          <!--<![endif]-->
        </td>
      </tr>
    </table>`;
}

function renderPuzzleJoinBand(
  primaryColor: string,
  secondaryColor: string,
  centerBg: string,
  showDuotoneTileField: boolean = true
): string {
  if (!showDuotoneTileField) {
    return `
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td width="50%" height="6" bgcolor="${primaryColor}" style="background-color:${primaryColor};font-size:1px;line-height:6px;">&nbsp;</td>
        <td width="50%" height="6" bgcolor="${secondaryColor}" style="background-color:${secondaryColor};font-size:1px;line-height:6px;">&nbsp;</td>
      </tr>
    </table>`;
  }

  // Section 05 Pattern: Pieces tiled edge to edge, no gaps, no loose pieces.
  // Two tones separate each piece from the next: one for the work, one for the support alongside it.
  // Circular tabs at joins complete a whole circle.
  return `
    <!-- AZARFAITH GRAPHIC ELEMENT: DUOTONE EDGE-TO-EDGE PUZZLE PATTERN BAND (SECTION 05) -->
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td width="23%" height="14" bgcolor="${primaryColor}" style="background-color:${primaryColor};font-size:1px;line-height:14px;">&nbsp;</td>
        <td width="4%" height="14" align="center" valign="middle" bgcolor="${secondaryColor}" style="background-color:${secondaryColor};font-size:1px;line-height:14px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
            <tr>
              <td width="10" height="10" bgcolor="${primaryColor}" style="background-color:${primaryColor};border-radius:5px;font-size:1px;line-height:10px;">&nbsp;</td>
            </tr>
          </table>
        </td>
        <td width="23%" height="14" bgcolor="${secondaryColor}" style="background-color:${secondaryColor};font-size:1px;line-height:14px;">&nbsp;</td>
        <td width="4%" height="14" align="center" valign="middle" bgcolor="${primaryColor}" style="background-color:${primaryColor};font-size:1px;line-height:14px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
            <tr>
              <td width="10" height="10" bgcolor="${secondaryColor}" style="background-color:${secondaryColor};border-radius:5px;font-size:1px;line-height:10px;">&nbsp;</td>
            </tr>
          </table>
        </td>
        <td width="23%" height="14" bgcolor="${primaryColor}" style="background-color:${primaryColor};font-size:1px;line-height:14px;">&nbsp;</td>
        <td width="4%" height="14" align="center" valign="middle" bgcolor="${secondaryColor}" style="background-color:${secondaryColor};font-size:1px;line-height:14px;">
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
            <tr>
              <td width="10" height="10" bgcolor="${centerBg}" style="background-color:${centerBg};border-radius:5px;font-size:1px;line-height:10px;">&nbsp;</td>
            </tr>
          </table>
        </td>
        <td width="19%" height="14" bgcolor="${secondaryColor}" style="background-color:${secondaryColor};font-size:1px;line-height:14px;">&nbsp;</td>
      </tr>
    </table>`;
}

export function generateEmailHtml(
  config: EmailTemplateConfig,
  options: EmailRenderOptions = { forPreview: false }
): string {
  const interpolate = Boolean(options.interpolateSampleTokens);
  const darkSim = Boolean(options.simulateDarkMode);
  const blockImgs = Boolean(options.simulateImagesBlocked);

  const pairing = BRAND_PAIRINGS[config.pairingId];
  const resolvedLogoKey =
    config.logoColourway === 'auto'
      ? pairing.recommendedLogo
      : config.logoColourway;
  const logoSpec = AZARFAITH_LOGOS[resolvedLogoKey];
  const curatedVisual = CURATED_TEMPLATE_VISUALS[config.id];

  const logoUrl = blockImgs
    ? ''
    : options.forPreview
    ? logoSpec.previewPath
    : logoSpec.cdnHttpsUrl;

  const rawHeroUrl =
    config.imageSourceMode === 'dynamic-esp-url'
      ? applyMergeTags(config.dynamicImageUrl, interpolate)
      : options.forPreview && options.previewImageOverride
      ? options.previewImageOverride
      : curatedVisual.cdnHttpsUrl;

  const heroImageUrl = blockImgs ? '' : rawHeroUrl;

  // Color tokens (with optional dark-mode preview simulation)
  const outerBg = darkSim ? '#11100f' : pairing.outerBg;
  const cardBg = darkSim ? '#1b1917' : pairing.cardBg;
  const headerBg = darkSim ? '#161413' : pairing.headerBg;
  const headerText = darkSim ? '#f6ebd9' : pairing.headerText;
  const inkPrimary = darkSim ? '#f6ebd9' : pairing.inkPrimary;
  const inkMuted = darkSim ? '#c7bfb3' : pairing.inkMuted;
  const softSurface = darkSim ? '#25221f' : pairing.accentSoftSurface;
  const borderHairline = darkSim ? '#332f2b' : pairing.borderHairline;
  const footerBg = darkSim ? '#141211' : pairing.footerBg;
  const footerText = darkSim ? '#b8b0a4' : pairing.footerText;

  const subjectText = escapeHtml(applyMergeTags(config.subjectLine, interpolate));
  const preheader = escapeHtml(applyMergeTags(config.preheaderText, interpolate));
  const kicker = escapeHtml(applyMergeTags(config.locationDateKicker, interpolate));
  const headline = escapeHtml(applyMergeTags(config.headline, interpolate));
  const subheading = escapeHtml(applyMergeTags(config.subheading, interpolate));
  const greeting = escapeHtml(applyMergeTags(config.greetingLine, interpolate));
  const closingQuote = escapeHtml(applyMergeTags(config.closingQuote, interpolate));

  const ctaLabel = applyMergeTags(config.ctaLabel, interpolate);
  const ctaUrl = applyMergeTags(config.ctaUrl, interpolate);
  const secondaryLabel = escapeHtml(
    applyMergeTags(config.secondaryLinkLabel, interpolate)
  );
  const secondaryUrl = escapeHtml(
    applyMergeTags(config.secondaryLinkUrl, interpolate)
  );

  const unsubUrl = escapeHtml(applyMergeTags(config.unsubscribeUrl, interpolate));
  const prefsUrl = escapeHtml(applyMergeTags(config.preferencesUrl, interpolate));
  const privacyUrl = escapeHtml(applyMergeTags(config.privacyPolicyUrl, interpolate));

  // Header Lockup (Section 01: 200px minimum logo width; AzarFaith always leads in Partnership lockup)
  const headerHtml =
    config.partnerEnabled && config.partnerName.trim()
      ? config.partnerLayout === 'vertical'
        ? `
          <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td align="left" style="padding:0 0 12px 0;">
                <a href="https://azarfaith.com" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
                  <img src="${escapeHtml(logoUrl)}" width="200" alt="AzarFaith" border="0" style="display:block;width:200px;max-width:100%;height:auto;font-family:'Fraunces',Georgia,serif;font-size:22px;font-weight:700;color:${headerText};" />
                </a>
              </td>
            </tr>
            <tr>
              <td style="padding:0 0 10px 0;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td width="36" height="2" bgcolor="${pairing.accentPrimary}" style="background-color:${pairing.accentPrimary};font-size:1px;line-height:2px;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="left" style="font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:${headerText};opacity:0.9;">
                In Partnership With ${escapeHtml(config.partnerName)}
              </td>
            </tr>
          </table>`
        : `
          <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td class="stack-column" valign="middle" width="215" style="padding:4px 0;">
                <a href="https://azarfaith.com" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
                  <img src="${escapeHtml(logoUrl)}" width="200" alt="AzarFaith" border="0" style="display:block;width:200px;max-width:100%;height:auto;font-family:'Fraunces',Georgia,serif;font-size:22px;font-weight:700;color:${headerText};" />
                </a>
              </td>
              <td class="hide-mobile" valign="middle" width="24" align="center">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
                  <tr>
                    <td width="1" height="28" bgcolor="${headerText}" style="background-color:${headerText};opacity:0.3;font-size:1px;line-height:28px;">&nbsp;</td>
                  </tr>
                </table>
              </td>
              <td class="stack-column" valign="middle" style="padding:4px 0;font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:13px;font-weight:600;line-height:18px;color:${headerText};">
                <span style="display:block;font-size:10px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;opacity:0.75;">Partner Ministry</span>
                ${escapeHtml(config.partnerName)}
              </td>
            </tr>
          </table>`
      : `
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td align="left" valign="middle">
              <a href="https://azarfaith.com" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
                <img src="${escapeHtml(logoUrl)}" width="200" alt="AzarFaith — Giving in Partnership" border="0" style="display:block;width:200px;max-width:100%;height:auto;font-family:'Fraunces',Georgia,serif;font-size:24px;font-weight:700;color:${headerText};" />
              </a>
            </td>
            <td align="right" valign="middle" class="hide-mobile" style="font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:500;color:${headerText};opacity:0.85;">
              azarfaith.com
            </td>
          </tr>
        </table>`;

  // Body Narrative Paragraphs (Section 03: Onest Light 300, 130% leading, 0% tracking)
  const paragraphsHtml = config.bodyParagraphs
    .filter((p) => p.trim().length > 0)
    .map(
      (p) => `
      <p class="dark-text" style="margin:0 0 18px 0;font-family:'Onest','Inter','Helvetica Neue',Arial,sans-serif;font-size:16px;font-weight:300;line-height:20.8px;letter-spacing:0em;color:${inkPrimary};">
        ${escapeHtml(applyMergeTags(p, interpolate))}
      </p>`
    )
    .join('\n');

  const photoDirSpec =
    PHOTOGRAPHY_DIRECTIONS[config.photographyDirection || 'aftermath'];

  const illustrationMotifHtml =
    config.illustrationMotif && config.illustrationMotif !== 'none'
      ? (() => {
          const motifSpec = BRAND_ILLUSTRATION_SPECS[config.illustrationMotif];
          const svgMarkup = renderBrandMotifSvg(
            config.illustrationMotif,
            pairing.accentPrimary,
            pairing.accentSecondary,
            softSurface,
            inkPrimary
          );
          return `
          <!-- AZARFAITH SECTION 04 UNIFORM-LINE FLAT-FILL ILLUSTRATION CALLOUT -->
          <tr>
            <td class="mobile-padding" style="padding:4px 36px 24px 36px;">
              <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="${softSurface}" style="background-color:${softSurface};border-radius:8px;border:1px solid ${borderHairline};">
                <tr>
                  <td width="72" valign="middle" align="center" style="padding:16px 8px 16px 18px;">
                    ${svgMarkup}
                  </td>
                  <td valign="middle" style="padding:16px 20px 16px 8px;">
                    <p style="margin:0 0 4px 0;font-family:'Onest','Inter',Arial,sans-serif;font-size:11px;font-weight:600;line-height:14px;letter-spacing:0em;text-transform:uppercase;color:${pairing.accentPrimary};">
                      ${escapeHtml(motifSpec.sectionRef)} &middot; ${escapeHtml(
            motifSpec.title
          )}
                    </p>
                    <p class="dark-text" style="margin:0;font-family:'Onest','Inter',Arial,sans-serif;font-size:13px;font-weight:600;line-height:17px;letter-spacing:0em;color:${inkPrimary};">
                      ${escapeHtml(motifSpec.caption)}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`;
        })()
      : '';

  // Template-Specific Middle Module
  let templateSpecificModuleHtml = '';

  if (config.id === 'newsletter' && config.newsletterDispatches.length > 0) {
    const dispatchRows = config.newsletterDispatches
      .map(
        (d, idx) => `
        <tr>
          <td style="padding:${idx === 0 ? '0 0 18px 0' : '18px 0 0 0'};${
          idx > 0 ? `border-top:1px solid ${borderHairline};` : ''
        }">
            <p style="margin:0 0 6px 0;font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${pairing.accentPrimary};">
              ${escapeHtml(applyMergeTags(d.locationAndDate, interpolate))} &middot; ${escapeHtml(
          d.trackedAmountNaira
        )}
            </p>
            <h3 class="dark-text" style="margin:0 0 8px 0;font-family:'Fraunces',Georgia,serif;font-size:20px;font-weight:600;line-height:24px;letter-spacing:-0.02em;color:${inkPrimary};">
              ${escapeHtml(applyMergeTags(d.title, interpolate))}
            </h3>
            <p class="dark-muted" style="margin:0 0 10px 0;font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:15px;font-weight:300;line-height:22px;color:${inkMuted};">
              ${escapeHtml(applyMergeTags(d.summary, interpolate))}
            </p>
            <a href="${escapeHtml(
              applyMergeTags(d.linkUrl, interpolate)
            )}" target="_blank" rel="noopener noreferrer" style="font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:600;color:${pairing.accentPrimary};text-decoration:underline;">
              ${escapeHtml(d.linkLabel)} &rarr;
            </a>
          </td>
        </tr>`
      )
      .join('\n');

    templateSpecificModuleHtml = `
      <!-- EDIT COPY HERE: BIWEEKLY FIELD DISPATCHES -->
      <tr>
        <td class="mobile-padding" style="padding:8px 36px 28px 36px;">
          <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="${softSurface}" style="background-color:${softSurface};border-radius:8px;border:1px solid ${borderHairline};">
            <tr>
              <td style="padding:24px;">
                <p style="margin:0 0 16px 0;font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${inkMuted};">
                  VERIFIED FIELD DISPATCHES &amp; RECEIPTED WORK
                </p>
                <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                  ${dispatchRows}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  } else if (config.id === 'seasonal-easter') {
    templateSpecificModuleHtml = `
      <!-- EDIT COPY HERE: EASTER SEASONAL UNITY PULL-QUOTE -->
      <tr>
        <td class="mobile-padding" style="padding:8px 36px 28px 36px;">
          <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="${softSurface}" style="background-color:${softSurface};border-top:1px solid ${pairing.accentPrimary};border-bottom:1px solid ${pairing.accentPrimary};">
            <tr>
              <td align="center" style="padding:26px 24px;">
                <p style="margin:0 0 10px 0;font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${pairing.accentPrimary};">
                  ${escapeHtml(config.seasonalCardSeasonLabel || 'EASTER 2026')}
                </p>
                <p class="dark-text" style="margin:0 0 12px 0;font-family:'Fraunces',Georgia,serif;font-size:21px;font-style:italic;font-weight:500;line-height:28px;letter-spacing:-0.02em;color:${inkPrimary};">
                  &ldquo;${escapeHtml(
                    applyMergeTags(config.seasonalScriptureText, interpolate)
                  )}&rdquo;
                </p>
                <p class="dark-muted" style="margin:0;font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:13px;font-weight:600;color:${inkMuted};">
                  ${escapeHtml(config.seasonalScriptureRef)}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  } else if (config.id === 'cause-spotlight') {
    const pct =
      config.causeGoalNaira > 0
        ? Math.min(
            100,
            Math.max(
              4,
              Math.round((config.causeRaisedNaira / config.causeGoalNaira) * 100)
            )
          )
        : 75;
    const pctDisplay = config.causeUseDynamicProgressTag
      ? interpolate
        ? `${pct}%`
        : '{{campaign_progress_pct}}%'
      : `${pct}%`;

    const lineItemRows = config.causeLineItems
      .map(
        (item, idx) => `
        <tr>
          <td style="padding:10px 0;${
            idx > 0 ? `border-top:1px solid ${borderHairline};` : ''
          }font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:500;color:${inkPrimary};">
            ${escapeHtml(item.item)}
            <span style="display:block;font-size:12px;font-weight:400;color:${inkMuted};margin-top:2px;">${escapeHtml(
          item.status
        )}</span>
          </td>
          <td align="right" valign="top" style="padding:10px 0;${
            idx > 0 ? `border-top:1px solid ${borderHairline};` : ''
          }font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:700;color:${inkPrimary};white-space:nowrap;">
            ${escapeHtml(item.allocation)}
          </td>
        </tr>`
      )
      .join('\n');

    templateSpecificModuleHtml = `
      <!-- EDIT COPY HERE: CAUSE FUNDING PROGRESS & ITEMIZED ALLOCATION -->
      <tr>
        <td class="mobile-padding" style="padding:4px 36px 28px 36px;">
          <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="${softSurface}" style="background-color:${softSurface};border-radius:8px;border:1px solid ${borderHairline};">
            <tr>
              <td style="padding:22px 24px;">
                <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left" style="font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:13px;font-weight:700;color:${inkPrimary};">
                      ${formatNaira(config.causeRaisedNaira)} raised
                      <span style="font-weight:400;color:${inkMuted};">of ${formatNaira(
      config.causeGoalNaira
    )} goal</span>
                    </td>
                    <td align="right" style="font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:13px;font-weight:700;color:${pairing.accentPrimary};">
                      ${escapeHtml(pctDisplay)} &middot; ${config.causeSupportersCount} partners
                    </td>
                  </tr>
                </table>
                <!-- Email-safe table progress bar -->
                <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="margin:12px 0 18px 0;">
                  <tr>
                    <td bgcolor="${borderHairline}" style="background-color:${borderHairline};border-radius:4px;height:10px;line-height:10px;font-size:1px;">
                      <table role="presentation" width="${pct}%" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td bgcolor="${pairing.accentPrimary}" style="background-color:${pairing.accentPrimary};border-radius:4px;height:10px;line-height:10px;font-size:1px;">&nbsp;</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
                ${
                  lineItemRows
                    ? `
                <p style="margin:0 0 6px 0;font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${inkMuted};">
                  VERIFIED BUDGET BREAKDOWN
                </p>
                <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                  ${lineItemRows}
                </table>`
                    : ''
                }
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  } else if (config.id === 'announcement' && config.announcementRails.length > 0) {
    const railRows = config.announcementRails
      .map(
        (rail, idx) => `
        <tr>
          <td style="padding:12px 0;${
            idx > 0 ? `border-top:1px solid ${borderHairline};` : ''
          }font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:600;color:${inkPrimary};">
            ${escapeHtml(rail.channel)}
            <span style="display:block;font-size:12px;font-weight:400;color:${inkMuted};margin-top:2px;">${escapeHtml(
          rail.feeStructure
        )}</span>
          </td>
          <td align="right" valign="middle" style="padding:12px 0;${
            idx > 0 ? `border-top:1px solid ${borderHairline};` : ''
          }font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:13px;font-weight:700;color:${pairing.accentPrimary};white-space:nowrap;">
            ${escapeHtml(rail.settlementWindow)}
          </td>
        </tr>`
      )
      .join('\n');

    templateSpecificModuleHtml = `
      <!-- EDIT COPY HERE: ANNOUNCEMENT SETTLEMENT & TRANSPARENCY TABLE -->
      <tr>
        <td class="mobile-padding" style="padding:4px 36px 28px 36px;">
          <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="${softSurface}" style="background-color:${softSurface};border-radius:8px;border:1px solid ${borderHairline};">
            <tr>
              <td style="padding:22px 24px;">
                <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
                  <tr>
                    <td style="font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${inkMuted};">
                      ${escapeHtml(config.announcementReferenceCode || 'STEWARDSHIP SCHEDULE')}
                    </td>
                    <td align="right" style="font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;color:${pairing.accentPrimary};">
                      ${escapeHtml(config.announcementEffectiveDate)}
                    </td>
                  </tr>
                </table>
                <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0">
                  ${railRows}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  }

  // CASL Classification Legal Notice
  const caslDisclosureText =
    config.caslClassification === 'charity-exemption'
      ? `CASL Registered Charity &amp; Non-Profit Fundraising Notice: Sent by ${escapeHtml(
          config.legalOrganizationName
        )} in accordance with Canada&rsquo;s Anti-Spam Legislation (CASL s. 10(9)(b) &amp; Electronic Commerce Protection Regulations).`
      : `CASL Commercial Electronic Message (CEM) Notice: Sent by ${escapeHtml(
          config.legalOrganizationName
        )} with your express consent under Canada&rsquo;s Anti-Spam Legislation (CASL).`;

  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  ${
    options.forPreview && options.previewOrigin
      ? `<base href="${escapeHtml(options.previewOrigin)}/" />`
      : ''
  }
  <title>${subjectText}</title>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500..700;1,9..144,500&family=Onest:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <style type="text/css">
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: ${outerBg}; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: none !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; }
    @media screen and (max-width: 600px) {
      .email-container { width: 100% !important; max-width: 100% !important; }
      .stack-column { display: block !important; width: 100% !important; max-width: 100% !important; }
      .hide-mobile { display: none !important; max-height: 0 !important; overflow: hidden !important; }
      .mobile-padding { padding-left: 20px !important; padding-right: 20px !important; }
      .hero-title { font-size: 28px !important; line-height: 31px !important; }
      .mobile-full-btn { width: 100% !important; box-sizing: border-box !important; }
    }
    @media (prefers-color-scheme: dark) {
      body, .outer-canvas { background-color: #11100f !important; }
      .email-card { background-color: #1b1917 !important; border-color: #332f2b !important; }
      .dark-text { color: #f6ebd9 !important; }
      .dark-muted { color: #c7bfb3 !important; }
      .dark-footer { background-color: #141211 !important; color: #b8b0a4 !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:${outerBg};">

  <!-- HIDDEN PREHEADER TEXT: Controls inbox preview snippet -->
  <div style="display:none;font-size:1px;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;mso-hide:all;font-family:'Onest',Arial,sans-serif;">
    ${preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>

  <!-- OUTER RESPONSIVE WRAPPER -->
  <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" bgcolor="${outerBg}" class="outer-canvas" style="background-color:${outerBg};">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <!--[if mso]>
        <table role="presentation" align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td width="600" valign="top">
        <![endif]-->

        <!-- 600PX FLUID EMAIL CONTAINER -->
        <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" class="email-container email-card" bgcolor="${cardBg}" style="max-width:600px;width:100%;margin:0 auto;background-color:${cardBg};border-radius:10px;overflow:hidden;border:1px solid ${borderHairline};">

          <!-- 1. BRAND HEADER (200px minimum logo width + clearspace) -->
          <tr>
            <td class="mobile-padding" bgcolor="${headerBg}" style="background-color:${headerBg};padding:26px 36px;">
              ${headerHtml}
            </td>
          </tr>

          <!-- 2. AZARFAITH TWO-TONE CIRCULAR-TAB PUZZLE JOIN BAND -->
          <tr>
            <td>
              ${renderPuzzleJoinBand(
                pairing.accentPrimary,
                pairing.accentSecondary,
                cardBg,
                config.showDuotonePuzzlePattern !== false
              )}
            </td>
          </tr>

          <!-- 3. ABOVE-THE-FOLD MISSION HOOK & DISPLAY HEADLINE (SECTION 03 SPECS: 90% LEADING, -4% / -2% TRACKING) -->
          <!-- EDIT COPY HERE: KICKER, HEADLINE & SUBHEADING -->
          <tr>
            <td class="mobile-padding" style="padding:32px 36px 22px 36px;">
              <p style="margin:0 0 12px 0;font-family:'Onest','Inter','Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:600;line-height:14.3px;letter-spacing:0.06em;text-transform:uppercase;color:${pairing.accentPrimary};">
                ${kicker}
              </p>
              <h1 class="hero-title dark-text" style="margin:0 0 14px 0;font-family:'Martina Plantijn','Fraunces',Georgia,serif;font-size:32px;font-weight:600;line-height:28.8px;letter-spacing:-0.04em;color:${inkPrimary};">
                ${headline}
              </h1>
              <p class="dark-muted" style="margin:0;font-family:'Onest','Inter','Helvetica Neue',Arial,sans-serif;font-size:20px;font-weight:500;line-height:18px;letter-spacing:-0.02em;color:${inkMuted};">
                ${subheading}
              </p>
            </td>
          </tr>

          <!-- 4. DYNAMIC HERO IMAGE WITH FALLBACK BGCOLOR & SOURCED CAPTION (SECTION 05) -->
          <!-- DYNAMIC IMAGE URL HERE -->
          <tr>
            <td bgcolor="${escapeHtml(
              config.imageFallbackHex
            )}" style="background-color:${escapeHtml(config.imageFallbackHex)};">
              <img src="${escapeHtml(heroImageUrl)}" width="${
    curatedVisual.width
  }" height="${curatedVisual.height}" alt="${escapeHtml(
    config.imageAltText
  )}" border="0" style="display:block;width:100%;max-width:600px;height:auto;font-family:'Onest',Arial,sans-serif;font-size:14px;line-height:20px;color:#ffffff;background-color:${escapeHtml(
    config.imageFallbackHex
  )};" />
            </td>
          </tr>
          <tr>
            <td class="mobile-padding" style="padding:10px 36px 24px 36px;border-bottom:1px solid ${borderHairline};">
              <p class="dark-muted" style="margin:0;font-family:'Onest','Inter','Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:600;line-height:15.6px;letter-spacing:0em;color:${inkMuted};">
                <span style="color:${pairing.accentPrimary};">${escapeHtml(
    photoDirSpec.badgeLabel
  )}</span> &middot; ${escapeHtml(applyMergeTags(config.imageCaption, interpolate))}
              </p>
            </td>
          </tr>

          <!-- 5. EDITORIAL NARRATIVE COPY -->
          <!-- EDIT COPY HERE: GREETING & BODY PARAGRAPHS -->
          <tr>
            <td class="mobile-padding" style="padding:28px 36px 12px 36px;">
              <p class="dark-text" style="margin:0 0 16px 0;font-family:'Onest','Inter','Helvetica Neue',Arial,sans-serif;font-size:16px;font-weight:600;line-height:20.8px;color:${inkPrimary};">
                ${greeting}
              </p>
              ${paragraphsHtml}
            </td>
          </tr>

          <!-- 6. TEMPLATE-SPECIFIC STRUCTURED MODULE & SECTION 04 ILLUSTRATION MOTIF -->
          ${templateSpecificModuleHtml}
          ${illustrationMotifHtml}

          <!-- 7. CLOSING STATEMENT & BULLETPROOF DONATION / ACTION CTA -->
          <tr>
            <td class="mobile-padding" style="padding:4px 36px 36px 36px;">
              <p class="dark-text" style="margin:0 0 22px 0;font-family:'Martina Plantijn','Fraunces',Georgia,serif;font-size:19px;font-weight:500;line-height:24px;letter-spacing:-0.02em;color:${inkPrimary};">
                ${closingQuote}
              </p>
              ${renderBulletproofButton(
                ctaLabel,
                ctaUrl,
                pairing.buttonBg,
                pairing.buttonText
              )}
              ${
                secondaryLabel
                  ? `
              <p style="margin:16px 0 0 0;font-family:'Onest','Inter','Helvetica Neue',Arial,sans-serif;font-size:14px;font-weight:600;line-height:18.2px;">
                <a href="${secondaryUrl}" target="_blank" rel="noopener noreferrer" style="color:${pairing.accentPrimary};text-decoration:underline;">
                  ${secondaryLabel} &rarr;
                </a>
              </p>`
                  : ''
              }
            </td>
          </tr>

          <!-- 8. CLOSING PUZZLE DIVIDER -->
          <tr>
            <td>
              ${renderPuzzleJoinBand(
                pairing.accentSecondary,
                pairing.accentPrimary,
                footerBg,
                config.showDuotonePuzzlePattern !== false
              )}
            </td>
          </tr>

          <!-- 9. MANDATORY LEGAL COMPLIANCE FOOTER (CASL & NDPA / NDPR) -->
          <!-- CASL & NDPA MANDATORY COMPLIANCE FOOTER -->
          <tr>
            <td class="mobile-padding dark-footer" bgcolor="${footerBg}" style="background-color:${footerBg};padding:28px 36px 32px 36px;">
              <p style="margin:0 0 8px 0;font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:13px;font-weight:700;line-height:18px;color:${inkPrimary};">
                ${escapeHtml(config.legalOrganizationName)}
              </p>
              <p style="margin:0 0 10px 0;font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:400;line-height:18px;color:${footerText};">
                <strong>Nigeria Head Office:</strong> ${escapeHtml(
                  config.nigeriaOfficeAddress
                )}<br />
                <strong>Canada Mailing Office:</strong> ${escapeHtml(
                  config.canadaOfficeAddress
                )}<br />
                <strong>Contact:</strong> <a href="mailto:${escapeHtml(
                  config.senderEmail
                )}" style="color:${footerText};text-decoration:underline;">${escapeHtml(
    config.senderEmail
  )}</a> &middot; ${escapeHtml(config.supportPhone)} &middot; <a href="https://azarfaith.com" target="_blank" rel="noopener noreferrer" style="color:${footerText};text-decoration:underline;">https://azarfaith.com</a>
              </p>
              <p style="margin:0 0 10px 0;font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:400;line-height:17px;color:${footerText};">
                ${caslDisclosureText}
              </p>
              <p style="margin:0 0 16px 0;font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:11px;font-weight:400;line-height:17px;color:${footerText};">
                <strong>NDPA / NDPR Data Transparency:</strong> ${escapeHtml(
                  config.ndpaConsentBasis
                )}
              </p>
              <p style="margin:0;font-family:'Onest','Helvetica Neue',Arial,sans-serif;font-size:12px;font-weight:600;line-height:18px;color:${inkPrimary};">
                <a href="${unsubUrl}" target="_blank" rel="noopener noreferrer" style="color:${inkPrimary};text-decoration:underline;">One-Click Unsubscribe</a>
                &nbsp;&middot;&nbsp;
                <a href="${prefsUrl}" target="_blank" rel="noopener noreferrer" style="color:${inkPrimary};text-decoration:underline;">Communication Preferences</a>
                &nbsp;&middot;&nbsp;
                <a href="${privacyUrl}" target="_blank" rel="noopener noreferrer" style="color:${inkPrimary};text-decoration:underline;">Privacy Policy &amp; NDPA Rights</a>
              </p>
            </td>
          </tr>

        </table>

        <!--[if mso]>
        </td>
        </tr>
        </table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function generatePlainTextEmail(config: EmailTemplateConfig): string {
  const lines: string[] = [
    `AZARFAITH — ${config.templateLabel.toUpperCase()}`,
    `==================================================`,
    config.locationDateKicker,
    '',
    config.headline,
    config.subheading,
    '',
    config.greetingLine,
    '',
    ...config.bodyParagraphs,
    '',
  ];

  if (config.id === 'newsletter' && config.newsletterDispatches.length > 0) {
    lines.push('VERIFIED FIELD DISPATCHES:');
    config.newsletterDispatches.forEach((d) => {
      lines.push(`- ${d.title} (${d.locationAndDate} | ${d.trackedAmountNaira})`);
      lines.push(`  ${d.summary}`);
      lines.push(`  Inspect: ${d.linkUrl}`);
    });
    lines.push('');
  }

  if (config.id === 'seasonal-easter') {
    lines.push(`"${config.seasonalScriptureText}" — ${config.seasonalScriptureRef}`);
    lines.push('');
  }

  if (config.id === 'cause-spotlight') {
    lines.push(
      `PROGRESS: ${formatNaira(config.causeRaisedNaira)} raised of ${formatNaira(
        config.causeGoalNaira
      )} goal (${config.causeSupportersCount} partners)`
    );
    config.causeLineItems.forEach((item) => {
      lines.push(`- ${item.item}: ${item.allocation} (${item.status})`);
    });
    lines.push('');
  }

  if (config.id === 'announcement') {
    lines.push(`${config.announcementReferenceCode} | ${config.announcementEffectiveDate}`);
    config.announcementRails.forEach((r) => {
      lines.push(`- ${r.channel}: ${r.settlementWindow} (${r.feeStructure})`);
    });
    lines.push('');
  }

  lines.push(config.closingQuote);
  lines.push('');
  lines.push(`${config.ctaLabel}: ${config.ctaUrl}`);
  if (config.secondaryLinkLabel) {
    lines.push(`${config.secondaryLinkLabel}: ${config.secondaryLinkUrl}`);
  }

  lines.push('');
  lines.push('--------------------------------------------------');
  lines.push(config.legalOrganizationName);
  lines.push(`Nigeria Head Office: ${config.nigeriaOfficeAddress}`);
  lines.push(`Canada Mailing Office: ${config.canadaOfficeAddress}`);
  lines.push(`Contact: ${config.senderEmail} | ${config.supportPhone}`);
  lines.push('');
  lines.push(config.ndpaConsentBasis);
  lines.push('');
  lines.push(`Unsubscribe: ${config.unsubscribeUrl}`);
  lines.push(`Preferences: ${config.preferencesUrl}`);
  lines.push(`Privacy Policy: ${config.privacyPolicyUrl}`);

  return lines.join('\n');
}
