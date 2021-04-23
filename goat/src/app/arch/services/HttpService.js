import axios from 'axios';
import Env from '@/plugins/env';

const httpService = axios.create({
  baseURL: Env.BASE_API_URL,
});

export default httpService;
