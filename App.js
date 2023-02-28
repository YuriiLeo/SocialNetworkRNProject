import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import useRoute from "./src/router";

const fontsMap = {
  SS_Regular: require("./assets/fonts/ShantellSans-Regular.ttf"),
  SS_Medium: require("./assets/fonts/ShantellSans-Medium.ttf"),
  SS_Bold: require("./assets/fonts/ShantellSans-Bold.ttf"),
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(fontsMap);
  const routing = useRoute({});

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>{routing}</NavigationContainer>
  );
}

// const [dimensions, setDimensions] = useState(
//   Dimensions.get("window").width - 16 * 2
// );
// useEffect(() => {
//   const onChange = () => {
//     const width = Dimensions.get("window").width - 16 * 2;
//     console.log("width", width);
//     setDimensions(width);
//   };
//   Dimensions.addEventListener("change", onChange);
//   return () => {
//     Dimensions.removeEventListener("change", onChange);
//   };
// }, []);

// <ImageBackground
//   source={require("./assets/images/PhotoBG.jpg")}
//   // style={styles.image}
//   style={{
//     ...styles.image,
//     width: dimensions,
//   }}
// ></ImageBackground>
