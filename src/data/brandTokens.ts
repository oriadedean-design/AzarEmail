import { BrandPairingId, LogoColourwayId, TemplateKind } from '../types/emailTemplate';

export interface BrandSwatch {
  name: string;
  hex: string;
  rgb: string;
  role: string;
}

export const AZARFAITH_PALETTE: BrandSwatch[] = [
  { name: 'Azar Orange', hex: '#ff5e00', rgb: 'rgb(255, 94, 0)', role: 'Defining Primary Brand Colour' },
  { name: 'Janna', hex: '#f6ebd9', rgb: 'rgb(246, 235, 217)', role: 'Warm Editorial Canvas' },
  { name: 'Yellow Sea', hex: '#f6ab00', rgb: 'rgb(246, 171, 0)', role: 'Warm Harvest Accent' },
  { name: 'Blue Chalk', hex: '#ebe3fb', rgb: 'rgb(235, 227, 251)', role: 'Soft Lilac Seasonal Tint' },
  { name: 'Honey Flower', hex: '#52106a', rgb: 'rgb(82, 16, 106)', role: 'Deep Regal Plum' },
  { name: 'Blush Pink', hex: '#fd73ed', rgb: 'rgb(253, 115, 237)', role: 'Vibrant Highlight Accent' },
  { name: 'Royal Blue', hex: '#4164fe', rgb: 'rgb(65, 100, 254)', role: 'Civic & Stewardship Blue' },
  { name: 'Anakiwa', hex: '#a0d4ff', rgb: 'rgb(160, 212, 255)', role: 'Sky Blue Supporting Tint' },
  { name: 'White', hex: '#ffffff', rgb: 'rgb(255, 255, 255)', role: 'High-Clarity Surface' },
];

export interface BrandPairingTheme {
  id: BrandPairingId;
  name: string;
  guidelineNote: string;
  outerBg: string;
  cardBg: string;
  headerBg: string;
  headerText: string;
  headerIsDark: boolean;
  accentPrimary: string;
  accentSecondary: string;
  accentSoftSurface: string;
  inkPrimary: string;
  inkMuted: string;
  borderHairline: string;
  buttonBg: string;
  buttonText: string;
  footerBg: string;
  footerText: string;
  recommendedLogo: Exclude<LogoColourwayId, 'auto'>;
}

export const BRAND_PAIRINGS: Record<BrandPairingId, BrandPairingTheme> = {
  'signature-primary': {
    id: 'signature-primary',
    name: 'Signature Primary',
    guidelineNote: 'White + Janna + Azar Orange — High-legibility editorial standard',
    outerBg: '#f6ebd9',
    cardBg: '#ffffff',
    headerBg: '#ffffff',
    headerText: '#171615',
    headerIsDark: false,
    accentPrimary: '#ff5e00',
    accentSecondary: '#f6ab00',
    accentSoftSurface: '#f6ebd9',
    inkPrimary: '#171615',
    inkMuted: '#57524c',
    borderHairline: '#e6decb',
    buttonBg: '#ff5e00',
    buttonText: '#ffffff',
    footerBg: '#f6ebd9',
    footerText: '#423e39',
    recommendedLogo: 'main',
  },
  'warm-earth': {
    id: 'warm-earth',
    name: 'Warm Earth & Flame',
    guidelineNote: 'Janna + Azar Orange + Yellow Sea — Field & Cause Spotlight pairing',
    outerBg: '#efe2cc',
    cardBg: '#f6ebd9',
    headerBg: '#ff5e00',
    headerText: '#ffffff',
    headerIsDark: true,
    accentPrimary: '#ff5e00',
    accentSecondary: '#f6ab00',
    accentSoftSurface: '#ffffff',
    inkPrimary: '#171615',
    inkMuted: '#4a433b',
    borderHairline: '#dfd0b8',
    buttonBg: '#171615',
    buttonText: '#f6ebd9',
    footerBg: '#eadbc2',
    footerText: '#3b3630',
    recommendedLogo: 'white',
  },
  'sacred-regal': {
    id: 'sacred-regal',
    name: 'Sacred & Regal',
    guidelineNote: 'Blue Chalk + Honey Flower + Blush Pink — Seasonal & Easter pairing',
    outerBg: '#ebe3fb',
    cardBg: '#ffffff',
    headerBg: '#52106a',
    headerText: '#f6ebd9',
    headerIsDark: true,
    accentPrimary: '#52106a',
    accentSecondary: '#fd73ed',
    accentSoftSurface: '#ebe3fb',
    inkPrimary: '#1d1324',
    inkMuted: '#534361',
    borderHairline: '#dcd0f2',
    buttonBg: '#52106a',
    buttonText: '#ffffff',
    footerBg: '#ebe3fb',
    footerText: '#3f2e4d',
    recommendedLogo: 'cream',
  },
  'civic-clarity': {
    id: 'civic-clarity',
    name: 'Civic & Clarity',
    guidelineNote: 'Royal Blue + Anakiwa + White — Announcements & Ledger updates',
    outerBg: '#e8f3ff',
    cardBg: '#ffffff',
    headerBg: '#4164fe',
    headerText: '#ffffff',
    headerIsDark: true,
    accentPrimary: '#4164fe',
    accentSecondary: '#a0d4ff',
    accentSoftSurface: '#eef6ff',
    inkPrimary: '#121829',
    inkMuted: '#47546e',
    borderHairline: '#d4e4fa',
    buttonBg: '#4164fe',
    buttonText: '#ffffff',
    footerBg: '#e8f3ff',
    footerText: '#33415c',
    recommendedLogo: 'white',
  },
};

