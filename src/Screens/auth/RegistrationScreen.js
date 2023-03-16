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
} from "react-native";

import { useDispatch } from "react-redux";

import { authSignUpUser } from "../../redux/auth/authOperations";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen() {
  const [isShowKeyBoard, setIsShowKeyBoard] =
    useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const hendleSubmit = () => {
    keyboardHide();
    dispatch(authSignUpUser(state));
    setState(initialState);
  };

  const keyboardHide = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
  };

  return (
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
            <KeyboardAvoidingView
              behavior={
                Platform.OS === "ios" ? "padding" : "height"
              }
            >
              <View>
                <Image
                  style={styles.addPhoto}
                  // source={require("../../assets/images/IMG.jpg")}
                ></Image>
              </View>
              <Text style={styles.title}>Sign Up</Text>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder={"Login"}
                  onFocus={() => setIsShowKeyBoard(true)}
                  value={state.login}
                  onChangeText={(value) =>
                    setState((prevState) => ({
                      ...prevState,
                      login: value,
                    }))
                  }
                />
              </View>
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
              onPress={hendleSubmit}
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
  addPhoto: {
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
