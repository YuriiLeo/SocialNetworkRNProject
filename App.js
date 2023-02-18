import * as Font from "expo-font";
import { AppLoading } from "expo";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import Registration from "./src/Screens/RegistrationScreen";
import Login from "./src/Screens/LoginScreen";
import { useCallback, useState } from "react";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
// const loadFonts = async () => {
//   await Font.loadAsync({
//     Gajraj: require("./assets/fonts/GajrajOne-Regular.ttf"),
//   });
// };

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require("./assets/fonts/GajrajOne-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View
      style={styles.container}
      onLayout={onLayoutRootView}
    >
      <ImageBackground
        source={require("./assets/images/PhotoBG.jpg")}
        style={styles.image}
      >
        {/* <Registration /> */}
        <Login />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    fontFamily: "Inter",
    justifyContent: "flex-start",
  },
  image: {
    flex: 4,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  text: {
    color: "tomato",
    fontSize: 30,
  },
  innerBox: {
    borderWidth: 2,
    borderColor: "green",
    borderRadius: 4,
    padding: 10,
    marginTop: 20,
  },
});
