// import React from "react";
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// import { useNavigation } from "@react-navigation/native";

// import { FontAwesome5 } from "@expo/vector-icons";
// import { Feather } from "@expo/vector-icons";

// export default function PostItem({ item }) {
//   const navigation = useNavigation();
//   return (
//     <View style={{ marginBottom: 32 }}>
//       <View>
//         <Image
//           style={styles.postPhoto}
//           source={{ uri: `${item.url}` }}
//         />
//       </View>
//       <View>
//         <Text style={styles.postTitle}>{item.title}</Text>
//       </View>
//       <View style={styles.containerOptionBar}>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//           }}
//         >
//           <TouchableOpacity
//             onPress={() => navigation.navigate("Comments")}
//           >
//             <FontAwesome5
//               name="comment-alt"
//               size={20}
//               color="#BDBDBD"
//             />
//           </TouchableOpacity>
//           <Text style={styles.coments}>
//             {item.comments}
//           </Text>
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             alignItems: "center",
//           }}
//         >
//           <Feather
//             name="map-pin"
//             size={20}
//             color="#BDBDBD"
//             onPress={() => navigation.navigate("Location")}
//           />
//           <Text style={styles.location}>
//             {item.location}
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   postPhoto: {
//     resizeMode: "cover",
//     height: 240,
//     borderRadius: 8,
//   },
//   postTitle: {
//     marginVertical: 8,
//     fontSize: 16,
//     fontWeight: "500",
//     fontFamily: "SS_Medium",
//   },
//   containerOptionBar: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   coments: {
//     color: "#BDBDBD",
//     fontWeight: "400",
//     fontFamily: "SS_Regular",
//     fontSize: 16,
//     marginLeft: 6,
//   },
//   location: {
//     fontWeight: "400",
//     fontFamily: "SS_Regular",
//     fontSize: 16,
//     marginLeft: 6,
//   },
// });
