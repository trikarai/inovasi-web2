import Vue from 'vue';
import Vuetify from 'vuetify/lib';

//Translation 
import en from '@/config/lang/en';
import id from '@/config/lang/id';

//Themes selector
// import tema from './themes/innov';
import tema from './themes/startmikti';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  lang: {
    locales: { en, id },
    current: 'en'
  },
  dark: false,
  theme: {
    themes: tema
  }
});
