import React from "react";
import {
  StyleSheet,
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

export default function Home() {
  const navigation = useNavigation();

  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "SS_Medium",
        },
        headerStyle: {
          borderBottomWidth: 1,
        },
        tabBarStyle: {
          height: 83,
        },
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
                onPress={() => navigation.navigate("Login")}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="grid" size={24} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        options={{
          headerTitle: "Create a publication",
          headerLeft: () => {
            return (
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ marginLeft: 15 }}
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
          tabBarIcon: () => (
            <View style={styles.button}>
              <Ionicons name="add" size={20} color="#FFF" />
            </View>
          ),
        }}
        name="Create"
        component={CreateScreen}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ marginRight: 15 }}
            >
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                onPress={() => navigation.navigate("Login")}
              />
            </TouchableOpacity>
          ),
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
  button: {
    backgroundColor: "#FF6C00",
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
