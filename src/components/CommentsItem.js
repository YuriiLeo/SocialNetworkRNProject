import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import dummyAvatar from "../../assets/hansel.png";

export default function CommentsItem({ item }) {
  // const getData = () => {
  //   const date = new Date(item.createdAt?.seconds * 1000);
  //   console.log("date", date);

  //   const options = {
  //     day: "numeric",
  //     year: "numeric",
  //     month: "long",
  //     hour: "numeric",
  //     minute: "numeric",
  //     hour12: false,
  //   };
  //   const dateFormatter = new Intl.DateTimeFormat(
  //     "en-us",
  //     options
  //   );
  //   const currentData = dateFormatter.format(date);
  //   console.log("currentData", currentData);
  //   return currentData;
  // };
  const formatedDate = new Date(
    item.createdAt?.seconds * 1000
  ).toLocaleString();

  // const formatedDate = getData();
  // console.log("item", item);
  return (
    <View style={styles.itemComments}>
      <View style={styles.imageWrap}>
        <Image
          style={styles.imageAvatar}
          source={
            item.avatar ? { uri: item.avatar } : dummyAvatar
          }
        />
      </View>

      <View style={styles.textCommentsWrap}>
        <Text style={styles.text}>{item.comment}</Text>
        <Text style={styles.title}>{formatedDate}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
