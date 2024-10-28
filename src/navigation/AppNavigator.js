import React, { useContext } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthContext } from "../context/AuthContext";
import LoginScreen from "../screeens/LoginScreen";
import HomeScreen from "../screeens/HomeScreen";
import RegistrationScreen from "../screeens/RegistrationScreen";
import ProfileScreen from "../screeens/ProfileScreen";
import SettingsScreen from "../screeens/SettingScreen";
import Notifictions from "../screeens/Notifications";
import SoilAnalysis from "../screeens/SoilAnalysis";

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { userToken } = useContext(AuthContext); // Check if user is authenticated

  return (
    <Stack.Navigator>
      {userToken ? (
        // If user is authenticated, show HomeScreen, ProfileScreen, and SettingsScreen
        <>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ headerShown: true, title: 'Profile' }} 
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen} 
            options={{ headerShown: true, title: 'Settings' }} 
          />
          <Stack.Screen 
            name="Notifictions" 
            component={Notifictions} 
            options={{ headerShown: true, title: 'Notifictions' }} 
          />
          <Stack.Screen 
            name="Soilanalysis" 
            component={SoilAnalysis} 
            options={{ headerShown: true, title: 'Soilanalysis' }} 
          />
        </>
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