export interface LogoAssetSpec {
  id: Exclude<LogoColourwayId, 'auto'>;
  label: string;
  previewPath: string;
  cdnHttpsUrl: string;
  iconPreviewPath: string;
  iconCdnHttpsUrl: string;
}

export const AZARFAITH_LOGOS: Record<Exclude<LogoColourwayId, 'auto'>, LogoAssetSpec> = {
  main: {
    id: 'main',
    label: 'Primary (Orange Mark + Black Wordmark)',
    previewPath: '/assets/aistudio/Azarfaith_Main-Logo_d5ae6c21.png',
    cdnHttpsUrl: 'https://cdn.azarfaith.com/brand/Azarfaith_Main-Logo.png',
    iconPreviewPath: '/assets/aistudio/Azarfaith_Main-Icon_1a063292.png',
    iconCdnHttpsUrl: 'https://cdn.azarfaith.com/brand/Azarfaith_Main-Icon.png',
  },
  black: {
    id: 'black',
    label: 'Monochrome Black',
    previewPath: '/assets/aistudio/Azarfaith_Black-Logo_f6bcd889.png',
    cdnHttpsUrl: 'https://cdn.azarfaith.com/brand/Azarfaith_Black-Logo.png',
    iconPreviewPath: '/assets/aistudio/Azarfaith_Black-Icon_a274bf86.png',
    iconCdnHttpsUrl: 'https://cdn.azarfaith.com/brand/Azarfaith_Black-Icon.png',
  },
  white: {
    id: 'white',
    label: 'Reversed Pure White',
    previewPath: '/assets/aistudio/Azarfaith_White-Logo_30869899.png',
    cdnHttpsUrl: 'https://cdn.azarfaith.com/brand/Azarfaith_White-Logo.png',
    iconPreviewPath: '/assets/aistudio/Azarfaith_White-Icon_b11e669b.png',
    iconCdnHttpsUrl: 'https://cdn.azarfaith.com/brand/Azarfaith_White-Icon.png',
  },
  cream: {
    id: 'cream',
    label: 'Janna Cream (#f6ebd9)',
    previewPath: '/assets/aistudio/Azarfaith_Cream-Logo_544ea373.png',
    cdnHttpsUrl: 'https://cdn.azarfaith.com/brand/Azarfaith_Cream-Logo.png',
    iconPreviewPath: '/assets/aistudio/Azarfaith_Orange-Icon_d1155187.png',
    iconCdnHttpsUrl: 'https://cdn.azarfaith.com/brand/Azarfaith_Cream-Icon.png',
  },
};

export interface CuratedTemplateVisual {
  cdnHttpsUrl: string;
  width: number;
  height: number;
  mediumType: 'Documentary Photography (Section 05)' | 'Uniform-Line Brand Illustration (Section 04)';
}

export const CURATED_TEMPLATE_VISUALS: Record<TemplateKind, CuratedTemplateVisual> = {
  newsletter: {
    cdnHttpsUrl: 'https://cdn.azarfaith.com/campaigns/2026/kaduna-classroom-aftermath.jpg',
    width: 600,
    height: 338,
    mediumType: 'Documentary Photography (Section 05)',
  },
  'seasonal-easter': {
    cdnHttpsUrl: 'https://cdn.azarfaith.com/campaigns/2026/easter-hands-puzzle-sunrise.jpg',
    width: 600,
    height: 338,
    mediumType: 'Uniform-Line Brand Illustration (Section 04)',
  },
  'cause-spotlight': {
    cdnHttpsUrl: 'https://cdn.azarfaith.com/campaigns/2026/benue-parish-water-portrait.jpg',
    width: 600,
    height: 338,
    mediumType: 'Documentary Photography (Section 05)',
  },
  announcement: {
    cdnHttpsUrl: 'https://cdn.azarfaith.com/campaigns/2026/stewardship-objects-puzzle-grid.jpg',
    width: 600,
    height: 338,
    mediumType: 'Uniform-Line Brand Illustration (Section 04)',
  },
};

