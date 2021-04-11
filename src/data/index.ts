import aboutData from './about.json';
import contactData from './contact.json';

export interface IAboutPanel {
  text: string;
  bgUrl?: string;
  bgDesc?: string;
}

interface IContact {
  email: string;
  phone: string;
}

export const ABOUT_PANELS: IAboutPanel[] = aboutData;

export const CONTACT: IContact = contactData;
