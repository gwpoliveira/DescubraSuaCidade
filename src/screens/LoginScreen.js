import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // Verifica o estado de autenticação
  useEffect(() => {
    const checkAuth = async () => {
      const cachedUser = await AsyncStorage.getItem('user');
      if (cachedUser) {
        navigation.navigate('Home');
      } else {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            await AsyncStorage.setItem('user', JSON.stringify(user));
            navigation.navigate('Home');
          } else {
            await AsyncStorage.removeItem('user');
          }
        });
      }
    };

    checkAuth();
  }, []);

  // Função para login com email e senha
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
      navigation.navigate('Home'); // Navega para a tela Home
    } catch (error) {
      Alert.alert('Erro no login', error.message);
    }
  };


  return (
    <ImageBackground
      source={{
        uri: 'https://img.freepik.com/vetores-premium/fundo-ondulado-gradiente-colorido_677411-3454.jpg?w=360',
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.header}>Bem-vindo!</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu email"
            placeholderTextColor="#ccc"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#ccc"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button title="Entrar" onPress={handleLogin} color="#4CAF50" />
          <Text style={styles.registerText} onPress={() => navigation.navigate('Register')}>
            Não tem uma conta? Registre-se aqui
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  registerText: {
    color: '#4CAF50',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
