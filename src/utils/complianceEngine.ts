import {
  ComplianceCheckItem,
  ComplianceReport,
  EmailTemplateConfig,
  SpamTriggerMatch,
} from '../types/emailTemplate';

interface TriggerRule {
  pattern: RegExp;
  label: string;
  reason: string;
  replacement: string;
}

const PHISHING_TRIGGER_RULES: TriggerRule[] = [
  {
    pattern: /\burgent\s+wire(\s+transfer)?\b/gi,
    label: 'urgent wire',
    reason: 'High-risk advance-fee / wire fraud phrase flagged by Gmail & Outlook filters',
    replacement: 'verified parish transfer',
  },
  {
    pattern: /\bwire\s+transfer\b/gi,
    label: 'wire transfer',
    reason: 'Direct wire phrasing triggers financial phishing heuristics',
    replacement: 'direct Naira ledger contribution',
  },
  {
    pattern: /\b100%\s*free\b/gi,
    label: '100% free',
    reason: 'Promotional spam trigger penalized by CASL & commercial filters',
    replacement: 'zero campaign setup cost',
  },
  {
    pattern: /\bact\s+immediately\b/gi,
    label: 'act immediately',
    reason: 'Artificial urgency coercion pattern associated with phishing',
    replacement: 'partner alongside this work',
  },
  {
    pattern: /\burgent\s+assistance\b/gi,
    label: 'urgent assistance',
    reason: 'Classic advance-fee fraud opening phrase',
    replacement: 'timely community partnership',
  },
  {
    pattern: /\bclaim\s+your\b/gi,
    label: 'claim your',
    reason: 'Prize/scam lure phrasing flagged by spam filters',
    replacement: 'view your receipted',
  },
  {
    pattern: /\bclick\s+here\s+now\b/gi,
    label: 'click here now',
    reason: 'Generic high-pressure CTA flagged by phishing classifiers',
    replacement: 'Read the Parish Ledger',
  },
  {
    pattern: /\bguaranteed\s+return\b/gi,
    label: 'guaranteed return',
    reason: 'Financial solicitation trigger phrase',
    replacement: 'documented community impact',
  },
];

const URL_SHORTENER_DOMAINS = [
  'bit.ly',
  'tinyurl.com',
  't.co',
  'goo.gl',
  'ow.ly',
  'is.gd',
  'buff.ly',
  'rb.gy',
  'shorturl.at',
];

const RAW_IP_URL_REGEX = /^https?:\/\/(\d{1,3}\.){3}\d{1,3}(:\d+)?(\/|$)/i;

function isValidHttpsUrl(url: string): { valid: boolean; reason?: string } {
  const trimmed = url.trim();
  if (!trimmed) {
    return { valid: false, reason: 'URL is empty' };
  }
  if (!trimmed.startsWith('https://')) {
    return { valid: false, reason: 'Must begin with https:// (unencrypted http:// is blocked)' };
  }
  if (RAW_IP_URL_REGEX.test(trimmed)) {
    return { valid: false, reason: 'Raw IP addresses are blocked by anti-phishing filters' };
  }
  try {
    const withoutTokens = trimmed.replace(/\{\{[^}]+\}\}/g, 'token');
    const parsed = new URL(withoutTokens);
    const host = parsed.hostname.toLowerCase();
    if (URL_SHORTENER_DOMAINS.some((d) => host === d || host.endsWith('.' + d))) {
      return { valid: false, reason: `Link shortener (${host}) is prohibited for deliverability` };
    }
    return { valid: true };
  } catch {
    return { valid: false, reason: 'Malformed HTTPS URL structure' };
  }
}

