import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CommentsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>CommentsScreen llll</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
