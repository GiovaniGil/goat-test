import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import './sass/utils.sass';
import './plugins/loading';
import 'vue-cal/dist/vuecal.css';
import 'vue-cal/dist/i18n/pt-br.js';
import Toasted from 'vue-toasted';


Vue.config.productionTip = false;
Vue.use(Toasted);

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
