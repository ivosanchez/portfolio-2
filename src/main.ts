import 'locomotive-scroll/dist/locomotive-scroll.min.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/globalStyles.css';
import './styles/reset.css';

createApp(App)
  .use(router)
  .mount('#app');
