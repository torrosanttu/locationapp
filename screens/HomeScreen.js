import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';

const HomeScreen = ({ navigation }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    // Use onSnapshot to listen for real-time updates
    const unsubscribe = onSnapshot(collection(db, 'locations'), (snapshot) => {
      const locationsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLocations(locationsList);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={locations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.locationItem}>
            <Text style={styles.locationName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Rating: {item.rating}</Text>
            <Button title="View on Map" onPress={() => navigation.navigate('Map', { location: item })} />
          </View>
        )}
      />
      <Button title="Add Location" onPress={() => navigation.navigate('Add Location', { refreshLocations: setLocations })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  locationItem: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  locationName: {
    fontWeight: 'bold',
  },
});

export default HomeScreen;