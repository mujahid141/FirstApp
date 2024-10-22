import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../config/apiConfig'; // Ensure BASE_URL is correctly defined

// Set default axios config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // optional: set timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login service
const login = async (username, password) => {
  try {
    const response = await apiClient.post('http://192.168.0.102:8000/api/auth/login/', { username, password });
    const { access, refresh } = response.data;

    // Store tokens in AsyncStorage
    await AsyncStorage.setItem('accessToken', access);
    await AsyncStorage.setItem('refreshToken', refresh);

    return response.data;
  } catch (error) {
    console.error('Login error', error.response ? error.response.data : error.message);
    throw new Error('Login failed. Please check your credentials.');
  }
};

// Refresh token service
const refreshToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  if (!refreshToken) return null;

  try {
    const response = await apiClient.post('/auth/token/refresh/', { refresh: refreshToken });
    const { access } = response.data;

    // Store the new access token
    await AsyncStorage.setItem('accessToken', access);
    
    return access;
  } catch (error) {
    console.error('Refresh token error', error.response ? error.response.data : error.message);
    throw new Error('Failed to refresh token');
  }
};

export { login, refreshToken };
