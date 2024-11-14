// App.js
import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import TouristSpotsScreen from './src/screens/TouristSpotsScreen';
import VisitHistoryScreen from './src/screens/VisitHistoryScreen';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        await Notifications.requestPermissionsAsync();
      }
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Descubra novos lugares!",
          body: "Que tal explorar um novo ponto turístico?",
        },
        trigger: { seconds: 5 }, // Notificação acionada após 5 segundos como exemplo
      });
    };
    setupNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrar' }} />
        <Stack.Screen name="TouristSpots" component={TouristSpotsScreen} options={{ title: 'Pontos Turísticos' }} />
        <Stack.Screen name="VisitHistory" component={VisitHistoryScreen} options={{ title: 'Histórico de Visitas' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
