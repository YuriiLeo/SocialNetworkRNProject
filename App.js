import React, {
  useCallback,
  useEffect,
  useState,
} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import useRoute from "./src/router";
import store from "./src/redux/store";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebase/config";
import Main from "./src/components/Main";

const fontsMap = {
  SS_Regular: require("./assets/fonts/ShantellSans-Regular.ttf"),
  SS_Medium: require("./assets/fonts/ShantellSans-Medium.ttf"),
  SS_Bold: require("./assets/fonts/ShantellSans-Bold.ttf"),
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(fontsMap);
  // const [user, setUser] = useState(null);
  // console.log("user Change", user);

  // useEffect(() => {
  //   first;

  //   return () => {
  //     second;
  //   };
  // }, [third]);

  // const routing = useRoute(user);

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
    <Provider store={store}>
      <Main />
      {/* <NavigationContainer>{routing}</NavigationContainer> */}
    </Provider>
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
