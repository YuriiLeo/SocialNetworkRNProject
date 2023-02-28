import React from "react";
import { TouchableOpacity } from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

import Registration from "../src/Screens/auth/RegistrationScreen";
import Login from "../src/Screens/auth/LoginScreen";
import Home from "../src/Screens/mainScreen/Home";
import CommentsScreen from "../src/Screens/mainScreen/CommentsScreen";
import MapScreen from "../src/Screens/mainScreen/MapScreen";

import { useNavigation } from "@react-navigation/native";

export default function useRoute(isAuth) {
  if (!isAuth) {
    return (
      <AuthStack.Navigator initialRouteName="Login">
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />
        <AuthStack.Screen
          options={{
            headerShown: false,
          }}
          name="Registration"
          component={Registration}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        options={{
          headerStyle: { borderBottomWidth: 1 },
          headerTitleAlign: "center",
          headerLeft: () => {
            const navigation = useNavigation();
            return (
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ marginRight: 15 }}
                onPress={() => navigation.goBack()}
              >
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            );
          },
        }}
        name="Comments"
        component={CommentsScreen}
      />
      <HomeStack.Screen
        options={{
          headerStyle: { borderBottomWidth: 1 },
          headerTitleAlign: "center",
          headerLeft: () => {
            const navigation = useNavigation();
            return (
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ marginRight: 15 }}
                onPress={() => navigation.goBack()}
              >
                <AntDesign
                  name="arrowleft"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            );
          },
        }}
        name="Location"
        component={MapScreen}
      />
    </HomeStack.Navigator>
  );
}
