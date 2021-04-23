import Vue from 'vue';
import Vuetify from 'vuetify';

jest.mock('@/router', () => ({
  currentRoute: {
    query: {},
  },
}));

Vue.use(Vuetify);

const el = document.createElement('div');
el.setAttribute('data-app', true);
document.body.appendChild(el);
