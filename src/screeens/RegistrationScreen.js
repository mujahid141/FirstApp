import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Image, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
  const { login } = useContext(AuthContext); // If you plan to log in after registration
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    // Simple client-side validation
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill out all fields.'); // Check all fields
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }
  
    try {
      const response = await axios.post('http://192.168.0.102:8000/api/auth/register/', {
        username: username,
        email: email,
        password1: password,
        password2: confirmPassword,
      });
  
      if (response.status === 204) {
        // Registration successful, navigate to login or home screen
        Alert.alert('Success', 'Registration successful! You can now log in.');
        navigation.navigate('Login');
      } else {
        // Registration failed, handle the error response
        Alert.alert('Error', response.data.message || 'Something went wrong!');
      }
    } catch (error) {
      if (error.response) {
        // Check for specific field errors
        const { username, password1, password2 } = error.response.data;
        let errorMessage = '';
        
        if (username) {
          errorMessage += `${username.join(' ')}\n`; // Join errors if multiple
        }
        if (password1) {
          errorMessage += `${password1.join(' ')}\n`;
        }
        if (password2) {
          errorMessage += `${password2.join(' ')}\n`;
        }
  
        Alert.alert('Error', errorMessage || 'Registration failed.');
      } else {
        // Something happened in setting up the request that triggered an error
        Alert.alert('Error', 'Failed to register. Please try again later.');
      }
    }
  };
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Register Yourself</Text>

      <Image source={require('../../assets/Reg.png')} style={{ width: 100, height: 100, marginBottom: 20 }} />

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={{ width: '80%', height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 }}
      />
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ width: '80%', height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ width: '80%', height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{ width: '80%', height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 20 }}
      />

      <Button title="Register" onPress={handleRegister} style={{ backgroundColor: '#349B5F', padding: 10, borderRadius: 5 }} />

      <Text style={{ marginTop: 10 }}>Forgot your password? Click here!</Text>

      <Text style={{ marginTop: 10, color: 'blue' }} onPress={() => navigation.navigate('Login')}>
        Already have an account? Sign In
      </Text>
    </View>
  );
};

export default RegisterScreen;
