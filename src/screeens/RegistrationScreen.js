import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const { login } = useContext(AuthContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    // ... your registration logic here
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>Register Yourself</Text>

      <Image source={require('../../assets/Reg.png')} style={{ width: 100, height: 100, marginBottom: 20 }} />

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