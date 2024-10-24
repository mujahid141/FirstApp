import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screeens/LoginScreen";
import HomeScreen from "../screeens/HomeScreen";
import RegistrationScreen from "../screeens/RegistrationScreen"; // Import RegistrationScreen

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { userToken } = useContext(AuthContext); // Check if user is authenticated

  return (
    <Stack.Navigator>
      {userToken ? (
        // If user is authenticated, show HomeScreen
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
      ) : (
        // If user is not authenticated, show LoginScreen and RegistrationScreen
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Registration" 
            component={RegistrationScreen} 
            options={{ headerShown: false }} 
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
