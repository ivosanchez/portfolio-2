export const getAsset = (url: string) => require(`@/assets/${url}`);

export const greetings = (email: string) => {
  console.log('---------------------------------------');
  console.log(' ');
  console.log('%c👨‍💻 Jinseok Bang, 방진석', 'color: green; font-size: 1rem;');
  console.log(`%c💌 ${email}`, 'font-size: 1rem;');
  console.log(' ');
  console.log('---------------------------------------');
};
