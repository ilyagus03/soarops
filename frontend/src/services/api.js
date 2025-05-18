import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    // You can add authentication headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Handle specific error codes
    if (error.response) {
      const { status } = error.response;
      
      // Handle authentication errors
      if (status === 401 && !originalRequest._retry) {
        // Add logic for token refresh if needed
      }
      
      // Log server errors
      if (status >= 500) {
        console.error('Server error:', error.response.data);
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;
