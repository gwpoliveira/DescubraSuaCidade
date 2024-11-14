// LocationScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { fetchTouristSpots } from '../services/touristAPI';

const LocationScreen = () => {
  const [location, setLocation] = useState(null);
  const [spots, setSpots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const getLocationAndSpots = async () => {
      try {
        // Solicita permissão de localização
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permissão para acessar localização foi negada');
          setLoading(false);
          return;
        }

        // Obtém a localização atual do usuário
        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);

        // Busca pontos turísticos próximos com base nas coordenadas do usuário
        const data = await fetchTouristSpots(location.coords.latitude, location.coords.longitude);
        if (data && data.features) {
          setSpots(data.features); // `data.features` contém os pontos turísticos no OpenTripMap
        } else {
          setErrorMsg('Nenhum ponto turístico encontrado.');
        }
      } catch (error) {
        setErrorMsg('Erro ao carregar pontos turísticos.');
      } finally {
        setLoading(false);
      }
    };

    getLocationAndSpots();
  }, []);

  // Exibe mensagem de erro, se houver
  if (errorMsg) {
    return (
      <View style={styles.centered}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  // Exibe o indicador de carregamento enquanto os dados estão sendo carregados
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pontos Turísticos Próximos</Text>
      {location && (
        <Text style={styles.locationText}>
          Sua localização: Latitude {location.coords.latitude.toFixed(4)}, Longitude {location.coords.longitude.toFixed(4)}
        </Text>
      )}
      <FlatList
        data={spots}
        keyExtractor={(item) => item.id || item.properties.xid} // Use xid como alternativa se id não estiver disponível
        renderItem={({ item }) => (
          <View style={styles.spotContainer}>
            <Text style={styles.spotName}>{item.properties.name || 'Sem nome'}</Text>
            <Text>{item.properties.kinds ? item.properties.kinds.replace(/_/g, ', ') : 'Sem categoria'}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  locationText: {
    fontSize: 16,
    marginBottom: 10,
  },
  spotContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  spotName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocationScreen;
