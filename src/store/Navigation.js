import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// New Registration Flow Screens
import SignupScreen from '../screens/SignupScreen';
import RegistrationNameEmailScreen from '../screens/RegistrationNameEmailScreen';
import RegistrationGenderAgeScreen from '../screens/RegistrationGenderAgeScreen';
import RegistrationPhoneScreen from '../screens/RegistrationPhoneScreen';
import RegistrationVerifyCodeScreen from '../screens/RegistrationVerifyCodeScreen';
import RegistrationFinalizeScreen from '../screens/RegistrationFinalizeScreen';

// Existing Screens (keep these)
import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
// ... other existing screens

// DELETED SCREENS (Remove imports):
// import MultifactorAuthenticationScreen from '../screens/MultifactorAuthenticationScreen';
// import PostDownloadScreen from '../screens/PostDownloadScreen';
// import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignupScreen"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* New Registration Flow */}
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen 
          name="RegistrationNameEmail" 
          component={RegistrationNameEmailScreen} 
        />
        <Stack.Screen 
          name="RegistrationGenderAge" 
          component={RegistrationGenderAgeScreen} 
        />
        <Stack.Screen 
          name="RegistrationPhone" 
          component={RegistrationPhoneScreen} 
        />
        <Stack.Screen 
          name="RegistrationVerifyCode" 
          component={RegistrationVerifyCodeScreen} 
        />
        <Stack.Screen 
          name="RegistrationFinalize" 
          component={RegistrationFinalizeScreen} 
        />

        {/* Main App Screens */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ServicesScreen" component={ServicesScreen} />
        
        {/* Add other existing screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
