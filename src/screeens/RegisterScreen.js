import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { BASE_URL } from "../config/apiConfig";

const RegisterScreen = () => {
  const { login } = useContext(AuthContext); // We might want to auto-login after registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    // Basic validation
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    try {
      // Call the register API on Django backend
      const response = await axios.post(`${BASE_URL}/api/register/`, {
        email,
        password,
      });

      if (response.status === 201) {
        // Registration successful, you can auto-login or show a success message
        Alert.alert("Registration successful!");
        login(email, password); // Auto-login after registration
      }
    } catch (error) {
      console.error("Registration error:", error);
      Alert.alert("Registration failed. Please try again.");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Register</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginVertical: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginVertical: 10, borderBottomWidth: 1 }}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={{ marginVertical: 10, borderBottomWidth: 1 }}
      />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;
