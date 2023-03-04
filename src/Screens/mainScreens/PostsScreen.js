import React from "react";
import { TouchableOpacity } from "react-native";

import DefaultPostsScreen from "../nestedScreens/DefaultPostsScreen";
import CommentsScreen from "../nestedScreens/CommentsScreen";
import MapScreen from "../nestedScreens/MapScreen";
// import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

const NestedScreens = createNativeStackNavigator();

export default function PostsScreen({ navigation }) {
  // const navigation = useNavigation();

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
            // const navigation = useNavigation();
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
            // const navigation = useNavigation();
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

// import React from "react";
// import {
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
// } from "react-native";

// // import { useNavigation } from "@react-navigation/native";

// import { FontAwesome5 } from "@expo/vector-icons";
// import { Feather } from "@expo/vector-icons";

// // import PostItem from "../../components/PostItem";

// import posts from "../../components/posts.json";

// export default function PostsScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.containerProfile}>
//         <View style={styles.containerUserImage}>
//           <Image
//             style={styles.userPhoto}
//             source={require("../../../assets/images/IMG.jpg")}
//           />
//         </View>
//         <View>
//           <Text style={styles.userTitle}>
//             Natali Romanova
//           </Text>
//           <Text style={styles.userEmail}>
//             email@example.com
//           </Text>
//         </View>
//       </View>
//       <FlatList
//         data={posts}
//         keyExtractor={(item) => item.id}
//         // renderItem={({ item }) => <PostItem item={item} />}
//         renderItem={({ item }) => (
//           <View style={{ marginBottom: 32 }}>
//             <View>
//               <Image
//                 style={styles.postPhoto}
//                 source={{ uri: `${item.url}` }}
//               />
//             </View>
//             <View>
//               <Text style={styles.postTitle}>
//                 {item.title}
//               </Text>
//             </View>
//             <View style={styles.containerOptionBar}>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                 }}
//               >
//                 <TouchableOpacity
//                   onPress={() =>
//                     navigation.navigate("Comments")
//                   }
//                 >
//                   <FontAwesome5
//                     name="comment-alt"
//                     size={20}
//                     color="#BDBDBD"
//                   />
//                 </TouchableOpacity>
//                 <Text style={styles.coments}>
//                   {item.comments}
//                 </Text>
//               </View>
//               <View
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                 }}
//               >
//                 <Feather
//                   name="map-pin"
//                   size={20}
//                   color="#BDBDBD"
//                   onPress={() =>
//                     navigation.navigate("Location")
//                   }
//                 />
//                 <Text style={styles.location}>
//                   {item.location}
//                 </Text>
//               </View>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 32,
//     paddingHorizontal: 16,
//     backgroundColor: "#FFFFFF",
//   },
//   containerProfile: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 32,
//   },
//   containerUserImage: {
//     marginRight: 8,
//   },
//   userPhoto: {
//     backgroundColor: "#F6F6F6",
//     width: 60,
//     height: 60,
//     borderRadius: 16,
//   },
//   userTitle: {
//     color: "#212121",
//     fontWeight: "700",
//     fontFamily: "SS_Bold",
//     fontSize: 13,
//   },
//   userEmail: {
//     color: "rgba(33, 33, 33, 0.8)",
//     fontWeight: "400",
//     fontFamily: "SS_Regular",
//     fontSize: 11,
//   },
// });
