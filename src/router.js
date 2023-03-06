import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

import Registration from "../src/Screens/auth/RegistrationScreen";
import Login from "../src/Screens/auth/LoginScreen";

import CreateScreen from "../src/Screens/mainScreens/CreateScreen";
import ProfileScreen from "../src/Screens/mainScreens/ProfileScreen";
import PostsScreen from "../src/Screens/mainScreens/PostsScreen";

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
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Feather name="grid" size={24} color={color} />
          ),
        }}
      />
      <MainTab.Screen
        options={{
          headerTitle: "Create a publication",
          headerLeft: () => {
            const navigation = useNavigation();
            return (
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ marginLeft: 15 }}
                onPress={() =>
                  navigation.navigate("DefaultPosts")
                }
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
