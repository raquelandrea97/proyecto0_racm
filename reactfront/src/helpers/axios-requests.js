import axios from 'axios';

const instance = axios.create({
  baseURL: `http://127.0.0.1:5000/`,
  responseType: 'json',
});

export default instance;