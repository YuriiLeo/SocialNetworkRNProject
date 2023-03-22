// import { Link } from "@react-navigation/native";
import React, { useState } from "react";

import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  ImageBackground,
} from "react-native";
import { Entypo } from "@expo/vector-icons";

import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  const [isShowKeyBoard, setIsShowKeyBoard] =
    useState(false);
  const [state, setState] = useState(initialState);
  const [passwordView, setPasswordView] = useState(true);

  const dispatch = useDispatch();

  const [isFocusedEmail, setFocusedEmail] = useState(false);
  const [isFocusedPassword, setFocusedPassword] =
    useState(false);

  console.log("isFocusedEmail", isFocusedEmail);
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

  const hendleSubmit = () => {
    keyboardHide();
    console.log(state);
    setState(initialState);
    dispatch(authSignInUser(state));
  };

  const keyboardHide = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
  };

  const switchPasswordView = () => {
    if (!passwordView) {
      return setPasswordView(true);
    }
    if (state.password.length !== 0) {
      setPasswordView(false);
    }
  };
  console.log("l", state.password.length);
  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === "ios" ? "padding" : "height"
      }
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View
          style={styles.container}
          // onLayout={onLayoutRootView}
        >
          <ImageBackground
            source={require("../../../assets/images/PhotoBG.jpg")}
            style={styles.image}
          >
            <View
              style={{
                ...styles.form,
                paddingBottom: isShowKeyBoard ? 10 : 111,
                marginBottom: isShowKeyBoard ? -40 : 0,
              }}
            >
              <Text style={styles.title}>Sign In</Text>
              <View>
                <TextInput
                  style={{
                    ...styles.input,
                    borderColor: isFocusedEmail
                      ? "#FF6C00"
                      : "#E8E8E8",
                  }}
                  placeholder={"Email addres"}
                  onFocus={handleFocusEmail}
                  onBlur={handleBlurEmail}
                  value={state.email}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      email: value,
                    }))
                  }
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
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
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
                onPress={hendleSubmit}
                style={styles.btn}
              >
                <Text style={styles.btnTitle}>Sign In</Text>
              </TouchableOpacity>
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Registration")
                  }
                >
                  <Text>
                    Don't have an account?
                    <Text
                      style={{
                        color: "blue",
                      }}
                    >
                      {" "}
                      Register
                    </Text>
                  </Text>
                </TouchableOpacity>
                {/* <Link
                  to={{
                    screen: "Registration",
                  }}
                >
                  <Text>
                    Don't have an account? Register
                  </Text>
                </Link> */}
                {/* <Text>Don't have an account? Register</Text> */}
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
    // fontFamily: "Inter",
    justifyContent: "flex-start",
  },
  image: {
    flex: 4,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    paddingBottom: 111,
    // position: "relative",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    // fontFamily: "Inter",
    marginBottom: 16,
    marginTop: 32,
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
    border: 1,
    borderColor: "#E8E8E8",
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
