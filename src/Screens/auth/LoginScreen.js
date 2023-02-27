import { Link } from "@react-navigation/native";
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
  Button,
} from "react-native";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ navigation }) {
  console.log(Platform.OS);
  console.log("navigation", navigation);
  const [isShowKeyBoard, setIsShowKeyBoard] =
    useState(false);
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };
  return (
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
            <KeyboardAvoidingView
              behavior={
                Platform.OS === "ios" ? "padding" : "height"
              }
            >
              <Text style={styles.title}>Sign In</Text>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder={"Email addres"}
                  onFocus={() => setIsShowKeyBoard(true)}
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
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder={"**********"}
                  onFocus={() => setIsShowKeyBoard(true)}
                  value={state.password}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      password: value,
                    }))
                  }
                />
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={keyboardHide}
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
                  // params: { id: "jane" },
                }}
              >
                Don't have an account? Register
              </Link> */}
              {/* <Text>Don't have an account? Register</Text> */}
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
