import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { Alert } from "react-native";

import { auth } from "../../../src/firebase/config";
import userSlice from "./aytReducer";

const { updateUserProfiles, authStateChange, authSignOut } =
  userSlice.actions;
export const authSignUpUser =
  ({ login, email, password, userAvatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: login,
        photoURL: userAvatar,
      });

      const { uid, displayName, photoURL } =
        auth.currentUser;
      dispatch(
        updateUserProfiles({
          userId: uid,
          login: displayName,
          email: email,
          avatar: photoURL,
        })
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorCode", errorCode);
      console.log("errorMessage", errorMessage);
      if (errorCode === "auth/invalid-email") {
        return Alert.alert("Сheck for correctness email");
      }
      if (errorCode === "auth/weak-password") {
        return Alert.alert(
          "Password should be at least 6 characters"
        );
      }
      if (errorCode === "auth/email-already-in-use") {
        return Alert.alert("This email is already in use");
      }
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      const user = userCredential.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorCode", errorCode);
      console.log("errorMessage", errorMessage);
      if (
        errorCode === "auth/user-not-found" ||
        "auth/wrong-password"
      ) {
        return Alert.alert(
          "Сheck for correctness email/password"
        );
      }
    }
  };

export const authSignOutUser =
  () => async (dispatch, getState) => {
    await signOut(auth);
    dispatch(authSignOut());
  };

export const authStateChangeUser =
  () => async (dispatch, getState) => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const updateProfilesUser = {
            userId: user.uid,
            login: user.displayName,
            email: user.email,
            avatar: user.photoURL,
          };

          dispatch(
            authStateChange({
              stateChange: true,
            })
          );
          dispatch(updateUserProfiles(updateProfilesUser));
        }
      });
    } catch (error) {
      console.log("error.message", error.message);
    }
  };
