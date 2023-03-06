import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
} from "react-native";
import PostItem from "../../components/PostItem";

export default function ProfileScreen({
  user = "Natali Romanova",
  route,
  navigation,
}) {
  console.log("routeProf", route.params);

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [route.params, ...prevState]);
    }
  }, [route.params]);

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../../assets/images/PhotoBG.jpg")}
          style={styles.image}
        >
          <View style={styles.form}>
            <View>
              <Image
                style={styles.addPhoto}
                // source={require("../../assets/images/IMG.jpg")}
              ></Image>
            </View>
            <Text style={styles.title}>{user}</Text>
            {posts.length !== 0 ? (
              <FlatList
                data={posts}
                renderItem={({ item }) => (
                  <PostItem
                    item={item}
                    navigation={navigation}
                  />
                )}
                // keyExtractor={(item) => item.id}
                keyExtractor={(item, index) =>
                  index.toString()
                }
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
    </TouchableWithoutFeedback>
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
