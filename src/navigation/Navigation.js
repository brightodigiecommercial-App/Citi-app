import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigationStore } from '../store/navigationStore';

// Import screens
import PostDownloadScreen from '../screens/PostDownloadScreen';
import RegistrationScreen from '../screens/RegistrationScreen';
import MultifactorAuthenticationScreen from '../screens/MultifactorAuthenticationScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { hasSeenPostDownload } = useNavigationStore();

  return (
    <Stack.Navigator 
      initialRouteName="PostDownload"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen 
        name="PostDownload" 
        component={PostDownloadScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen 
        name="Registration" 
        component={RegistrationScreen}
      />
      <Stack.Screen 
        name="MultifactorAuthentication" 
        component={MultifactorAuthenticationScreen}
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
