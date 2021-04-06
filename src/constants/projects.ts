export interface IProject {
  name: string;
  techs: string[];
  desc: string;
  imgUrl: string;
  link: string;
}

export const projects: IProject[] = [
  {
    name: 'Polartypes',
    techs: ['React', 'NestJS'],
    desc: 'Fullstack cloning Polarsteps, where you can share your adventrues in awsome way.',
    imgUrl: 'polartypes/screenshot.png',
    link: 'polartypes',
  },
  {
    name: 'DjangoEats',
    techs: ['React', 'Rest Framework'],
    desc: 'Fullstack cloning UberEats.',
    imgUrl: 'djangoeats/screenshot.png',
    link: 'django-eats',
  },
  {
    name: 'Medium-rare',
    techs: ['Typescript', 'Go'],
    desc: 'This is a description of the project.',
    imgUrl: 'mediumrare/screenshot.png',
    link: 'medium-rare',
  },
  {
    name: 'Covid 19 Dashboard',
    techs: ['React', 'Express'],
    desc: 'This is a description of the project.',
    imgUrl: 'covid19/screenshot.png',
    link: 'covid-19-dashboard',
  },
  {
    name: 'Pathfinder',
    techs: ['React'],
    desc: 'This is a description of the project.',
    imgUrl: 'pathfinder/screenshot.png',
    link: 'pathfinder',
  },
];
