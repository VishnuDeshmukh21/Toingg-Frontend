// api.js or axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://toingg-backend.onrender.com/api',
  // You can add other custom settings here
});

export default instance;