import axios from 'axios';
import router from '@/router';
import User from '@/store/User';


const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// interceptor for adding token to request
instance.interceptors.request.use(
  (config) => {
    // add token to request header
    if (User.getters.isAuthenticated) {
      config.headers['Authorization'] = `Token ${User.state.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if token is invalid or expired, clear the user state and redirect to login
    if (error.response && error.response.status === 401) {
      User.commit('clearState');
      router.push({ name: 'login' });
    }
    return Promise.reject(error);
  }
);

export default instance;
