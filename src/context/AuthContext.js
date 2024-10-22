import React, { createContext, useState, useEffect } from 'react';
import { login as loginUser, refreshToken } from '../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);

    const login = async (username, password) => {
        const data = await loginUser(username, password);
        if (data) {
            setUserToken(data.access);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('accessToken');
        await AsyncStorage.removeItem('refreshToken');
        setUserToken(null);
    };

    useEffect(() => {
        const loadToken = async () => {
            const token = await AsyncStorage.getItem('accessToken');
            setUserToken(token);
        };
        loadToken();
    }, []);

    return (
        <AuthContext.Provider value={{ userToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
