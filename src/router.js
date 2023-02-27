import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createNativeStackNavigator();
// const MainTab = createBottomTabNavigator();

// import { Feather } from "@expo/vector-icons";
// import { Ionicons } from "@expo/vector-icons";

import Registration from "../src/Screens/auth/RegistrationScreen";
import Login from "../src/Screens/auth/LoginScreen";
// import PostsScreen from "../src/Screens/mainScreen/PostsScreen";
// import CreateScreen from "../src/Screens/mainScreen/CreateScreen";
// import ProfileScreen from "../src/Screens/mainScreen/ProfileScreen";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const MainTab = createBottomTabNavigator();

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";

import PostsScreen from "../src/Screens/mainScreen/PostsScreen";
import CreateScreen from "../src/Screens/mainScreen/CreateScreen";
import ProfileScreen from "../src/Screens/mainScreen/ProfileScreen";
// import { TouchableOpacity } from "react-native-gesture-handler";

import Home from "../src/Screens/mainScreen/Home";
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
    <Home />

    // <MainTab.Navigator
    //   //   tapBarOptions={{
    //   //     showLabel: false,
    //   //   }}
    //   //
    //   screenOptions={{
    //     tabBarShowLabel: false,
    //   }}
    // >
    //   <MainTab.Screen
    //     name="Posts"
    //     component={PostsScreen}
    //     options={{
    //       tabBarIcon: (focused, color, size) => (
    //         <Feather name="grid" size={24} color={color} />
    //       ),
    //     }}
    //   />
    //   <MainTab.Screen
    //     name="Create"
    //     component={CreateScreen}
    //     options={{
    //       tabBarIcon: (focused, color, size) => (
    //         <Ionicons name="add" size={24} color={color} />
    //       ),
    //     }}
    //   />
    //   <MainTab.Screen
    //     name="Profile"
    //     component={ProfileScreen}
    //     options={{
    //       tabBarIcon: ({ focused, color, size }) => (
    //         <Feather name="user" size={24} color={color} />
    //       ),
    //     }}
    //   />
    // </MainTab.Navigator>
  );
}
