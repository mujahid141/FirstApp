import axios from 'axios';
import { BASE_URL } from '../config/apiConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const login = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/token/`, { email, password });
        const { access, refresh } = response.data;

        await AsyncStorage.setItem('accessToken', access);
        await AsyncStorage.setItem('refreshToken', refresh);
        return response.data;
    } catch (error) {
        console.error('Login error', error);
    }
};

const refreshToken = async () => {
    const refreshToken = await AsyncStorage.getItem('refreshToken');
    if (!refreshToken) return null;
    try {
        const response = await axios.post(`${BASE_URL}/api/token/refresh/`, { refresh: refreshToken });
        await AsyncStorage.setItem('accessToken', response.data.access);
        return response.data.access;
    } catch (error) {
        console.error('Refresh token error', error);
    }
};

export { login, refreshToken };
