import Vue from 'vue';
import Vuetify from 'vuetify/lib';

//Translation 
import en from '@/config/lang/en';
import id from '@/config/lang/id';

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
    themes: {
      light: {
        primary: '#8bc751',
        sidebar: '#e4e4e4'
      },
      dark: {
        primary: '#8bc751'
      }
    }
  }
});
