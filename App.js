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
  // const [isReady, setIsReady] = useState(false);
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
  // const routing = useRoute({});
  return (
    <NavigationContainer>{routing}</NavigationContainer>
  );
}

// import { useFonts } from "expo-font";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

// const styles = StyleSheet.create({
// container: {
//   flex: 2,
//   fontFamily: "Inter",
//   justifyContent: "flex-start",
// },
// image: {
//   flex: 4,
//   resizeMode: "cover",
//   justifyContent: "flex-end",
// },
//   text: {
//     color: "tomato",
//     fontSize: 30,
//   },
//   innerBox: {
//     borderWidth: 2,
//     borderColor: "green",
//     borderRadius: 4,
//     padding: 10,
//     marginTop: 20,
//   },
// });

// const [fontsLoaded] = useFonts({
//   Inter: require("./assets/fonts/GajrajOne-Regular.ttf"),
// });

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

// const onLayoutRootView = useCallback(async () => {
//   if (fontsLoaded) {
//     await SplashScreen.hideAsync();
//   }
// }, [fontsLoaded]);

// if (!fontsLoaded) {
//   return null;
// }

// <ImageBackground
//   source={require("./assets/images/PhotoBG.jpg")}
//   // style={styles.image}
//   style={{
//     ...styles.image,
//     width: dimensions,
//   }}
// ></ImageBackground>
