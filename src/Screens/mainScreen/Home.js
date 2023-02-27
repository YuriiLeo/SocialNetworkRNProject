import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const MainTab = createBottomTabNavigator();

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { AntDesign } from "@expo/vector-icons";

import PostsScreen from "../../../src/Screens/mainScreen/PostsScreen";
import CreateScreen from "../../../src/Screens/mainScreen/CreateScreen";
import ProfileScreen from "../../../src/Screens/mainScreen/ProfileScreen";
import { useNavigation } from "@react-navigation/native";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";

export default function Home() {
  return (
    <MainTab.Navigator
      //   tapBarOptions={{
      //     showLabel: false,
      //   }}
      //
      activeColor="tomato"
      inactiveColor="green"
      barStyle={{ backgroundColor: "#694fad" }}
      initialRouteName="Posts"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: { borderBottomWidth: 1 },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ marginRight: 15 }}
            >
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
              />
            </TouchableOpacity>
          ),
          tabBarIcon: (focused, color, size) => (
            <Feather name="grid" size={24} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          headerTitle: "Create a publication",
          headerStyle: {
            backgroundColor: "papayawhip",
          },

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
                  // onPress={() => navigation.navigate("Posts")}
                />
              </TouchableOpacity>
            );
          },
          //   headerTitleAlign: "center",
          tabBarIcon: (focused, color, size) => (
            <Ionicons name="add" size={24} color={color} />
          ),
        }}
      />
      {/* </View> */}
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          //   headerTitleAlign: "center",
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="user" size={24} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
