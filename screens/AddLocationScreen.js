import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import axios from 'axios';

const AddLocationScreen = ({ navigation, route }) => {
  const { refreshLocations } = route.params; // Get the refresh function
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');

  const addLocation = async () => {
    if (name && description && rating) {
      try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=AIzaSyAM8RK42HM0hGxucJygioYEdLHwwvTT1uY`);
        const locationData = response.data.results[0];

        if (locationData) {
          const { lat, lng } = locationData.geometry.location;

          // Save location to Firestore
          await addDoc(collection(db, 'locations'), { 
            name, 
            description, 
            rating: parseFloat(rating), 
            latitude: lat, 
            longitude: lng 
          });

          // Call the refresh function to update the list
          refreshLocations(prevLocations => [
            ...prevLocations,
            { name, description, rating: parseFloat(rating), latitude: lat, longitude: lng }
          ]);

          navigation.goBack();
        } else {
          Alert.alert("Location not found", "Please enter a valid location.");
        }
      } catch (error) {
        console.error("Error fetching coordinates: ", error);
        Alert.alert("Error", "Could not fetch coordinates. Please try again.");
      }
    } else {
      Alert.alert("Please fill in all fields.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Location Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
      <TextInput placeholder="Rating (1-5)" value={rating} onChangeText={setRating} keyboardType="numeric" style={styles.input} />
      <Button title="Add Location" onPress={addLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});

export default AddLocationScreen;