// LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import firebase from 'firebase/app';
import 'firebase/auth';
import { auth } from '../firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Configuração do Google Login
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: 'AIzaSyAviLSzrpn3SXCLqgxFFK6B5y-whKm7qgU',
  });

  // Lida com o login com Google
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      // Configura a credencial do Firebase com o token de ID do Google
      const credential = firebase.auth.GoogleAuthProvider.credential(id_token);
      auth.signInWithCredential(credential)
        .then(() => {
          navigation.navigate('Main'); // Navega para a tela principal após login
        })
        .catch(error => console.error("Erro de autenticação", error));
    }
  }, [response]);

  // Função para login com email e senha
  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      navigation.navigate('Main'); // Navega para a tela principal após o login
    } catch (error) {
      Alert.alert("Erro no login", error.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu email"
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />
      <Text>Senha:</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        secureTextEntry
        style={{ borderBottomWidth: 1, marginBottom: 20 }}
      />
      <Button title="Login com Email e Senha" onPress={handleLogin} />
      <Button
        title="Login com Google"
        disabled={!request}
        onPress={() => promptAsync()}
      />
      <Button
        title="Não tem uma conta? Registre-se"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};

export default LoginScreen;
