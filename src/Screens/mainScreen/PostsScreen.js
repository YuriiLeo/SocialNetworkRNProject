import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const posts = [
  {
    id: "1",
    title: "Leon",
    comments: 1,
    url: "https://cdn.pixabay.com/photo/2017/10/24/18/27/lion-2885618_960_720.jpg",
    location: "Frankivs'k Region, Ukraine",
  },
  {
    id: "2",
    title: "Ocean",
    comments: 22,
    url: "https://cdn.pixabay.com/photo/2023/02/08/14/13/sea-7776715_960_720.jpg",
    location: "Kyiv Region, Ukraine",
  },
  {
    id: "3",
    title: "Snow",
    comments: 5,
    url: "https://cdn.pixabay.com/photo/2022/12/21/13/27/forest-7670068_960_720.jpg",
    location: "Kyiv Region, Ukraine",
  },
  {
    id: "4",
    title: "Bird",
    comments: 5,
    url: "https://cdn.pixabay.com/photo/2023/02/03/15/27/bird-7765384_960_720.jpg",
    location: "Kyiv Region, Ukraine",
  },
  {
    id: "5",
    title: "Dog",
    comments: 5,
    url: "https://cdn.pixabay.com/photo/2022/12/22/02/56/dog-7671355_960_720.jpg",
    location: "Kyiv Region, Ukraine",
  },
];

const PostItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={{ marginBottom: 32 }}>
      <View style={styles.containerImage}>
        <Image
          style={styles.postPhoto}
          source={{ uri: `${item.url}` }}
        />
      </View>
      <View>
        <Text style={styles.postTitle}>{item.title}</Text>
      </View>
      <View style={styles.containerOptionBar}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Comments")}
          >
            <FontAwesome5
              name="comment-alt"
              size={20}
              color="#BDBDBD"
            />
          </TouchableOpacity>
          <Text style={styles.coments}>
            {item.comments}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Feather
            name="map-pin"
            size={20}
            color="#BDBDBD"
            onPress={() => navigation.navigate("Location")}
          />
          <Text style={styles.location}>
            {item.location}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default function PostsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.containerProfile}>
        <View style={styles.containerUserImage}>
          <Image
            style={styles.userPhoto}
            source={require("../../../assets/images/IMG.jpg")}
          />
        </View>
        <View>
          <Text style={styles.userTitle}>
            Natali Romanova
          </Text>
          <Text style={styles.userEmail}>
            email@example.com
          </Text>
        </View>
      </View>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  containerProfile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },
  containerUserImage: {
    marginRight: 8,
  },
  userPhoto: {
    backgroundColor: "#F6F6F6",
    width: 60,
    height: 60,
    borderRadius: 16,
  },
  userTitle: {
    color: "#212121",
    fontWeight: "700",
    fontFamily: "SS_Bold",
    fontSize: 13,
  },
  userEmail: {
    color: "rgba(33, 33, 33, 0.8)",
    fontWeight: "400",
    fontFamily: "SS_Regular",
    fontSize: 11,
  },
  containerImage: {},
  postPhoto: {
    resizeMode: "cover",
    width: "100%",
    height: 240,
    borderRadius: 8,
  },
  postTitle: {
    marginVertical: 8,
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "SS_Medium",
  },
  containerOptionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  coments: {
    color: "#BDBDBD",
    fontWeight: "400",
    fontFamily: "SS_Regular",
    fontSize: 16,
    marginLeft: 6,
  },
  location: {
    fontWeight: "400",
    fontFamily: "SS_Regular",
    fontSize: 16,
    marginLeft: 6,
  },
});
