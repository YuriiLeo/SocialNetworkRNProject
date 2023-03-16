import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { authStateChangeUser } from "../redux/auth/authOperations";
import useRoute from "../router";

export default function Main() {
  //   const [user, setUser] = useState(null);
  //   console.log("user Change", user);

  const { stateChange } = useSelector(
    (state) => state.auth
  );
  //   console.log("login", login);
  // console.log("state", stateChange);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authStateChangeUser());
  }, []);

  //   onAuthStateChanged(auth, (user) => {
  //     console.log("user uid", user.uid);
  //     setUser(user);
  //   });
  const routing = useRoute(stateChange);
  //   const routing = useRoute({});

  return (
    <NavigationContainer>{routing}</NavigationContainer>
  );
}
