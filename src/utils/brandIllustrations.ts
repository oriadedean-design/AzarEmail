import { IllustrationMotifId } from '../types/emailTemplate';

export interface BrandIllustrationSpec {
  id: Exclude<IllustrationMotifId, 'none'>;
  title: string;
  sectionRef: string;
  caption: string;
}

export const BRAND_ILLUSTRATION_SPECS: Record<
  Exclude<IllustrationMotifId, 'none'>,
  BrandIllustrationSpec
> = {
  'hands-partnership': {
    id: 'hands-partnership',
    title: 'Primary Motif: Hands for the Work',
    sectionRef: 'Section 04 · Primary Illustration',
    caption: 'Hands are the work: holding, building, passing, meeting.',
  },
  'puzzle-unity': {
    id: 'puzzle-unity',
    title: 'Primary Motif: Circular-Tab Puzzle Join',
    sectionRef: 'Section 05 · Puzzle Structure',
    caption: 'Every piece is somebody. Where two pieces meet, a whole circle appears.',
  },
  'water-drum': {
    id: 'water-drum',
    title: 'Secondary Motif: Clean Water Drum',
    sectionRef: 'Section 04 · Secondary Illustration',
    caption: 'The specific objects the work runs on: parish water storage.',
  },
  'roofing-sheet': {
    id: 'roofing-sheet',
    title: 'Secondary Motif: Corrugated Zinc Roof Sheet',
    sectionRef: 'Section 04 · Secondary Illustration',
    caption: 'Under a zinc roof in Kaduna — keeping the classroom and church dry.',
  },
  'school-desk': {
    id: 'school-desk',
    title: 'Secondary Motif: Timber School Desk',
    sectionRef: 'Section 04 · Secondary Illustration',
    caption: 'Handcrafted classroom desks for village and mission schools.',
  },
  'church-pew': {
    id: 'church-pew',
    title: 'Secondary Motif: Parish Church Pew',
    sectionRef: 'Section 04 · Secondary Illustration',
    caption: 'Built for local congregations gathering in fellowship.',
  },
};

/**
 * Generates an inline SVG adhering strictly to AzarFaith Section 04 rules:
 * - Single uniform stroke weight (stroke-width="2")
 * - Flat solid fills only (zero gradients, zero hatching, zero drop shadows)
 * - Hands drawn as soft rounded tubes with nails as the only interior detail
 */