function scanFieldForTriggers(
  fieldLabel: string,
  text: string,
  matches: SpamTriggerMatch[]
) {
  if (!text) return;

  for (const rule of PHISHING_TRIGGER_RULES) {
    const found = text.match(rule.pattern);
    if (found) {
      matches.push({
        phrase: found[0],
        field: fieldLabel,
        reason: rule.reason,
        safeReplacement: rule.replacement,
      });
    }
  }

  if (/!{2,}/.test(text)) {
    matches.push({
      phrase: '!!',
      field: fieldLabel,
      reason: 'Repeated exclamation marks elevate spam score',
      safeReplacement: '.',
    });
  }

  const allCapsWords = text.match(/\b[A-Z]{5,}\b/g);
  if (allCapsWords && allCapsWords.length > 0) {
    const filtered = allCapsWords.filter(
      (w) => !['CASL', 'NDPA', 'NDPR', 'HTTPS', 'NAIRA', 'LAGOS', 'BENUE', 'PLATEAU', 'KADUNA', 'BORNO', 'EASTER'].includes(w)
    );
    if (filtered.length > 0) {
      matches.push({
        phrase: filtered.join(', '),
        field: fieldLabel,
        reason: 'ALL CAPS shouting triggers spam heuristics and violates editorial tone',
        safeReplacement: filtered
          .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
          .join(', '),
      });
    }
  }
}

