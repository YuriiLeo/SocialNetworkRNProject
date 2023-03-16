import React, { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  FlatList,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { AntDesign } from "@expo/vector-icons";

const Item = ({ item }) => {
  const getData = () => {
    const date = new Date(item.createdAt?.seconds * 1000);
    const options = {
      day: "numeric",
      year: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    const dateFormatter = new Intl.DateTimeFormat(
      "en-us",
      options
    );
    const currentData = dateFormatter.format(date);

    return currentData;
  };

  const currentCommentData = getData();

  return (
    <View style={styles.itemComments}>
      <View style={styles.imageWrap}>
        <Image
          style={styles.imageAvatar}
          // source={
          //   item.avatar { uri: item.avatar }
          // }
        />
      </View>

      <View style={styles.textCommentsWrap}>
        <Text style={styles.text}>{item.comment}</Text>
        <Text style={styles.title}>
          {currentCommentData}
        </Text>
      </View>
    </View>
  );
};
export default function CommentsScreen({
  route,
  navigation,
}) {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const { photo, postId } = route.params;
  const { login } = useSelector((state) => state.auth);

  const createPost = async () => {
    try {
      const postRef = collection(db, "posts");
      await addDoc(
        collection(postRef, postId, "comments"),
        {
          comment,
          login,
          createdAt: serverTimestamp(),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPostDB = async () => {
    const postRef = collection(db, "posts");
    onSnapshot(
      collection(postRef, postId, "comments"),
      (data) => {
        setAllComments(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      }
    );
  };

  useEffect(() => {
    getAllPostDB();
  }, []);

  const SubmitComment = () => {
    createPost();
    setComment("");
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColo: "#FFF",
          justifyContent: "flex-end",
        }}
      >
        <View style={styles.takePhotoContainer}>
          <Image
            source={{ uri: photo }}
            style={{
              width: 380,
              // Dimensions.get("window").width - 32,
              height: 240,
              borderRadius: 8,
            }}
          />
        </View>

        {allComments.length !== 0 ? (
          <View
            style={{
              height: 270,
              marginBottom: 20,
            }}
          >
            <FlatList
              data={allComments}
              renderItem={({ item }) => (
                <Item item={item} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
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
            Not comments
          </Text>
        )}
        <View style={styles.commentPublishContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Comment..."}
            // onFocus={() => setIsShowKeyBoard(true)}
            value={comment}
            onChangeText={(value) => setComment(value)}
          />
          <TouchableOpacity
            onPress={SubmitComment}
            style={styles.publishBtn}
          >
            <AntDesign
              name="arrowup"
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  takePhotoContainer: {
    // position: "absolute",
    // borderColor: "#fff",
    // borderWidth: 1,
    // height: "100%",
    // width: "100%",
    // marginVertical: 32,
    marginTop: 32,
    marginBottom: 32,
  },
  commentPublishContainer: {
    // justifyContent: "center",
    // alignItems: "center",
    position: "relative",
    justifyContent: "center",
  },
  input: {
    // bottom: 16,
    // right: 16,
    marginTop: 16,
    paddingLeft: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 100,
    height: 50,
    fontFamily: "SS_Regular",
    color: "#BDBDBD",
    backgroundColo: "#F6F6F6",
    fontSize: 16,
  },
  publishBtn: {
    position: "absolute",
    right: 8,
    bottom: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6C00",
    height: 34,
    width: 34,
    borderRadius: 100,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    // justifyContent: "flex-end",
    // alignItems: "flex-end",
    textAlign: "right",
    fontSize: 10,
    color: "#BDBDBD",
    fontFamily: "SS_Regular",
  },
  itemComments: {
    flexDirection: "row",
    marginBottom: 32,
  },
  imageWrap: {
    marginRight: 16,
  },
  imageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#BDBDBD",
    backgroundColor: "grey",
  },
  textCommentsWrap: {
    padding: 16,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
  text: {
    marginBottom: 8,
    width: 267,
    fontFamily: "SS_Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
  },
});
