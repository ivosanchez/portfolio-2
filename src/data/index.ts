import aboutData from './about.json';
import contactData from './contact.json';
import { ILanguageVariation } from './projects';

export interface IAboutPanel {
  text: ILanguageVariation;
  bgUrl: string;
  bgDesc?: ILanguageVariation;
}

export interface IContact {
  email: string;
  github: string;
  instagram: string;
}

export const ABOUT_PANELS: IAboutPanel[] = aboutData;

export const CONTACT: IContact = contactData;

export const THIS_SITE_GITHUB_URL = 'https://github.com/jonganebski/portfolio';
