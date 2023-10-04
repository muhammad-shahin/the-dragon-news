import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.config";
import PropTypes from "prop-types";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Swal from "sweetalert2";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // email & password sign up
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // login function
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // sign in with google
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  // sign in with github
  const signInWithGithub = () => {
    return signInWithPopup(auth, githubProvider);
  };

  // sign out function
  const logoutUser = () => {
    return signOut(auth)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Logout",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Failed To Logout. Please Try Again. ${error.message}`,
          showConfirmButton: false,
          timer: 3500,
        });
      });
  };

  // onAuth state change
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // toggle profile on mouseover
  const [showProfile, setShowProfile] = useState(false);

  const authInfo = {
    createUser,
    loginUser,
    signInWithGoogle,
    user,
    logoutUser,
    signInWithGithub,
    showProfile,
    setShowProfile,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthProvider;
