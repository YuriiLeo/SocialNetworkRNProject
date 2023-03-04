import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as Location from "expo-location";

export default function CreateScreen({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [snap, setSnap] = useState(null);
  const [photo, setPhoto] = useState("");
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [permission, requestPermission] =
    Camera.useCameraPermissions();

  useEffect(() => {
    (async () => {
      let { status } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg(
          "Permission to access location was denied"
        );
        return;
      }

      // let location = await Location.getCurrentPositionAsync(
      //   {}
      // );
      // setLocation(location);
    })();
  }, []);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button
          onPress={requestPermission}
          title="grant permission"
        />
      </View>
    );
  }

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back
        ? CameraType.front
        : CameraType.back
    );
  }

  const takePhoto = async () => {
    console.log(!photo);
    // if (!photo) {
    const { uri } = await snap.takePictureAsync();
    const { coords } =
      await Location.getCurrentPositionAsync();

    console.log("latitude", coords.latitude);
    console.log("longitude", coords.longitude);

    console.log("snap", uri);
    setPhoto(uri);
    console.log("image", photo);
    //   }
    //   if (photo) {
    //     setPhoto("");
    //     console.log("photo2", photo);
    //   }
  };

  const postIsReady = () => {
    if (!photo) return false;
    return true;
  };

  const sendPhoto = () => {
    if (!postIsReady) return;
    navigation.navigate("DefaultPosts", { photo });
    setPhoto("");
  };

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={setSnap}
      >
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{ height: 200, width: 200 }}
            />
          </View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={toggleCameraType}
          >
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.snapWrapper}>
          <TouchableOpacity
            onPress={takePhoto}
            style={styles.snapContainer}
          >
            <Text style={styles.snap}>Photo</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.sendBtnContainer}>
          <TouchableOpacity
            onPress={sendPhoto}
            style={styles.snapContainer}
          >
            <Text style={styles.snap}>Send</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {/* <Text style={styles.paragraph}>{text}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    // alignItems: "flex-start",
  },
  camera: {
    position: "relative",
    // flex: 1,
    // width: 343,
    height: 240,
    marginTop: 32,
    marginHorizontal: 16,
  },
  takePhotoContainer: {
    position: "absolute",
    // top: 10,
    // left: 10,
    borderColor: "#fff",
    borderWidth: 1,
    height: "100%",
    width: "100%",
  },
  snapWrapper: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginRight: "-50%",
    marginBottom: "-50%",
    // transform: translate("-50%", "-50%"),

    flex: 1,
    // justifyContent: "center",
    justifyContent: "flex-start",

    alignItems: "center",
  },
  snapContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#FF6C00",
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  snap: { color: "#FFF" },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 24,
  },
  button: {
    flex: 1,
    alignSelf: "flex-start",
    alignItems: "flex-end",
  },
  text: {
    // fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  sendBtnContainer: {},
});
