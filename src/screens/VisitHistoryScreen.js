// VisitHistoryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { db } from '../firebaseConfig';

const VisitHistoryScreen = () => {
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    // Busca o histórico de visitas do usuário no Firestore
    const fetchVisits = async () => {
      const visitsCollection = await db.collection('visits').where("userId", "==", auth.currentUser.uid).get();
      setVisits(visitsCollection.docs.map(doc => doc.data()));
    };
    fetchVisits();
  }, []);

  return (
    <View>
      <FlatList
        data={visits}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - {item.date.toDate().toLocaleString()}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default VisitHistoryScreen;
