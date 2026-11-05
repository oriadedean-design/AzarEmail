import { EmailTemplateConfig, TemplateKind } from '../types/emailTemplate';

export const TEMPLATE_ORDER: TemplateKind[] = [
  'newsletter',
  'seasonal-easter',
  'cause-spotlight',
  'announcement',
];

export const PRESET_TEMPLATES: Record<TemplateKind, EmailTemplateConfig> = {
  newsletter: {
    id: 'newsletter',
    templateLabel: 'Biweekly Newsletter',
    pairingId: 'signature-primary',
    logoColourway: 'auto',

    partnerEnabled: false,
    partnerName: 'Northern Nigeria Rural Parish Network',
    partnerLayout: 'horizontal',

    senderName: 'AzarFaith Field Dispatch',
    senderEmail: 'contact@azarfaith.com',
    subjectLine: 'Under a zinc roof in Kaduna: Biweekly Field Dispatch #14',
    preheaderText:
      'Three verified updates from Kaduna, Jos, and Lagos—plus how 97.5% of every gift reached local parish work this month.',

    locationDateKicker: 'BIWEEKLY DISPATCH · ISSUE 14 · KADUNA & BORNO CORRIDOR',
    headline: 'Somebody is already doing the work.',
    subheading: 'You give in faith. See the fruit across three verified parishes.',
    greetingLine: 'Dear {{donor_first_name}},',
    bodyParagraphs: [
      'Most giving in Nigeria follows the biggest name in the room. The ministries with media teams get seen, while quiet work under a zinc roof in Kaduna or along the road to Borno continues with very few watching.',
      'Over the last fourteen days, 142 AzarFaith partners stood beside local teachers, builders, and parish stewards. Every Naira transferred was receipted on the public ledger, and the new corrugated roof and wooden desks at Grace Community Primary in Kaduna are now dry and in daily use.',
      'They are a piece. You are a piece. Neither of you is the whole picture—and AzarFaith is where those pieces find each other in accountability.',
    ],
    closingQuote:
      'You are not funding the work from a distance. You are part of it.',

    imageSourceMode: 'curated-asset',
    dynamicImageUrl:
      'https://cdn.azarfaith.com/campaigns/2026/kaduna-classroom-aftermath.jpg',
    imageAltText:
      'Students seated at handcrafted wooden school desks under a newly installed corrugated zinc roof in Kaduna, Nigeria during morning lessons.',
    imageCaption:
      'Grace Community Primary, Kachia Road, Kaduna · March 2026 · Photo: AzarFaith Field Archive',
    imageFallbackHex: '#f6ebd9',
    photographyDirection: 'aftermath',
    illustrationMotif: 'school-desk',
    showDuotonePuzzlePattern: true,

    ctaLabel: 'Read Full Biweekly Ledger',
    ctaUrl: 'https://azarfaith.com/dispatches/biweekly-14',
    secondaryLinkLabel: 'Browse All Verified Parishes',
    secondaryLinkUrl: 'https://azarfaith.com/causes',

    newsletterDispatches: [
      {
        id: 'disp-1',
        locationAndDate: 'KACHIA, KADUNA · COMPLETED MARCH 2026',
        title: '48 timber school desks & zinc roof weatherproofing',
        summary:
          'Local carpenters completed all 48 dual-seater desks ahead of the early rains. Full timber and roofing receipts are posted on the parish ledger.',
        trackedAmountNaira: '₦1,420,000 tracked',
        linkLabel: 'Inspect Kaduna Receipts',
        linkUrl: 'https://azarfaith.com/causes/kaduna-school-roof',
        categoryPillar: 'Education',
      },
      {
        id: 'disp-2',
        locationAndDate: 'BARKIN LADI, PLATEAU · IN PROGRESS',
        title: 'Monthly transit & maize seed support for 18 rural pastors',
        summary:
          'Covering motorcycle fuel and dry-season grain storage for circuit ministers serving twelve farming settlements outside Jos.',
        trackedAmountNaira: '₦890,000 tracked',
        linkLabel: 'View Plateau Progress',
        linkUrl: 'https://azarfaith.com/causes/plateau-pastor-transit',
        categoryPillar: 'Missions & Outreach',
      },
    ],

    seasonalScriptureRef: '1 Corinthians 12:12–14',
    seasonalScriptureText:
      'For as the body is one and has many members, all the members of that one body, being many, are one body.',
    seasonalCardSeasonLabel: 'EASTER SEASON 2026',

    causeSubjectName: 'Pastor Samuel Terfa',
    causeSubjectRole: 'Master Carpenter & Parish Steward, Makurdi',
    causeRaisedNaira: 1840000,
    causeGoalNaira: 2400000,
    causeSupportersCount: 64,
    causeUseDynamicProgressTag: false,
    causeLineItems: [],

    announcementEffectiveDate: 'Effective April 1, 2026',
    announcementReferenceCode: 'AF-LEDGER-2026-04',
    announcementRails: [],

    caslClassification: 'charity-exemption',
    legalOrganizationName: 'AzarFaith Foundation & Digital Giving Ltd.',
    nigeriaOfficeAddress: '1566 Tsatse Dzani St., East-Legon, Lagos, Nigeria',
    canadaOfficeAddress: '240 Richmond St. W, Suite 400, Toronto, ON M5V 1V6, Canada',
    supportPhone: '+234 123 456 7890',
    ndpaConsentBasis:
      'You are receiving this biweekly dispatch under the Nigeria Data Protection Act (NDPA) because you opted into AzarFaith field reports or supported a verified cause on azarfaith.com.',
    unsubscribeUrl:
      'https://azarfaith.com/unsubscribe?token={{unsubscribe_token}}',
    preferencesUrl: 'https://azarfaith.com/preferences',
    privacyPolicyUrl: 'https://azarfaith.com/privacy',
  },

  'seasonal-easter': {
    id: 'seasonal-easter',
    templateLabel: 'Seasonal Card (Easter)',
    pairingId: 'sacred-regal',
    logoColourway: 'auto',

    partnerEnabled: false,
    partnerName: 'St. Luke Fellowship Choir & Outreach',
    partnerLayout: 'horizontal',

    senderName: 'AzarFaith Community',
    senderEmail: 'contact@azarfaith.com',
    subjectLine: 'Every piece is somebody: An Easter note of fellowship',
    preheaderText:
      'Wishing you and your household a peaceful Easter—and sharing how our shared table grew across 24 parishes.',

    locationDateKicker: 'EASTER PARTNERSHIP CARD · APRIL 2026',
    headline: 'Love moves. So should you.',
    subheading: 'With AzarFaith, everyone gets to feel what steady fellowship is.',
    greetingLine: 'Grace and peace to you, {{donor_first_name}},',
    bodyParagraphs: [
      'Easter reminds us that renewal rarely arrives with spectacle. More often, it arrives like dawn over a quiet compound—two hands meeting across distance, a roof mended before the storm, and a congregation gathering dry and unafraid.',
      'In our visual language, every tab on a puzzle piece is shaped to complete a circle. Where two pieces meet, a whole form appears that neither held alone. That is how we think of your partnership with local churches, orphanages, and village schools across Nigeria.',
      'This Easter weekend, we invite you to stand alongside one family-run children’s home in Ogun State as they prepare their shared dining hall and school uniforms for the new term.',
    ],
    closingQuote:
      'There is a place in this for you. Happy Easter from all of us at AzarFaith.',

    imageSourceMode: 'curated-asset',
    dynamicImageUrl:
      'https://cdn.azarfaith.com/campaigns/2026/easter-hands-puzzle-sunrise.jpg',
    imageAltText:
      'Flat uniform-line illustration of two hands gently joining four circular-tab puzzle pieces around a rising morning sun in plum, lilac, cream, and orange.',
    imageCaption:
      'AzarFaith Easter 2026 Edition · Uniform-Line Illustration Series (Section 04)',
    imageFallbackHex: '#52106a',
    photographyDirection: 'aftermath',
    illustrationMotif: 'hands-partnership',
    showDuotonePuzzlePattern: true,

    ctaLabel: 'Send an Easter Partnership Gift',
    ctaUrl: 'https://azarfaith.com/seasons/easter-2026',
    secondaryLinkLabel: 'Share This Card With Your Parish',
    secondaryLinkUrl: 'https://azarfaith.com/seasons/easter-2026/share',

    newsletterDispatches: [],

    seasonalScriptureRef: '1 Corinthians 12:12 · Unity of the Body',
    seasonalScriptureText:
      'They are a piece. You are a piece. Neither of you is the picture. AzarFaith is where the pieces find each other.',
    seasonalCardSeasonLabel: 'RESURRECTION & RENEWAL · EASTER 2026',

    causeSubjectName: '',
    causeSubjectRole: '',
    causeRaisedNaira: 0,
    causeGoalNaira: 0,
    causeSupportersCount: 0,
    causeUseDynamicProgressTag: false,
    causeLineItems: [],

    announcementEffectiveDate: '',
    announcementReferenceCode: '',
    announcementRails: [],

    caslClassification: 'charity-exemption',
    legalOrganizationName: 'AzarFaith Foundation & Digital Giving Ltd.',
    nigeriaOfficeAddress: '1566 Tsatse Dzani St., East-Legon, Lagos, Nigeria',
    canadaOfficeAddress: '240 Richmond St. W, Suite 400, Toronto, ON M5V 1V6, Canada',
    supportPhone: '+234 123 456 7890',
    ndpaConsentBasis:
      'You received this seasonal greeting under the Nigeria Data Protection Act (NDPA) as a registered giver or subscriber on azarfaith.com.',
    unsubscribeUrl:
      'https://azarfaith.com/unsubscribe?token={{unsubscribe_token}}',
    preferencesUrl: 'https://azarfaith.com/preferences',
    privacyPolicyUrl: 'https://azarfaith.com/privacy',
  },

  'cause-spotlight': {
    id: 'cause-spotlight',
    templateLabel: 'Spotlighting Causes',
    pairingId: 'warm-earth',
    logoColourway: 'auto',

    partnerEnabled: true,
    partnerName: 'St. Jude Parish Workshop, Makurdi',
    partnerLayout: 'horizontal',

    senderName: 'AzarFaith Cause Spotlight',
    senderEmail: 'contact@azarfaith.com',
    subjectLine: 'Cause Spotlight: Clean water storage for St. Jude Workshop, Benue',
    preheaderText:
      'Meet Pastor Samuel Terfa in Makurdi—64 partners have funded 77% of the parish clean water drum and solar pump.',

    locationDateKicker: 'VERIFIED CAUSE SPOTLIGHT · MAKURDI, BENUE STATE',
    headline: 'Clean water for twelve parish families in Makurdi.',
    subheading:
      '64 partners have funded ₦1,840,000 of the ₦2,400,000 workshop borehole goal.',
    greetingLine: 'Hello {{donor_first_name}},',
    bodyParagraphs: [
      'Pastor Samuel Terfa has trained apprentice carpenters behind St. Jude Parish in Makurdi for eleven years. When dry-season boreholes failed across the ward, apprentices spent two hours each morning hauling water before workshop prayers could begin.',
      'Rather than waiting for an external agency, Samuel and three local technicians mapped out a gravity-fed dual 2,000-litre storage system powered by a modest solar submersible pump—serving both the carpentry workshop and twelve neighbouring households.',
      'Every contribution goes directly to the verified parish bank account with a flat 2.5% AzarFaith platform fee and public vendor receipts uploaded as each stage is installed.',
    ],
    closingQuote:
      'Every piece is somebody. Help complete the final ₦560,000 for Makurdi.',

    imageSourceMode: 'curated-asset',
    dynamicImageUrl:
      'https://cdn.azarfaith.com/campaigns/2026/benue-parish-water-portrait.jpg',
    imageAltText:
      'Pastor Samuel Terfa standing beside newly installed green clean water storage tanks outside his red-brick parish workshop in Makurdi, Benue State.',
    imageCaption:
      'Pastor Samuel Terfa · St. Jude Parish Workshop, Makurdi, Benue State · March 2026',
    imageFallbackHex: '#ff5e00',
    photographyDirection: 'affected',
    illustrationMotif: 'water-drum',
    showDuotonePuzzlePattern: true,

    ctaLabel: 'Partner With Makurdi Water Project',
    ctaUrl: 'https://azarfaith.com/causes/makurdi-clean-water',
    secondaryLinkLabel: 'View Vendor Quotes & Parish Verification',
    secondaryLinkUrl: 'https://azarfaith.com/causes/makurdi-clean-water/ledger',

    newsletterDispatches: [],

    seasonalScriptureRef: '',
    seasonalScriptureText: '',
    seasonalCardSeasonLabel: '',

    causeSubjectName: 'Pastor Samuel Terfa',
    causeSubjectRole: 'Lead Carpenter & Parish Steward · Makurdi, Benue',
    causeRaisedNaira: 1840000,
    causeGoalNaira: 2400000,
    causeSupportersCount: 64,
    causeUseDynamicProgressTag: false,
    causeLineItems: [
      {
        id: 'item-1',
        item: '2× 2,000L Heavy-Duty Water Storage Drums',
        allocation: '₦680,000',
        status: 'Installed & Receipted',
      },
      {
        id: 'item-2',
        item: 'Solar Submersible Borehole Pump & Controller',
        allocation: '₦1,160,000',
        status: 'Funded · In Transit',
      },
      {
        id: 'item-3',
        item: 'Galvanised Standpipe & 12-Home Tap Manifold',
        allocation: '₦560,000',
        status: 'Remaining Need (23%)',
      },
    ],

    announcementEffectiveDate: '',
    announcementReferenceCode: '',
    announcementRails: [],

    caslClassification: 'charity-exemption',
    legalOrganizationName: 'AzarFaith Foundation & Digital Giving Ltd.',
    nigeriaOfficeAddress: '1566 Tsatse Dzani St., East-Legon, Lagos, Nigeria',
    canadaOfficeAddress: '240 Richmond St. W, Suite 400, Toronto, ON M5V 1V6, Canada',
    supportPhone: '+234 123 456 7890',
    ndpaConsentBasis:
      'You are receiving this verified cause spotlight under the Nigeria Data Protection Act (NDPA) based on your active donor preferences at azarfaith.com.',
    unsubscribeUrl:
      'https://azarfaith.com/unsubscribe?token={{unsubscribe_token}}',
    preferencesUrl: 'https://azarfaith.com/preferences',
    privacyPolicyUrl: 'https://azarfaith.com/privacy',
  },

  announcement: {
    id: 'announcement',
    templateLabel: 'Announcements',
    pairingId: 'civic-clarity',
    logoColourway: 'auto',

    partnerEnabled: false,
    partnerName: '',
    partnerLayout: 'horizontal',

    senderName: 'AzarFaith Stewardship & Product',
    senderEmail: 'contact@azarfaith.com',
    subjectLine: 'Announcement: Direct Naira Bank Transfers & Public Parish Ledgers',
    preheaderText:
      'No more unverified bank alerts or lost cash envelopes—every local and diaspora gift now generates a public, dated ledger receipt.',

    locationDateKicker: 'PLATFORM & STEWARDSHIP ANNOUNCEMENT · REF AF-2026-04',
    headline: 'Clear receipts for every Naira given in faith.',
    subheading:
      'Direct Naira bank transfers, Mobile Money, and public parish impact logs are now live across all verified accounts.',
    greetingLine: 'Dear {{donor_first_name}},',
    bodyParagraphs: [
      'For decades, faithful giving in Nigeria has relied on opaque cash envelopes, unverified bank transfer screenshots, and paper receipts that go missing before Sunday evening.',
      'Starting this month, every donation made through AzarFaith—whether via local Naira bank transfer, Mobile Money, or diaspora card—automatically posts to a dated, public parish ledger with zero campaign setup fees and a flat 2.5% platform fee.',
      'Church treasurers and ministry leaders can upload dated photographs and vendor invoices directly beside each disbursement so partners see the exact roof sheet, school desk, or water drum their gift funded.',
    ],
    closingQuote:
      'A platform built on proof. Built for Nigerian churches, orphanages, and schools.',

    imageSourceMode: 'curated-asset',
    dynamicImageUrl:
      'https://cdn.azarfaith.com/campaigns/2026/stewardship-objects-puzzle-grid.jpg',
    imageAltText:
      'Minimalist uniform-line illustration of four interlocking puzzle pieces framing a church pew, a school desk, a water drum, and a corrugated roof sheet.',
    imageCaption:
      'The Specific Objects the Work Runs On · AzarFaith Secondary Illustration System',
    imageFallbackHex: '#4164fe',
    photographyDirection: 'record',
    illustrationMotif: 'puzzle-unity',
    showDuotonePuzzlePattern: true,

    ctaLabel: 'Explore Live Public Ledgers',
    ctaUrl: 'https://azarfaith.com/transparency',
    secondaryLinkLabel: 'Verify Your Parish Account Free',
    secondaryLinkUrl: 'https://azarfaith.com/organizations/register',

    newsletterDispatches: [],

    seasonalScriptureRef: '',
    seasonalScriptureText: '',
    seasonalCardSeasonLabel: '',

    causeSubjectName: '',
    causeSubjectRole: '',
    causeRaisedNaira: 0,
    causeGoalNaira: 0,
    causeSupportersCount: 0,
    causeUseDynamicProgressTag: false,
    causeLineItems: [],

    announcementEffectiveDate: 'Live Across Nigeria & Diaspora · April 2026',
    announcementReferenceCode: 'RELEASE 02.4 · TRANSPARENCY LEDGER',
    announcementRails: [
      {
        id: 'rail-0',
        channel: 'Azar Faith User & Stablecoin Deposit',
        settlementWindow: '1 – 2 mins',
        feeStructure: '2.5% platform + instant ledger receipt',
      },
      {
        id: 'rail-1',
        channel: 'Mobile Money',
        settlementWindow: '5 mins',
        feeStructure: '2.5% platform + at-cost rail',
      },
      {
        id: 'rail-2',
        channel: 'Bank Transfer (Nigeria NIP)',
        settlementWindow: '2 – 24 hrs',
        feeStructure: '2.5% platform + at-cost rail',
      },
      {
        id: 'rail-3',
        channel: 'Global Payment (CAD / USD / GBP)',
        settlementWindow: '2 – 24 hrs',
        feeStructure: '2.5% platform + at-cost rail',
      },
    ],

    caslClassification: 'cem-express-consent',
    legalOrganizationName: 'AzarFaith Foundation & Digital Giving Ltd.',
    nigeriaOfficeAddress: '1566 Tsatse Dzani St., East-Legon, Lagos, Nigeria',
    canadaOfficeAddress: '240 Richmond St. W, Suite 400, Toronto, ON M5V 1V6, Canada',
    supportPhone: '+234 123 456 7890',
    ndpaConsentBasis:
      'You are receiving this platform announcement under the Nigeria Data Protection Act (NDPA) because you hold a verified donor or ministry steward profile on azarfaith.com.',
    unsubscribeUrl:
      'https://azarfaith.com/unsubscribe?token={{unsubscribe_token}}',
    preferencesUrl: 'https://azarfaith.com/preferences',
    privacyPolicyUrl: 'https://azarfaith.com/privacy',
  },
};

export function createSpamTestDraft(
  base: EmailTemplateConfig
): EmailTemplateConfig {
  return {
    ...base,
    subjectLine: 'URGENT WIRE NEEDED!! Act Immediately for 100% Free Blessing!!!',
    headline: 'URGENT ASSISTANCE REQUIRED TODAY!!',
    bodyParagraphs: [
      'ACT IMMEDIATELY!! We need an urgent wire transfer right now to claim your 100% free matching grant before midnight!!',
      ...(base.bodyParagraphs.slice(1) || []),
    ],
    ctaLabel: 'CLICK HERE NOW TO WIRE FUNDS!!',
    ctaUrl: 'http://bit.ly/azar-urgent-wire',
  };
}
