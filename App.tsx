import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddEmployee from './source/AdminScreens/AddEmployee';
import AdminHomeScreen from './source/AdminScreens/AdminHomeScreen';
import SplashScreen from './source/AdminScreens/splashscreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AddEmployee" component={AddEmployee} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
