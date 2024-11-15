// App.js
import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Alert } from 'react-native';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import TouristSpotsScreen from './src/screens/TouristSpotsScreen';
import VisitHistoryScreen from './src/screens/VisitHistoryScreen';

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
  // Função para configurar notificações e solicitar permissões
  const setupNotifications = async () => {
    // Solicita permissões de notificação
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        Alert.alert('Permissão de Notificação', 'Permissões para notificações não foram concedidas!');
        return;
      }
    }

    // Agende uma notificação de exemplo quando o app iniciar
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Descubra novos lugares!",
        body: "Que tal explorar um novo ponto turístico?",
      },
      trigger: { seconds: 5 }, // Notificação acionada após 5 segundos
    });
  };

  useEffect(() => {
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