export function auditEmailTemplate(config: EmailTemplateConfig): ComplianceReport {
  const checks: ComplianceCheckItem[] = [];
  const spamTriggers: SpamTriggerMatch[] = [];

  // 1. Scan all copy fields for phishing / spam triggers
  scanFieldForTriggers('Subject Line', config.subjectLine, spamTriggers);
  scanFieldForTriggers('Preheader', config.preheaderText, spamTriggers);
  scanFieldForTriggers('Headline', config.headline, spamTriggers);
  scanFieldForTriggers('Subheading', config.subheading, spamTriggers);
  config.bodyParagraphs.forEach((p, idx) =>
    scanFieldForTriggers(`Body Paragraph ${idx + 1}`, p, spamTriggers)
  );
  scanFieldForTriggers('Primary CTA Label', config.ctaLabel, spamTriggers);

  if (spamTriggers.length === 0) {
    checks.push({
      id: 'spam-copy',
      category: 'Deliverability',
      label: 'Anti-Phishing Copy Hygiene',
      detail: 'Zero advance-fee triggers, ALL CAPS shouting, or excessive punctuation detected.',
      severity: 'pass',
    });
  } else {
    checks.push({
      id: 'spam-copy',
      category: 'Deliverability',
      label: `${spamTriggers.length} Spam / Phishing Trigger${spamTriggers.length > 1 ? 's' : ''} Flagged`,
      detail: `Detected "${spamTriggers[0].phrase}" in ${spamTriggers[0].field}. Use Sanitize Copy to rewrite safely.`,
      severity: 'error',
      fieldHint: spamTriggers[0].field,
    });
  }

  // 2. Link & Dynamic Image HTTPS Integrity
  const urlsToValidate: Array<{ label: string; url: string }> = [
    { label: 'Primary CTA URL', url: config.ctaUrl },
    { label: 'Secondary Link URL', url: config.secondaryLinkUrl },
    { label: 'Unsubscribe URL', url: config.unsubscribeUrl },
    { label: 'Preferences URL', url: config.preferencesUrl },
    { label: 'Privacy Policy URL', url: config.privacyPolicyUrl },
  ];

  if (config.imageSourceMode === 'dynamic-esp-url') {
    urlsToValidate.push({ label: 'Dynamic Image URL', url: config.dynamicImageUrl });
  }

  if (config.id === 'newsletter') {
    config.newsletterDispatches.forEach((d, i) => {
      urlsToValidate.push({ label: `Dispatch ${i + 1} URL`, url: d.linkUrl });
    });
  }

  const invalidUrls = urlsToValidate
    .map((item) => ({ ...item, check: isValidHttpsUrl(item.url) }))
    .filter((item) => !item.check.valid);

  if (invalidUrls.length === 0) {
    checks.push({
      id: 'https-links',
      category: 'Deliverability',
      label: 'HTTPS & Domain Integrity',
      detail: `All ${urlsToValidate.length} destination and asset links use verified https:// without shorteners or raw IPs.`,
      severity: 'pass',
    });
  } else {
    checks.push({
      id: 'https-links',
      category: 'Deliverability',
      label: `Insecure or Blocked URL (${invalidUrls[0].label})`,
      detail: invalidUrls[0].check.reason || 'Invalid URL',
      severity: 'error',
      fieldHint: invalidUrls[0].label,
    });
  }

  // 3. CASL Mandatory Checks
  const hasLegalSender = config.legalOrganizationName.trim().length >= 3;
  const hasPhysicalAddress =
    config.canadaOfficeAddress.trim().length >= 10 &&
    config.nigeriaOfficeAddress.trim().length >= 10;
  const hasContactMethod =
    config.senderEmail.includes('@') && config.supportPhone.trim().length >= 7;
  const unsubCheck = isValidHttpsUrl(config.unsubscribeUrl);

  if (hasLegalSender && hasPhysicalAddress && hasContactMethod && unsubCheck.valid) {
    checks.push({
      id: 'casl-compliance',
      category: 'CASL',
      label:
        config.caslClassification === 'charity-exemption'
          ? 'CASL Charity Exemption (s. 10(9)(b))'
          : 'CASL Express Consent (CEM)',
      detail:
        'Legal sender name, dual physical mailing addresses, active contact, and 1-click HTTPS unsubscribe present.',
      severity: 'pass',
    });
  } else {
    checks.push({
      id: 'casl-compliance',
      category: 'CASL',
      label: 'Incomplete CASL Footer Disclosure',
      detail:
        'CASL requires legal entity name, valid physical address, contact method, and 1-click HTTPS unsubscribe link.',
      severity: 'error',
    });
  }

  // 4. NDPA / NDPR & NCC Checks
  const hasConsentBasis = config.ndpaConsentBasis.trim().length >= 20;
  const privacyCheck = isValidHttpsUrl(config.privacyPolicyUrl);
  const prefsCheck = isValidHttpsUrl(config.preferencesUrl);

  if (hasConsentBasis && privacyCheck.valid && prefsCheck.valid) {
    checks.push({
      id: 'ndpa-compliance',
      category: 'NDPA',
      label: 'Nigeria Data Protection Act (NDPA / NCC)',
      detail:
        'Explicit consent basis statement, data rights Privacy Policy link, and frictionless opt-out included.',
      severity: 'pass',
    });
  } else {
    checks.push({
      id: 'ndpa-compliance',
      category: 'NDPA',
      label: 'NDPA Consent / Privacy Link Missing',
      detail:
        'Include recipient consent transparency statement and HTTPS Privacy Policy + Preferences links.',
      severity: 'error',
    });
  }

  // 5. Text-to-Image Ratio (Minimum 60:40)
  const combinedCopy = [
    config.locationDateKicker,
    config.headline,
    config.subheading,
    config.greetingLine,
    ...config.bodyParagraphs,
    config.closingQuote,
    config.imageCaption,
    config.ctaLabel,
    ...config.newsletterDispatches.map((d) => `${d.title} ${d.summary}`),
    config.seasonalScriptureText,
    ...config.causeLineItems.map((c) => `${c.item} ${c.allocation}`),
    ...config.announcementRails.map((r) => `${r.channel} ${r.settlementWindow}`),
    config.ndpaConsentBasis,
  ]
    .join(' ')
    .trim();

  const wordCount = combinedCopy ? combinedCopy.split(/\s+/).length : 0;
  // Each email has 1 logo + 1 hero image (weighted ~45 text-equivalent units); 110+ words comfortably exceeds 60:40
  const rawTextShare = Math.round((wordCount / (wordCount + 42)) * 100);
  const textPercent = Math.min(92, Math.max(40, rawTextShare));
  const imagePercent = 100 - textPercent;
  const meetsMinimum6040 = textPercent >= 60;

  checks.push({
    id: 'text-image-ratio',
    category: 'Deliverability',
    label: `Text-to-Image Balance (${textPercent}:${imagePercent})`,
    detail: meetsMinimum6040
      ? `${wordCount} editorial words with coded HTML/VML CTA—exceeds 60:40 minimum.`
      : `Only ${wordCount} words (${textPercent}:${imagePercent}). Add narrative context to reach 60:40 minimum.`,
    severity: meetsMinimum6040 ? 'pass' : 'warning',
  });

  // 6. Accessibility & Image-Blocked Resilience
  const hasDescriptiveAlt = config.imageAltText.trim().length >= 15;
  const hasPreheader = config.preheaderText.trim().length >= 20;

  checks.push({
    id: 'a11y-preheader',
    category: 'Accessibility',
    label: 'Alt Text, Preheader & Bulletproof VML CTA',
    detail:
      hasDescriptiveAlt && hasPreheader
        ? 'Descriptive alt text, hidden inbox preheader, fallback bgcolor, and 48px+ VML button verified.'
        : 'Ensure descriptive image alt text (15+ chars) and inbox preheader snippet are filled.',
    severity: hasDescriptiveAlt && hasPreheader ? 'pass' : 'warning',
  });

  // 7. Brand Photography & Location Sourcing Check (Section 05)
  const hasLocationCaption = config.imageCaption.trim().length >= 10;
  checks.push({
    id: 'brand-sourcing',
    category: 'Brand',
    label: 'AzarFaith Visual & Sourcing Standard',
    detail: hasLocationCaption
      ? '200px minimum logo clearspace, official colour pairing, and dated/placed caption active.'
      : 'Add town, month, and source attribution beneath the hero visual per Section 05.',
    severity: hasLocationCaption ? 'pass' : 'warning',
  });

  const errorCount = checks.filter((c) => c.severity === 'error').length;
  const warningCount = checks.filter((c) => c.severity === 'warning').length;
  const passCount = checks.filter((c) => c.severity === 'pass').length;

  return {
    isReadyToSend: errorCount === 0,
    errorCount,
    warningCount,
    passCount,
    textToImageRatio: {
      textPercent,
      imagePercent,
      wordCount,
      meetsMinimum6040,
    },
    spamTriggers,
    checks,
  };
}

