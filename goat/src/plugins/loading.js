import Vue from 'vue';
import 'vue-loading-overlay/dist/vue-loading.css';
import Loading from 'vue-loading-overlay';

Vue.use(Loading, {
  color: '#c33c3c',
  loader: 'bars',
  width: 96,
  height: 96,
});
