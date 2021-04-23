import Vue from 'vue';
import Env from './env';

function httpGet(theUrl) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', theUrl, false); // false for synchronous request
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

let config = {};
try {
  config = JSON.parse(httpGet('/config.json'));
  Env.BASE_API_URL = config.BASE_API_URL || Env.BASE_API_URL;
  Env.FILE_API_URL = config.FILE_API_URL || Env.FILE_API_URL;
} catch (error) {
  console.error('Falha ao buscar configurações no arquivo /config.json');
}

Vue.use(Env, config);
