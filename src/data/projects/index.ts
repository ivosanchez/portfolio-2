import polartypesData from './polartypes.json';
import djangoeatsData from './djangoeats.json';
import mediumrareData from './mediumrare.json';
import covid19dashboardData from './covid19dashboard.json';
import pathfinderData from './pathfinder.json';

export enum PATH_KEY {
  POLARTYPES = 'polartypes',
  DJANGO_EATS = 'django-eats',
  MEDIUM_RARE = 'medium-rare',
  COVID_19 = 'covid-19-dashboard',
  PATHFINDER = 'pathfinder',
}

export interface ILanguageVariation {
  ko: string;
  en: string;
}

export interface IProject {
  name: string;
  href: string;
  path: PATH_KEY;
  nextPath: PATH_KEY;
  summary: {
    techs: string[];
    desc: ILanguageVariation;
    videoSrc: string;
    posterUrl: string;
  };
  detail: {
    heroImgUrl: string;
    overviews: { heading: ILanguageVariation; paragraphs: ILanguageVariation[] }[];
    frontendTechs?: string[];
    backendTechs?: string[];
    frontendGithubUrl?: string;
    backendGithubUrl?: string;
    descs: { heading: ILanguageVariation; imgUrl?: string; paragraphs: ILanguageVariation[] }[];
  };
}

export const POLARTYPES: IProject = {
  path: PATH_KEY.POLARTYPES,
  nextPath: PATH_KEY.DJANGO_EATS,
  ...polartypesData,
};

export const DJANGO_EATS: IProject = {
  path: PATH_KEY.DJANGO_EATS,
  nextPath: PATH_KEY.MEDIUM_RARE,
  ...djangoeatsData,
};

export const MEDIUM_RARE: IProject = {
  path: PATH_KEY.MEDIUM_RARE,
  nextPath: PATH_KEY.COVID_19,
  ...mediumrareData,
};

export const COVID_19_DASHBOARD: IProject = {
  path: PATH_KEY.COVID_19,
  nextPath: PATH_KEY.PATHFINDER,
  ...covid19dashboardData,
};

export const PATHFINDER: IProject = {
  path: PATH_KEY.PATHFINDER,
  nextPath: PATH_KEY.POLARTYPES,
  ...pathfinderData,
};

export const PROJECTS: IProject[] = [
  POLARTYPES,
  DJANGO_EATS,
  MEDIUM_RARE,
  COVID_19_DASHBOARD,
  PATHFINDER,
];
