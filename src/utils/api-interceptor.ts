import axios from "axios";

// If calling from server side, the base url with need to include the domain
const isServer = typeof window === "undefined";
const baseURL = isServer ? `${process.env.NEXT_PUBLIC_API_URL}` : "";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 120000,
});

// Request Interceptor
instance.interceptors.request.use(
  config => {
    // Add custom headers or modify config here if needed
    // config.headers['Custom-Header'] = 'your-value';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response Interceptor
instance.interceptors.response.use(
  response => {
    // Handle or log responses here if needed
    return response;
  },
  error => {
    // Handle errors globally here if needed
    if (axios.isAxiosError(error)) {
      const responseData = error.response?.data;
      console.log('Error: ', responseData);
    }

    return Promise.reject(error);
  }
);

export default instance;
