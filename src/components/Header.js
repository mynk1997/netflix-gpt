import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO_URL, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const langValue = useSelector((store) => store.config.lang);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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
    return unsubscribe;
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
      <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
        <img className="w-44 mx-auto md:mx-0" alt="logo" src={LOGO_URL}></img>
        {user && (
          <div className="flex p-2 justify-between">
            {showGptSearch && (
              <select
                defaultValue={langValue}
                onChange={handleLanguageChange}
                className="p-2 m-2 bg-gray-900 text-white"
              >
                {SUPPORTED_LANGUAGES.map((lang) => {
                  return (
                    <option key={lang?.identifier} value={lang?.identifier}>
                      {lang?.name}
                    </option>
                  );
                })}
              </select>
            )}
            <button
              onClick={handleGptSearchClick}
              className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
            >
              {showGptSearch ? "Homepage" : "GPT Search"}
            </button>
            <img
              className="hidden md:block w-12 h-12"
              alt="usericon"
              src={user?.photoURL}
            />
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
