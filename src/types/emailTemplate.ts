export type TemplateKind =
  | 'newsletter'
  | 'seasonal-easter'
  | 'cause-spotlight'
  | 'announcement';

export type BrandPairingId =
  | 'signature-primary'
  | 'warm-earth'
  | 'sacred-regal'
  | 'civic-clarity';

export type LogoColourwayId = 'auto' | 'main' | 'black' | 'white' | 'cream';

export type CaslClassification = 'charity-exemption' | 'cem-express-consent';

export type ImageSourceMode = 'curated-asset' | 'dynamic-esp-url';

export type PhotographyJobDirection = 'record' | 'affected' | 'aftermath';

export type IllustrationMotifId =
  | 'hands-partnership'
  | 'puzzle-unity'
  | 'water-drum'
  | 'roofing-sheet'
  | 'school-desk'
  | 'church-pew'
  | 'none';

export interface NewsletterDispatchItem {
  id: string;
  locationAndDate: string;
  title: string;
  summary: string;
  trackedAmountNaira: string;
  linkLabel: string;
  linkUrl: string;
  categoryPillar?: 'Church Building' | 'Missions & Outreach' | 'Orphanage' | 'Education';
}

export interface CauseLineItem {
  id: string;
  item: string;
  allocation: string;
  status: string;
}

export interface AnnouncementRailRow {
  id: string;
  channel: string;
  settlementWindow: string;
  feeStructure: string;
}

export interface EmailTemplateConfig {
  id: TemplateKind;
  templateLabel: string;
  pairingId: BrandPairingId;
  logoColourway: LogoColourwayId;

  // Partnership Co-Branding (Section 01 Partnership Rules: AzarFaith always leads)
  partnerEnabled: boolean;
  partnerName: string;
  partnerLayout: 'horizontal' | 'vertical';

  // Inbox Envelope
  senderName: string;
  senderEmail: string;
  subjectLine: string;
  preheaderText: string;

  // Core Editorial Content
  locationDateKicker: string;
  headline: string;
  subheading: string;
  greetingLine: string;
  bodyParagraphs: string[];
  closingQuote: string;

  // Dynamic Image, Photography Direction (Section 05) & Illustration Motif (Section 04)
  imageSourceMode: ImageSourceMode;
  dynamicImageUrl: string;
  imageAltText: string;
  imageCaption: string;
  imageFallbackHex: string;
  photographyDirection: PhotographyJobDirection;
  illustrationMotif: IllustrationMotifId;
  showDuotonePuzzlePattern: boolean;

  // Bulletproof Primary CTA
  ctaLabel: string;
  ctaUrl: string;
  secondaryLinkLabel: string;
  secondaryLinkUrl: string;

  // Template-Specific Structured Data
  newsletterDispatches: NewsletterDispatchItem[];
  seasonalScriptureRef: string;
  seasonalScriptureText: string;
  seasonalCardSeasonLabel: string;
  causeSubjectName: string;
  causeSubjectRole: string;
  causeRaisedNaira: number;
  causeGoalNaira: number;
  causeSupportersCount: number;
  causeUseDynamicProgressTag: boolean;
  causeLineItems: CauseLineItem[];
  announcementEffectiveDate: string;
  announcementReferenceCode: string;
  announcementRails: AnnouncementRailRow[];

  // Mandatory Legal Compliance (CASL & NDPA/NDPR)
  caslClassification: CaslClassification;
  legalOrganizationName: string;
  nigeriaOfficeAddress: string;
  canadaOfficeAddress: string;
  supportPhone: string;
  ndpaConsentBasis: string;
  unsubscribeUrl: string;
  preferencesUrl: string;
  privacyPolicyUrl: string;
}

export type FindingSeverity = 'pass' | 'warning' | 'error';

export interface ComplianceCheckItem {
  id: string;
  category: 'CASL' | 'NDPA' | 'Deliverability' | 'Accessibility' | 'Brand';
  label: string;
  detail: string;
  severity: FindingSeverity;
  fieldHint?: string;
}

export interface SpamTriggerMatch {
  phrase: string;
  field: string;
  reason: string;
  safeReplacement: string;
}

export interface ComplianceReport {
  isReadyToSend: boolean;
  errorCount: number;
  warningCount: number;
  passCount: number;
  textToImageRatio: {
    textPercent: number;
    imagePercent: number;
    wordCount: number;
    meetsMinimum6040: boolean;
  };
  spamTriggers: SpamTriggerMatch[];
  checks: ComplianceCheckItem[];
}
