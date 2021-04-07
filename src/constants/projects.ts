export enum PATH_KEY {
  POLARTYPES = 'polartypes',
  DJANGO_EATS = 'django-eats',
  MEDIUM_RARE = 'medium-rare',
  COVID_19 = 'covid-19-dashboard',
  PATHFINDER = 'pathfinder',
}

export interface IProject {
  name: string;
  href: string;
  path: PATH_KEY;
  nextPath: PATH_KEY;
  summary: {
    techs: string[];
    desc: string;
    posterUrl: string;
  };
  detail: {
    heroImgUrl: string;
    overviews: { heading: string; paragraph: string }[];
    frontendTechs?: string[];
    backendTechs?: string[];
    descs: { heading: string; imgUrl?: string; paragraph: string }[];
  };
}

export const projects = new Map<PATH_KEY, IProject>([
  [
    PATH_KEY.POLARTYPES,
    {
      name: 'Polartypes',
      href: '',
      path: PATH_KEY.POLARTYPES,
      nextPath: PATH_KEY.DJANGO_EATS,
      summary: {
        techs: ['React', 'NestJS'],
        desc: 'Fullstack cloning Polarsteps, where you can share your adventrues in awesome way.',
        posterUrl: 'polartypes/screenshot.png',
      },
      detail: {
        heroImgUrl: 'polartypes/screenshot.png',
        overviews: [{ heading: '', paragraph: '' }],
        frontendTechs: [
          'React',
          'Apollo',
          'React Hook Form',
          'Moment Timezone',
          'Mapbox',
          'TailwindCSS',
        ],
        backendTechs: ['NestJS', 'GraphQL', 'TypeORM', 'PostgreSQL', 'Jest'],
        descs: [
          { heading: 'Obstacles', paragraph: 'aaa' },
          { heading: 'Limitations and future plan', paragraph: 'bbb' },
        ],
      },
    },
  ],
  [
    PATH_KEY.DJANGO_EATS,
    {
      name: 'DjangoEats',
      href: '',
      path: PATH_KEY.DJANGO_EATS,
      nextPath: PATH_KEY.MEDIUM_RARE,
      summary: {
        techs: ['React', 'Rest Framework'],
        desc: 'Fullstack cloning UberEats.',
        posterUrl: 'djangoeats/screenshot.png',
      },
      detail: {
        heroImgUrl: 'djangoeats/screenshot.png',
        overviews: [{ heading: '', paragraph: '' }],
        frontendTechs: ['React', 'Redux', 'React Hook Form', 'Chakra UI'],
        backendTechs: ['Rest Framework', 'Django', 'Django Channels', 'PostgreSQL', 'Redis'],
        descs: [{ heading: '', paragraph: '' }],
      },
    },
  ],
  [
    PATH_KEY.MEDIUM_RARE,
    {
      name: 'Medium-rare',
      href: '',
      path: PATH_KEY.MEDIUM_RARE,
      nextPath: PATH_KEY.COVID_19,
      summary: {
        techs: ['Typescript', 'Go'],
        desc: 'This is a description of the project.',
        posterUrl: 'mediumrare/screenshot.png',
      },
      detail: {
        heroImgUrl: 'mediumrare/screenshot.png',
        overviews: [{ heading: '', paragraph: '' }],
        frontendTechs: ['Webpack', 'Pug', 'EditorJS', 'Sass'],
        backendTechs: ['Fiber', 'MongoDB'],
        descs: [{ heading: '', paragraph: '' }],
      },
    },
  ],
  [
    PATH_KEY.COVID_19,
    {
      name: 'Covid 19 Dashboard',
      href: '',
      path: PATH_KEY.COVID_19,
      nextPath: PATH_KEY.PATHFINDER,
      summary: {
        techs: ['React', 'Express'],
        desc: 'This is a description of the project.',
        posterUrl: 'covid19/screenshot.png',
      },
      detail: {
        heroImgUrl: 'covid19/screenshot.png',
        overviews: [{ heading: '', paragraph: '' }],
        frontendTechs: ['React', 'D3', 'React Leaflet', 'Chakra UI'],
        backendTechs: ['Express', 'Cheerio'],
        descs: [{ heading: '', paragraph: '' }],
      },
    },
  ],
  [
    PATH_KEY.PATHFINDER,
    {
      name: 'Pathfinder',
      href: '',
      path: PATH_KEY.PATHFINDER,
      nextPath: PATH_KEY.POLARTYPES,
      summary: {
        techs: ['React'],
        desc: 'This is a description of the project.',
        posterUrl: 'pathfinder/screenshot.png',
      },
      detail: {
        heroImgUrl: 'pathfinder/screenshot.png',
        overviews: [{ heading: '', paragraph: '' }],
        frontendTechs: ['React', 'Styled Components'],
        descs: [{ heading: '', paragraph: '' }],
      },
    },
  ],
]);
