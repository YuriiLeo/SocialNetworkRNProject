import React from "react";
import { TouchableOpacity } from "react-native";

import DefaultPostsScreen from "../nestedScreens/DefaultPostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";

import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const NestedScreens = createNativeStackNavigator();

export default function PostsScreen({
  navigation,
  router,
}) {
  return (
    <NestedScreens.Navigator>
      <NestedScreens.Screen
        options={{
          headerTitle: "Posts",
          headerStyle: { borderBottomWidth: 1 },
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
        }}
        name="DefaultPosts"
        component={DefaultPostsScreen}
      />
      <NestedScreens.Screen
        options={{
          headerStyle: { borderBottomWidth: 1 },
          headerTitleAlign: "center",
          headerLeft: () => {
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
      <NestedScreens.Screen
        options={{
          headerStyle: { borderBottomWidth: 1 },
          headerTitleAlign: "center",
          headerLeft: () => {
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
    </NestedScreens.Navigator>
  );
}
