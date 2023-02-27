import React, { useEffect, useState } from "react";
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";

export default function Container({ children }) {
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
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/images/PhotoBG.jpg")}
        style={{
          ...styles.image,
          width: dimensions,
        }}
      >
        {children}
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
});
