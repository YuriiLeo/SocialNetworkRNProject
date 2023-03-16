import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { auth } from "../../../src/firebase/config";
import userSlice from "./aytReducer";

const { updateUserProfiles, authStateChange, authSignOut } =
  userSlice.actions;
export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = await auth.currentUser;
      await updateProfile(user, {
        displayName: login,
      });

      const { uid, displayName } = await auth.currentUser;

      dispatch(
        updateUserProfiles({
          userId: uid,
          login: displayName,
          email: email,
        })
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorCode", errorCode);
      console.log("errorMessage", errorMessage);
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