export function renderBrandMotifSvg(
  motifId: IllustrationMotifId,
  primaryColor: string,
  secondaryColor: string,
  surfaceFill: string = '#f6ebd9',
  inkColor: string = '#171615'
): string {
  if (motifId === 'none') return '';

  switch (motifId) {
    case 'hands-partnership':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none" role="img" aria-label="AzarFaith Primary Motif: Hands meeting around a puzzle piece" style="display:block;">
        <!-- Circular-tab puzzle core (Flat Fill, Uniform Line) -->
        <rect x="19" y="19" width="18" height="18" rx="2" fill="${primaryColor}" stroke="${inkColor}" stroke-width="2" />
        <circle cx="28" cy="19" r="4" fill="${secondaryColor}" stroke="${inkColor}" stroke-width="2" />
        <circle cx="37" cy="28" r="4" fill="${surfaceFill}" stroke="${inkColor}" stroke-width="2" />
        <!-- Left Soft-Tube Hand (Nails as sole interior detail per Section 04) -->
        <path d="M6 34 C6 25, 12 20, 19 20 C22 20, 24 22, 24 24 C24 26, 21 27, 17 27 L14 27 C14 31, 17 34, 22 34 L25 34 C27 34, 28 36, 28 38 C28 40, 26 42, 21 42 L12 42 C8 42, 6 39, 6 34 Z" fill="${surfaceFill}" stroke="${inkColor}" stroke-width="2" stroke-linejoin="round" />
        <path d="M21 22.5 C22.5 22.5, 23 23.2, 23 24 C23 24.8, 22.5 25.5, 21 25.5 Z" fill="${secondaryColor}" stroke="${inkColor}" stroke-width="1.5" />
        <!-- Right Soft-Tube Hand -->
        <path d="M50 22 C50 31, 44 36, 37 36 C34 36, 32 34, 32 32 C32 30, 35 29, 39 29 L42 29 C42 25, 39 22, 34 22 L31 22 C29 22, 28 20, 28 18 C28 16, 30 14, 35 14 L44 14 C48 14, 50 17, 50 22 Z" fill="${secondaryColor}" stroke="${inkColor}" stroke-width="2" stroke-linejoin="round" />
        <path d="M35 33.5 C33.5 33.5, 33 32.8, 33 32 C33 31.2, 33.5 30.5, 35 30.5 Z" fill="${surfaceFill}" stroke="${inkColor}" stroke-width="1.5" />
      </svg>`;

    case 'puzzle-unity':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none" role="img" aria-label="AzarFaith Puzzle Structure: Two pieces completing a circle" style="display:block;">
        <!-- Left Piece (The Work) -->
        <rect x="6" y="12" width="22" height="32" rx="2" fill="${primaryColor}" stroke="${inkColor}" stroke-width="2" />
        <!-- Right Piece (The Support) -->
        <rect x="28" y="12" width="22" height="32" rx="2" fill="${secondaryColor}" stroke="${inkColor}" stroke-width="2" />
        <!-- Circular Tab Join Completing a Whole Circle -->
        <circle cx="28" cy="28" r="6" fill="${primaryColor}" stroke="${inkColor}" stroke-width="2" />
        <circle cx="17" cy="12" r="4.5" fill="${surfaceFill}" stroke="${inkColor}" stroke-width="2" />
        <circle cx="39" cy="44" r="4.5" fill="${secondaryColor}" stroke="${inkColor}" stroke-width="2" />
      </svg>`;

    case 'water-drum':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none" role="img" aria-label="AzarFaith Secondary Motif: Clean Water Drum" style="display:block;">
        <rect x="14" y="10" width="28" height="36" rx="5" fill="${secondaryColor}" stroke="${inkColor}" stroke-width="2" />
        <ellipse cx="28" cy="12" rx="14" ry="4" fill="${surfaceFill}" stroke="${inkColor}" stroke-width="2" />
        <line x1="14" y1="22" x2="42" y2="22" stroke="${inkColor}" stroke-width="2" />
        <line x1="14" y1="34" x2="42" y2="34" stroke="${inkColor}" stroke-width="2" />
        <rect x="25" y="38" width="6" height="5" rx="1" fill="${primaryColor}" stroke="${inkColor}" stroke-width="2" />
      </svg>`;

    case 'roofing-sheet':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none" role="img" aria-label="AzarFaith Secondary Motif: Corrugated Zinc Roofing Sheet" style="display:block;">
        <polygon points="8,36 20,14 48,14 36,36" fill="${surfaceFill}" stroke="${inkColor}" stroke-width="2" stroke-linejoin="round" />
        <line x1="15" y1="36" x2="27" y2="14" stroke="${inkColor}" stroke-width="2" />
        <line x1="22" y1="36" x2="34" y2="14" stroke="${inkColor}" stroke-width="2" />
        <line x1="29" y1="36" x2="41" y2="14" stroke="${inkColor}" stroke-width="2" />
        <path d="M8 36 Q11.5 32 15 36 Q18.5 40 22 36 Q25.5 32 29 36 Q32.5 40 36 36" fill="none" stroke="${primaryColor}" stroke-width="2.5" />
      </svg>`;

    case 'school-desk':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none" role="img" aria-label="AzarFaith Secondary Motif: Timber School Desk" style="display:block;">
        <polygon points="10,22 18,14 46,14 38,22" fill="${secondaryColor}" stroke="${inkColor}" stroke-width="2" stroke-linejoin="round" />
        <rect x="12" y="22" width="26" height="6" fill="${surfaceFill}" stroke="${inkColor}" stroke-width="2" />
        <line x1="14" y1="28" x2="14" y2="44" stroke="${inkColor}" stroke-width="2" stroke-linecap="round" />
        <line x1="36" y1="28" x2="36" y2="44" stroke="${inkColor}" stroke-width="2" stroke-linecap="round" />
        <line x1="44" y1="16" x2="44" y2="38" stroke="${inkColor}" stroke-width="2" stroke-linecap="round" />
        <rect x="20" y="16" width="10" height="4" rx="1" fill="${primaryColor}" stroke="${inkColor}" stroke-width="1.5" />
      </svg>`;

    case 'church-pew':
      return `<svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56" fill="none" role="img" aria-label="AzarFaith Secondary Motif: Parish Church Pew" style="display:block;">
        <polygon points="10,16 42,12 42,26 10,30" fill="${surfaceFill}" stroke="${inkColor}" stroke-width="2" stroke-linejoin="round" />
        <polygon points="10,30 42,26 48,30 16,34" fill="${primaryColor}" stroke="${inkColor}" stroke-width="2" stroke-linejoin="round" />
        <rect x="10" y="16" width="5" height="28" rx="1" fill="${secondaryColor}" stroke="${inkColor}" stroke-width="2" />
        <rect x="42" y="12" width="5" height="28" rx="1" fill="${secondaryColor}" stroke="${inkColor}" stroke-width="2" />
      </svg>`;
  }
}
