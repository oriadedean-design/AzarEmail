import announcementStewardshipImg from '../assets/images/announcement_stewardship_grid_1793905088706.jpg';
import causeBenueWaterImg from '../assets/images/cause_benue_water_1793905088636.jpg';
import easterPartnershipImg from '../assets/images/easter_partnership_card_1793905087541.jpg';
import newsletterKadunaImg from '../assets/images/newsletter_kaduna_school_1793905088243.jpg';
import { TemplateKind } from '../types/emailTemplate';

export const PREVIEW_TEMPLATE_IMAGES: Record<TemplateKind, string> = {
  newsletter: newsletterKadunaImg,
  'seasonal-easter': easterPartnershipImg,
  'cause-spotlight': causeBenueWaterImg,
  announcement: announcementStewardshipImg,
};
