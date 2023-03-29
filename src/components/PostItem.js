import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
  collection,
  getCountFromServer,
} from "firebase/firestore";
import { db } from "../firebase/config";

export default function PostItem({
  item,
  navigation,
  route,
}) {
  const [count, setCount] = useState(0);

  const {
    photo,
    title,
    coments = 0,
    locality,
    location,
    id,
  } = item;

  // console.log("route", route.name);

  useEffect(() => {
    (async () => {
      try {
        const collect = collection(
          db,
          `posts/${item.id}/comments`
        );
        const snapshot = await getCountFromServer(collect);
        setCount(snapshot.data().count);
      } catch (error) {}
    })();
  }, []);
  // console.log("count", count);

  // console.log("navigation", navigation);

  return (
    <View style={{ marginBottom: 32 }}>
      <View>
        <Image
          style={styles.postPhoto}
          source={{ uri: `${photo}` }}
        />
      </View>
      <View>
        <Text style={styles.postTitle}>{title}</Text>
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
              navigation.navigate("Comments", {
                photo,
                postId: id,
              })
            }
          >
            <FontAwesome5
              name="comment-alt"
              size={20}
              color="#BDBDBD"
            />
          </TouchableOpacity>
          <Text style={styles.coments}>{count}</Text>
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
              navigation.navigate("Location", {
                ...location,
                title,
              })
            }
          />
          <Text style={styles.location}>{locality}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postPhoto: {
    resizeMode: "cover",
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
