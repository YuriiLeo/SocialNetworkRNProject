import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  return (
    <View style={styles.container}>
      {/* <Text>MapScreen</Text> */}
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: "12.01067426600318",
          longitude: "102.29265801349386",
          longitudeDelta: "0.1",
          latitudeDelta: "0.6",
        }}
      >
        <Marker
          coordinate={{
            latitude: "12.01067426600318",
            longitude: "102.29265801349386",
          }}
          title="Photo"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
});
