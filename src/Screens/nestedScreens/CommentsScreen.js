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
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { AntDesign } from "@expo/vector-icons";
import CommentsItem from "../../components/CommentsItem";
// import dummyAvatar from "../../../assets/hansel.png";

export default function CommentsScreen({
  route,
  navigation,
}) {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyBoard, setIsShowKeyBoard] =
    useState(false);

  const { photo, postId } = route.params;
  const { login, avatar = "" } = useSelector(
    (state) => state.auth
  );

  const createPostComment = async () => {
    // console.log("comment", comment);
    try {
      const postRef = collection(db, "posts");
      await addDoc(
        collection(postRef, postId, "comments"),
        {
          comment,
          login,
          avatar,
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

  // console.log("allComments", allComments);

  useEffect(() => {
    // console.log("useEf");
    getAllPostDB();
  }, []);

  const SubmitComment = () => {
    createPostComment();
    setComment("");
    keyboardHide();
  };

  const keyboardHide = () => {
    setIsShowKeyBoard(false);
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={
        Platform.OS === "ios" ? "padding" : "height"
      }
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
    >
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <View
          style={{
            ...styles.container,
            justifyContent: isShowKeyBoard
              ? "center"
              : "space-between",
            marginBottom: isShowKeyBoard ? 40 : 0,
          }}
        >
          {/* <View
            style={{
              backgroundColo: "#FFF",
              justifyContent: "flex-end",
            }}
          > */}
          <View style={styles.takePhotoContainer}>
            <Image
              source={{ uri: photo }}
              style={{
                width: 380,
                // Dimensions.get("window").width - 32,
                height: isShowKeyBoard ? 0 : 240,
                borderRadius: 8,
              }}
            />
          </View>

          {allComments.length !== 0 ? (
            <View
              style={{
                height: isShowKeyBoard ? 270 : 270,
                // backgroundColor: "tomato",

                // height: "auto",
                // height: isShowKeyBoard
                //   ? Dimensions.get("window").height - 780
                //   : Dimensions.get("window").height - 580,
                // marginBottom: 20,
              }}
            >
              <FlatList
                data={allComments}
                renderItem={({ item }) => (
                  <CommentsItem item={item} />
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
              onFocus={() => setIsShowKeyBoard(true)}
              onBlur={() => setIsShowKeyBoard(false)}
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
        {/* </View> */}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
  },
  takePhotoContainer: {
    marginTop: 32,
    marginBottom: 32,
  },
  commentPublishContainer: {
    marginBottom: 16,
    position: "relative",
    justifyContent: "center",
  },
  input: {
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
});
