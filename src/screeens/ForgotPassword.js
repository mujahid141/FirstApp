import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const { resetPassword } = useContext(AuthContext);
    const navigation = useNavigation();

    const handleResetPassword = async () => {
        if (email === '') {
            Alert.alert('Error', 'Please enter your email');
            return;
        }

        try {
            await resetPassword(email);
            Alert.alert('Success', 'Password reset link sent! Please check your email.');
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Reset Failed', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Forgot Password?</Text>

            <Image source={require('../../assets/forgotlogo.png')} style={styles.logo} />


            <TextInput
                style={styles.input}
                placeholder="Enter your Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholderTextColor="#888"
            />

            <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>Send Reset Link</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signInText}>Back to Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#44923c',
        textAlign: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 120,
        height: 120,
        borderColor: '#349B5F',
        
    },

    input: {
        width: '80%',
        height: 50,
        backgroundColor: '#fff',
        marginTop: 25,
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingHorizontal: 15,
        marginBottom: 20,
        color: '#333',
    },
    button: {
        width: '80%',
        backgroundColor: '#72bf6a',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signInText: {
        marginBottom: 20,
        color: '#6200ea',
        fontSize: 16,
    },
});

export default ForgotPasswordScreen;
