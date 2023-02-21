import * as Font from "expo-font";
import { AppLoading } from "expo";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
} from "react-native";
import Registration from "./src/Screens/auth/RegistrationScreen";
import Login from "./src/Screens/auth/LoginScreen";
import { useCallback, useEffect, useState } from "react";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require("./assets/fonts/GajrajOne-Regular.ttf"),
  });

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );
  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      console.log("width", width);
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

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
        // style={styles.image}
        style={{
          ...styles.image,
          width: dimensions,
        }}
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
