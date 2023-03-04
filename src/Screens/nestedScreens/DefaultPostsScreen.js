import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

// import { useNavigation } from "@react-navigation/native";

import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

// import PostItem from "../../components/PostItem";

import posts from "../../components/posts.json";

export default function DefaultPostsScreen({ navigation }) {
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
        keyExtractor={(item) => item.id}
        // renderItem={({ item }) => <PostItem item={item} />}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 32 }}>
            <View>
              <Image
                style={styles.postPhoto}
                source={{ uri: `${item.url}` }}
              />
            </View>
            <View>
              <Text style={styles.postTitle}>
                {item.title}
              </Text>
            </View>
            <View style={styles.containerOptionBar}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("Comments")
                  }
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
                  onPress={() =>
                    navigation.navigate("Location")
                  }
                />
                <Text style={styles.location}>
                  {item.location}
                </Text>
              </View>
            </View>
          </View>
        )}
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
});
