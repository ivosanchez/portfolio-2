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
    desc: { ko: string; en: string };
    posterUrl: string;
  };
  detail: {
    heroImgUrl: string;
    overviews: { heading: string; paragraph: string }[];
    frontendTechs?: string[];
    backendTechs?: string[];
    frontendGithubUrl?: string;
    backendGithubUrl?: string;
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
        desc: {
          ko: 'Polarstep을 풀스택으로 클론 코딩했어요.',
          en: 'Fullstack cloning Polarsteps, where you can share your adventures in awesome way.',
        },
        posterUrl: 'polartypes/screenshot.png',
      },
      detail: {
        heroImgUrl: 'polartypes/screenshot.png',
        overviews: [{ heading: '', paragraph: '' }],
        frontendTechs: [
          'Typescript',
          'React',
          'Apollo',
          'React Hook Form',
          'Moment Timezone',
          'Mapbox',
          'TailwindCSS',
        ],
        backendTechs: ['Typescript', 'NestJS', 'GraphQL', 'TypeORM', 'PostgreSQL', 'Jest'],
        frontendGithubUrl: 'https://github.com/jonganebski/polartypes-frontend',
        backendGithubUrl: 'https://github.com/jonganebski/polartypes-backend',
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
        desc: {
          ko: '',
          en:
            'Fullstack cloning UberEats with 3 roles(Restaurant owner, Delivery and Customer) and real-time order through Django-channels.',
        },
        posterUrl: 'djangoeats/screenshot.png',
      },
      detail: {
        heroImgUrl: 'djangoeats/screenshot.png',
        overviews: [{ heading: '', paragraph: '' }],
        frontendTechs: ['Typescript', 'React', 'Redux', 'React Hook Form', 'Chakra UI'],
        backendTechs: [
          'Python',
          'Rest Framework',
          'Django',
          'Django Channels',
          'PostgreSQL',
          'Redis',
        ],
        frontendGithubUrl: 'https://github.com/jonganebski/django-eats-frontend',
        backendGithubUrl: 'https://github.com/jonganebski/django-eats-backend',
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
        desc: { ko: '', en: 'This is a description of the project.' },
        posterUrl: 'mediumrare/screenshot.png',
      },
      detail: {
        heroImgUrl: 'mediumrare/screenshot.png',
        overviews: [{ heading: '', paragraph: '' }],
        frontendTechs: ['Typescript', 'Webpack', 'Pug', 'EditorJS', 'Sass'],
        backendTechs: ['Go', 'Fiber', 'MongoDB'],
        frontendGithubUrl: 'https://github.com/jonganebski/medium-rare',
        backendGithubUrl: 'https://github.com/jonganebski/medium-rare',
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
        desc: { ko: '', en: 'This is a description of the project.' },
        posterUrl: 'covid19/screenshot.png',
      },
      detail: {
        heroImgUrl: 'covid19/screenshot.png',
        overviews: [{ heading: '', paragraph: '' }],
        frontendTechs: ['Typescript', 'React', 'D3', 'React Leaflet', 'Chakra UI'],
        backendTechs: ['Typescript', 'Express', 'Cheerio'],
        frontendGithubUrl: 'https://github.com/jonganebski/covid-19-dashboard',
        backendGithubUrl: 'https://github.com/jonganebski/covid-19-dashboard-backend',
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
        techs: ['Typescript', 'React'],
        desc: { ko: '', en: 'This is a description of the project.' },
        posterUrl: 'pathfinder/screenshot.png',
      },
      detail: {
        heroImgUrl: 'pathfinder/screenshot.png',
        overviews: [{ heading: '', paragraph: '' }],
        frontendTechs: ['React', 'Styled Components'],
        frontendGithubUrl: 'https://github.com/jonganebski/pathfinder',
        descs: [{ heading: '', paragraph: '' }],
      },
    },
  ],
]);
