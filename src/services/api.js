import axios from 'axios';

const api = axios.create({
  baseURL: 'http://167.172.228.229:3333',
});

export default api;
