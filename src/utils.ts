export const getAsset = (url: string) => require(`@/assets/${url}`);

export const greetings = (email: string) => {
  console.log('---------------------------------------');
  console.log(' ');
  console.log('%cđ¨âđģ Jinseok Bang, ë°Šė§ė', 'color: green; font-size: 1rem;');
  console.log(`%cđ ${email}`, 'font-size: 1rem;');
  console.log(' ');
  console.log('---------------------------------------');
};
