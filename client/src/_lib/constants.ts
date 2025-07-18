export const MOBILE_SIZE = 768;
export const MANTINE_XS_SIZE = 576
export const TABLET_SIZE = 1024;
export const SCREEN_SIZE = 1216;
export const baseUrl = process.env.API_URL || 'http://localhost:3001';

export const handleLinkClick = (link: string) => {
  window.open(link, '_blank');
};

export interface AgeRange {
  min: number;
  max: number;
  label: string;
};

export const ageRanges: AgeRange[] = [
  { min: 0, max: 3, label: "0-3 ans" },
  { min: 3, max: 6, label: "3-6 ans" },
  { min: 6, max: 9, label: "6-9 ans" },
  { min: 9, max: 12, label: "9-12 ans" },
  { min: 12, max: 30, label: "12+" },
];

export const ROUTES = {
  ANIMALS: '/nos-animaux-a-adopter',
  EVENTS: '/nos-evenements',
  EVENT: '/evenement',
  CONTACT: '/contact',
  PROFILE: '/profile',
  ADMIN: '/admin',
  AUTH: '/auth',
  LOGIN: '/login',
  REGISTER: '/register',
};