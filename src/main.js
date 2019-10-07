import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import UUID from 'vue-uuid';
import Moment from 'vue-moment'
import VueLodash from 'vue-lodash'
import VuePlyr from 'vue-plyr'

//global component
import Notification from "@/components/Notification";

import './registerServiceWorker'
Vue.component('notification', Notification);

Vue.mixin({
  data() {
    return {
      status: {
        success: false,
        error: false,
        info: false,
        warning: false
      },
      err_msg: { error_details: [""] },
    }
  }
})

const options = { name: 'lodash' } // customize the way you want to call it
Vue.use(VueLodash, options) // options is optional

Vue.use(VuePlyr)
Vue.use(UUID);
Vue.use(Moment);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