export const FIGMA_BRAND_GUIDELINE_LINKS = {
  version: 'Official Version 02 · Updated September 2026',
  prototypeUrl:
    'https://www.figma.com/proto/hEIZBGRpDNAhLE7wU9kPh6?node-id=2058-595&t=uWjoRW3rksywo8HQ-6',
  devModeUrl:
    'https://www.figma.com/design/CewW4isRiYusAeuQEomdMz/Azar_Faith-internal--Copy-?node-id=2058-595&m=dev&t=uWjoRW3rksywo8HQ-1',
};

export const TYPOGRAPHY_HIERARCHY_SPECS = [
  {
    role: 'Primary Display Headline',
    typeface: 'Martina Plantijn (Fallback: Fraunces / Georgia)',
    size: '30px–34px',
    leading: '90% (0.9× font size)',
    tracking: '-4% (-0.04em)',
    sample: 'Give to the people you love in the faith',
  },
  {
    role: 'Subheading / Sub Header',
    typeface: 'Onest Medium (Fallback: Inter / Helvetica Neue)',
    size: '20px',
    leading: '90% (0.9× font size)',
    tracking: '-2% (-0.02em)',
    sample: 'You give in faith. See the fruit.',
  },
  {
    role: 'Body Copy',
    typeface: 'Onest Light (300)',
    size: '16px–20px',
    leading: '130% (1.3× font size)',
    tracking: '0% (0em)',
    sample:
      'Somebody is already doing the work. Under a zinc roof in Kaduna, on the road to Borno every month, in a house with twelve children in it.',
  },
  {
    role: 'Annotation / Tooltips / Footnotes',
    typeface: 'Onest SemiBold (600)',
    size: '12px–13px',
    leading: '130% (1.3× font size)',
    tracking: '0% (0em)',
    sample: "They're a piece. You're a piece. Neither of you is the picture.",
  },
  {
    role: 'Primary CTA Button',
    typeface: 'Onest Bold (700)',
    size: '15px–16px',
    leading: '100%–120%',
    tracking: '0%',
    sample: 'Join Newsletter',
  },
];

export const PHOTOGRAPHY_DIRECTIONS = {
  record: {
    id: 'record' as const,
    step: '01 · Real Events (The Record)',
    badgeLabel: 'THE RECORD · DATED & SOURCED EVENT',
    ruleSummary:
      'Every image is placed, dated and sourced. Name the town and the month. Say who took it and where it came from. Dignity holds: show gathering, carrying, rebuilding—never distress for effect.',
  },
  affected: {
    id: 'affected' as const,
    step: '02 · The Affected (Dignified Portrait)',
    badgeLabel: 'THE AFFECTED · NAMED PORTRAIT IN PLACE',
    ruleSummary:
      'A portrait shows a person in their place, doing something, with a name and a true sentence about their life. Keep their home, workshop, or town in frame—never a poster asking for pity.',
  },
  aftermath: {
    id: 'aftermath' as const,
    step: '03 · The Aftermath (Lived Change)',
    badgeLabel: 'THE AFTERMATH · ORDINARY LIFE RESTORED',
    ruleSummary:
      'Show how life has changed—not us helping, them living. No handover cheques, no bags of rice, no branded shirts or queues. Show the roof on, the shop open, the child in uniform, the church dry.',
  },
};

export const LOGO_MISUSE_DONTS = [
  "Don't rotate the Logomark",
  "Don't invert/flip the Logomark",
  "Don't add a stroke to the Logomark",
  "Don't change the colors of the Logomark",
  "Don't stretch the Logomark",
  "Don't add shadows to the Logomark",
  "Don't outline the Logomark",
  "Don't try to redraw the Logomark",
  "Don't apply gradients to the Logomark",
];

export const STATIONERY_SIGNATORIES = [
  {
    name: 'Yiminum Elizabeth',
    role: 'Founder & Chief Executive Officer',
    email: 'yiminum@azarfaith.com',
    generalEmail: 'contact@azarfaith.com',
    phone: '+234 123 456 7890',
    address: '1566 Tsatse Dzani St., East-Legon, Lagos',
  },
  {
    name: 'Samuel Idowu',
    role: 'Brand Designer · Management',
    email: 'contact@azarfaith.com',
    generalEmail: 'contact@azarfaith.com',
    phone: '+234 123 456 7890',
    address: '1566 Tsatse Dzani St., East-Legon, Lagos',
  },
];

