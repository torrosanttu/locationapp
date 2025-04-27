import React from 'react';
import { View, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route }) => {
  const { location } = route.params;

  if (!location.latitude || !location.longitude) {
    Alert.alert("Error", "Location coordinates are not available.");
    return null; // Prevent rendering the map if coordinates are missing
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title={location.name} />
      </MapView>
    </View>
  );
};

export default MapScreen;