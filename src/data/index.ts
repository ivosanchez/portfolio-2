import aboutData from './about.json';
import contactData from './contact.json';
import { ILanguageVariation } from './projects';

export interface IAboutPanel {
  text: ILanguageVariation;
  bgUrl?: string;
  bgDesc?: ILanguageVariation;
}

export interface IContact {
  email: string;
  phone: string;
  github: string;
  instagram: string;
}

export const ABOUT_PANELS: IAboutPanel[] = aboutData;

export const CONTACT: IContact = contactData;