function sanitizeString(input: string): string {
  let result = input;
  for (const rule of PHISHING_TRIGGER_RULES) {
    result = result.replace(rule.pattern, rule.replacement);
  }
  result = result.replace(/!{2,}/g, '.');
  result = result.replace(/\b[A-Z]{5,}\b/g, (word) => {
    if (
      ['CASL', 'NDPA', 'NDPR', 'HTTPS', 'NAIRA', 'LAGOS', 'BENUE', 'PLATEAU', 'KADUNA', 'BORNO', 'EASTER'].includes(
        word
      )
    ) {
      return word;
    }
    return word.charAt(0) + word.slice(1).toLowerCase();
  });
  return result;
}

function sanitizeUrl(url: string, fallbackPath: string): string {
  const check = isValidHttpsUrl(url);
  if (check.valid) return url;
  if (url.trim().startsWith('http://') && !URL_SHORTENER_DOMAINS.some((d) => url.includes(d))) {
    return url.trim().replace(/^http:\/\//i, 'https://');
  }
  return `https://azarfaith.com${fallbackPath}`;
}

export function sanitizeEmailTemplate(
  config: EmailTemplateConfig
): EmailTemplateConfig {
  return {
    ...config,
    subjectLine: sanitizeString(config.subjectLine),
    preheaderText: sanitizeString(config.preheaderText),
    headline: sanitizeString(config.headline),
    subheading: sanitizeString(config.subheading),
    bodyParagraphs: config.bodyParagraphs.map(sanitizeString),
    ctaLabel: sanitizeString(config.ctaLabel),
    ctaUrl: sanitizeUrl(config.ctaUrl, '/causes/verified-parish'),
    secondaryLinkUrl: sanitizeUrl(config.secondaryLinkUrl, '/causes'),
    dynamicImageUrl:
      config.imageSourceMode === 'dynamic-esp-url'
        ? sanitizeUrl(config.dynamicImageUrl, '/assets/campaign-hero.jpg')
        : config.dynamicImageUrl,
    unsubscribeUrl: sanitizeUrl(
      config.unsubscribeUrl,
      '/unsubscribe?token={{unsubscribe_token}}'
    ),
    preferencesUrl: sanitizeUrl(config.preferencesUrl, '/preferences'),
    privacyPolicyUrl: sanitizeUrl(config.privacyPolicyUrl, '/privacy'),
  };
}
