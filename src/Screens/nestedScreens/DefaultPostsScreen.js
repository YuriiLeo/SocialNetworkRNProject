import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSelector } from "react-redux";

import PostItem from "../../components/PostItem";
import { db } from "../../firebase/config";

export default function DefaultPostsScreen({
  route,
  navigation,
}) {
  const [posts, setPosts] = useState([]);

  const { email, login, avatar } = useSelector(
    (state) => state.auth
  );

  const getAllPost = async () => {
    const postRef = collection(db, "posts");

    onSnapshot(postRef, (data) => {
      setPosts(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerProfile}>
        <View style={styles.containerUserImage}>
          <Image
            style={styles.userPhoto}
            // source={require("../../../assets/images/IMG.jpg")}
            source={{ uri: avatar }}
          />
        </View>
        <View>
          <Text style={styles.userTitle}>{login}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      {posts.length !== 0 ? (
        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <PostItem item={item} navigation={navigation} />
          )}
          // keyExtractor={(item) => item.id}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text
          style={{
            fontSize: 16,
            marginTop: 50,
            textAlign: "center",
            fontWeight: "700",
            fontFamily: "SS_Bold",
          }}
        >
          Make your first post faster
        </Text>
      )}
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
