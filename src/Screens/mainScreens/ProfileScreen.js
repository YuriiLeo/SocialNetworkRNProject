import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { useDispatch, useSelector } from "react-redux";
import PostItem from "../../components/PostItem";
import { db } from "../../firebase/config";
import { authSignOutUser } from "../../redux/auth/authOperations";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import dummyAvatar from "../../../assets/hansel.png";

export default function ProfileScreen({
  route,
  navigation,
}) {
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState("");

  const { login, userId, avatar } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(authSignOutUser());
  };

  const getUserPosts = async () => {
    const q = query(
      collection(db, "posts"),
      where("userId", "==", userId)
    );
    onSnapshot(q, (data) => {
      setPosts(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  const deleteAvatarImage = () => setImage(null);

  const handlePickAvatarImage = () => {
    if (image) {
      return deleteAvatarImage();
    }
    pickAvatarImage();
  };

  const pickAvatarImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/PhotoBG.jpg")}
        style={styles.image}
      >
        <View style={styles.form}>
          <View>
            <Image
              style={styles.addPhoto}
              source={
                !avatar ? dummyAvatar : { uri: avatar }
              }
            />
            <TouchableOpacity
              onPress={handlePickAvatarImage}
              style={{
                width: 25,
                height: 25,
                borderRadius: 100,
                backgroundColor: "#FFFFFF",
                position: "absolute",
                top: 22,
                right: 115,
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: !avatar
                  ? "#FF6C00"
                  : "#BDBDBD",
                // transform: avatar
                //   ? [{ rotate: "45deg" }]
                //   : [{ rotate: "0deg" }],
              }}
            >
              {!avatar ? (
                <AntDesign
                  name="plus"
                  size={15}
                  color="#FF6C00"
                />
              ) : (
                <AntDesign
                  name="close"
                  size={15}
                  color="#BDBDBD"
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.signOut}
            >
              <Feather
                name="log-out"
                size={24}
                color="#BDBDBD"
                onPress={signOut}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>{login}</Text>
          {posts.length !== 0 ? (
            <FlatList
              data={posts}
              renderItem={({ item }) => (
                <PostItem
                  item={item}
                  navigation={navigation}
                  route={route}
                />
              )}
              keyExtractor={(item) => item.id}
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
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  image: {
    flex: 4,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  form: {
    justifyContent: "flex-start",
    flex: 1,
    marginTop: 147,
    position: "relative",
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  addPhoto: {
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -60,
    right: 128,
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  signOut: {
    position: "absolute",
    right: 0,
    top: 22,
  },
  title: {
    marginBottom: 33,
    marginTop: 92,
    fontSize: 30,
    fontWeight: "500",
    fontFamily: "SS_Medium",
    color: "#212121",
    textAlign: "center",
  },
});
