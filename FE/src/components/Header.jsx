import React, { useEffect } from "react";
import { TypewriterEffect } from "./ui/typewriter-effect";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { LOGO } from "../utils/constants";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {
          uid: uid,
          email: email,
          displayName: displayName,
          photoURL: photoURL,
        } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/");
      } else {
        dispatch(removeUser());
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  const words = [
    {
      text: "Frame ",
      className: "text-6xl",
    },

    {
      text: "Flicks.",
      className: "text-red-500 dark:text-red-500 text-6xl",
    },
  ];
  return (
    <div className="w-full bg-gradient-to-b from-black  p-4 absolute z-10 flex justify-between">
      <div className=" flex items-center">
        <img src={LOGO} className="w-30 rounded-[50%]" alt="" />
        <span className="text-white text-5xl mx-5">
          <TypewriterEffect
            words={words}
            cursorClassName={"bg-white"}
            className={"text-7xl"}
          />
        </span>
      </div>

      {user && (
        <div className="flex p-2 justify-between">
          <img
            className="hidden md:block w-12 h-12"
            alt="usericon"
            src={user?.photoURL}
          />
          <button onClick={handleSignOut} className="font-bold text-white ">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
