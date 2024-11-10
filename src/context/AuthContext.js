import React, { createContext, useState, useEffect } from 'react';
import { login as loginUser } from '../services/authService'; // Import the login function
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state for checking token

    const login = async (username, password) => {
        try {
            const data = await loginUser(username, password); // Call login from authService
            if (data) {
                setUserToken(data.key); // Set the access token
                await AsyncStorage.setItem('accessToken', data.key); // Store access token in AsyncStorage
            }
        } catch (error) {
            console.error('Login error:', error);
            throw new Error('Login failed. Please check your credentials.');
        }
    };
    

    const logout = async () => {
        await AsyncStorage.removeItem('accessToken'); // Remove access token from AsyncStorage
        setUserToken(null); // Clear user token
    };

    const loadToken = async () => {
        const token = await AsyncStorage.getItem('accessToken'); // Retrieve access token
        setUserToken(token); // Set user token state
        setLoading(false); // Set loading to false after token retrieval
    };

    useEffect(() => {
        loadToken(); // Load token on app start
    }, []);

    if (loading) {
        return null; // Render nothing or a loader until token is checked
    }



    return (
        <AuthContext.Provider value={{ userToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
