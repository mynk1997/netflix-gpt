import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL } from "../utils/constants";

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe= onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    return unsubscribe
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };
  return (
    <div>
      <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img
          className="w-44 mx-auto md:mx-0"
          alt="logo"
          src={LOGO_URL}
        ></img>
        {user && (
          <div className="flex p-2">
            <img className="w-12 h-12 mr-4 rounded-sm" alt="usericon" src={user?.photoURL} />
            <button onClick={handleSignOut} className="font-bold text-white ">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
