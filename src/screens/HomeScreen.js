import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Biblioteca de ícones
import { auth } from '../firebaseConfig';

const HomeScreen = ({ navigation }) => {
  const user = auth.currentUser;

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Olá, {user?.displayName || 'Visitante'}!
        </Text>
        <Text style={styles.subHeaderText}>O que você deseja explorar hoje?</Text>
      </View>

      {/* Botões de Navegação */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('LocationScreen')}
        >
          <Icon name="map-marker" size={30} color="#fff" />
          <Text style={styles.buttonText}>Pontos Turísticos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('FavoritesScreen')}
        >
          <Icon name="heart" size={30} color="#fff" />
          <Text style={styles.buttonText}>Favoritos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#4CAF50',
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subHeaderText: {
    fontSize: 16,
    color: '#e0e0e0',
    marginTop: 5,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
});

export default HomeScreen;
