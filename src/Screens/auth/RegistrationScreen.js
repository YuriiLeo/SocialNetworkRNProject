import { Link } from "@react-navigation/native";
import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  // Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useDispatch } from "react-redux";

import { authSignUpUser } from "../../redux/auth/authOperations";

import { db, storage } from "../../firebase/config";
import uuid from "react-native-uuid";
import {
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default function RegistrationScreen() {
  const [isShowKeyBoard, setIsShowKeyBoard] =
    useState(false);
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [passwordView, setPasswordView] = useState(true);

  const dispatch = useDispatch();

  const [isFocusedLogin, setFocusedLogin] = useState(false);
  const [isFocusedEmail, setFocusedEmail] = useState(false);
  const [isFocusedPassword, setFocusedPassword] =
    useState(false);

  const handleFocusLogin = () => {
    setFocusedLogin(true);
    setIsShowKeyBoard(true);
  };

  const handleBlurLogin = () => {
    setFocusedLogin(false);
    setIsShowKeyBoard(false);
  };

  const handleFocusEmail = () => {
    setFocusedEmail(true);
    setIsShowKeyBoard(true);
  };

  const handleBlurEmail = () => {
    setFocusedEmail(false);
    setIsShowKeyBoard(false);
  };
  const handleFocusPassword = () => {
    setFocusedPassword(true);
    setIsShowKeyBoard(true);
  };

  const handleBlurPassword = () => {
    setFocusedPassword(false);
    setIsShowKeyBoard(false);
  };

  const deleteAvatarImage = () => setImage(null);

  const handlePickAvatarImage = () => {
    if (image) {
      return deleteAvatarImage();
    }
    pickAvatarImage();
  };

  const keyboardHide = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
  };

  const switchPasswordView = () => {
    if (!passwordView) {
      return setPasswordView(true);
    }
    if (password.length !== 0) {
      setPasswordView(false);
    }
  };

  const pickAvatarImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadAvatarImageToServer = async () => {
    if (!image) return;
    try {
      const response = await fetch(image);
      const file = await response.blob();

      const avatarImageId = uuid.v4();

      const storageRef = ref(
        storage,
        `avatarImage/${avatarImageId}`
      );
      await uploadBytes(storageRef, file);
      const processedAvatarImage = await getDownloadURL(
        ref(storage, `avatarImage/${avatarImageId}`)
      );

      return processedAvatarImage;
    } catch (error) {
      console.log(error);
    }
  };

  const registrationIsReady = () => {
    if (!login || !email || !password) return false;
    return true;
  };

  const handleSubmit = async () => {
    if (!registrationIsReady()) {
      return Alert.alert("Fill in all fields");
    }
    try {
      keyboardHide();
      const userAvatar = await uploadAvatarImageToServer();
      dispatch(
        authSignUpUser({
          userAvatar,
          login,
          email,
          password,
        })
      );
      setEmail("");
      setImage("");
      setLogin("");
      setPassword("");
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === "ios" ? "padding" : "height"
      }
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View style={styles.container}>
          <ImageBackground
            source={require("../../../assets/images/PhotoBG.jpg")}
            style={styles.image}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyBoard ? 10 : 45,
                marginBottom: isShowKeyBoard ? -40 : 0,
              }}
            >
              <View style={styles.containerPickAvatarImage}>
                {image && (
                  <Image
                    source={{ uri: image }}
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 16,
                    }}
                  />
                )}
              </View>
              <Text style={styles.title}>Sign Up</Text>
              <TouchableOpacity
                onPress={handlePickAvatarImage}
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 100,
                  backgroundColor: "#FFFFFF",
                  position: "absolute",
                  top: 21,
                  right: 115,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: !image
                    ? "#FF6C00"
                    : "#BDBDBD",
                  // transform: image
                  //   ? [{ rotate: "45deg" }]
                  //   : [{ rotate: "0deg" }],
                }}
              >
                {!image ? (
                  <AntDesign
                    name="plus"
                    size={15}
                    color="#FF6C00"
                  />
                ) : (
                  <AntDesign
                    name="close"
                    size={15}
                    color="#BDBDBD"
                  />
                )}
              </TouchableOpacity>
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusedLogin
                      ? "#FF6C00"
                      : "#E8E8E8",
                  }}
                  onFocus={handleFocusLogin}
                  onBlur={handleBlurLogin}
                  placeholder={"Login"}
                  value={login}
                  onChangeText={(value) => setLogin(value)}
                />
              </View>
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusedEmail
                      ? "#FF6C00"
                      : "#E8E8E8",
                  }}
                  placeholder={"Email addres"}
                  keyboardType="email-address"
                  onFocus={handleFocusEmail}
                  onBlur={handleBlurEmail}
                  value={email}
                  onChangeText={(value) => setEmail(value)}
                />
              </View>
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusedPassword
                      ? "#FF6C00"
                      : "#E8E8E8",
                  }}
                  secureTextEntry={passwordView}
                  placeholder={"********"}
                  onFocus={handleFocusPassword}
                  onBlur={handleBlurPassword}
                  value={password}
                  onChangeText={(value) =>
                    setPassword(value)
                  }
                />
                <TouchableOpacity
                  onPress={switchPasswordView}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: 100,
                    position: "absolute",
                    top: 30,
                    right: 16,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {passwordView ? (
                    <Entypo
                      name="eye"
                      size={24}
                      color="black"
                    />
                  ) : (
                    <Entypo
                      name="eye-with-line"
                      size={24}
                      color="black"
                    />
                  )}
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleSubmit}
                style={styles.btn}
              >
                <Text style={styles.btnTitle}>
                  Registration
                </Text>
              </TouchableOpacity>
              <View style={{ alignItems: "center" }}>
                <Text>
                  Already have an account?
                  <Link
                    to={{
                      screen: "Login",
                    }}
                    style={{
                      color: "blue",
                    }}
                  >
                    {" "}
                    Sign in
                  </Link>
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "flex-start",
  },
  image: {
    flex: 4,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    position: "relative",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  containerPickAvatarImage: {
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -60,
    right: 128,
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  title: {
    marginBottom: 16,
    paddingTop: 92,
    fontSize: 30,
    fontWeight: "bold",
    color: "#212121",
    textAlign: "center",
  },
  inputText: {
    color: "#BDBDBD",
    fontSize: 16,
  },
  input: {
    marginTop: 16,
    paddingLeft: 16,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#FF6C00",
    borderRadius: 8,
    height: 50,
    color: "#BDBDBD",
    fontSize: 16,
  },
  btn: {
    marginTop: 43,
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  btnTitle: {
    color: "#FFFFFF",
  },
});
