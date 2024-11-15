import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import LocationScreen from './src/screens/LocationScreen'; // Tela de pontos turísticos
import FavoritesScreen from './src/screens/FavoritesScreen'; // Tela de favoritos

const Stack = createStackNavigator();

// Configuração do comportamento da notificação
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App = () => {
  useEffect(() => {
    const setupNotifications = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          Alert.alert('Permissão de Notificação', 'Permissões para notificações não foram concedidas!');
          return;
        }
      }
    };
    setupNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrar' }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="LocationScreen" component={LocationScreen} options={{ title: 'Pontos Turísticos' }} />
        <Stack.Screen name="FavoritesScreen" component={FavoritesScreen} options={{ title: 'Favoritos' }} />
      </Stack.Navigator>

    </NavigationContainer>
  );
};

export default App;
