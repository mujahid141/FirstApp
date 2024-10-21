import axios from 'axios';

// Create an instance of axios
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/', // Replace with your API base URL
  timeout: 10000, // Set a timeout (in milliseconds) for requests
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    // You can add other headers here
  },
});

// Interceptors can be used to add tokens or handle errors globally
apiClient.interceptors.request.use(
  (config) => {
    // You can add a token if needed
    const token = ''; // Replace with logic to get your token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle the request error here
    return Promise.reject(error);
  }
);

// Interceptors for handling responses
apiClient.interceptors.response.use(
  (response) => {
    // Handle the response data here
    return response.data;
  },
  (error) => {
    // Handle the response error here
    return Promise.reject(error);
  }
);

// Export the configured axios instance
export default apiClient;
