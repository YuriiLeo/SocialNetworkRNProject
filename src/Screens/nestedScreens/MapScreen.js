import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  const { latitude, longitude, title } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude,
          longitude,
          longitudeDelta: "0.001",
          latitudeDelta: "0.006",
        }}
        initialRegion={{
          latitude: "12.01067426600318",
          longitude: "102.29265801349386",
          longitudeDelta: "0.1",
          latitudeDelta: "0.6",
        }}
      >
        <Marker
          coordinate={{
            latitude,
            longitude,
          }}
          title={title}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
