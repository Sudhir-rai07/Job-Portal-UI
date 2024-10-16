import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000', // Replace with your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Request timeout
});

apiClient.interceptors.request.use(
  (config) =>{
    // const token = window.localStorage.getItem("token")
    const token = Cookies.get('token');
    if(token){
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) =>{
    return Promise.reject(error)
  }
)

export default apiClient;