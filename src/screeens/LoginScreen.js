import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';  // Import navigation hook

const LoginScreen = () => {
  const { login } = useContext(AuthContext); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();  // Initialize navigation

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
      
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Sign In Your Account</Text>

      <Image source={require('../../assets/logo.png')} style={{ width: 100, height: 100, marginBottom: 20 }} />


      
      <TextInput
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
        style={{ width: '80%', height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 10 }}
      />
      
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ width: '80%', height: 40, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, paddingHorizontal: 10, marginBottom: 20 }}
      />
      
      <Button title="Sign In" onPress={() => login(username, password)} style={{ backgroundColor: '#007AFF', padding: 10, borderRadius: 5 }} />
      
      <Text style={{ marginTop: 10 }}>Forgot your password? Click here!</Text>
      
      {/* Navigate to RegisterScreen on "Sign Up" click */}
      <Text 
        style={{ marginTop: 10, color: 'blue' }} 
        onPress={() => navigation.navigate('Registration')}  // Add navigation to Registration screen
      >
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

export default LoginScreen;
