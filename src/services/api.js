import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-serversind.com',
});

export default api;
