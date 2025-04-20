// import React from "react";
// import Header from "./Header";

// const Login = () => {
//   return (
//     <div className="relative">
//       <Header />
//       <img src="../public/movie.png" class="h-screen w-screen absolute" />
//       <form>
//         <input type="text" placeholder="Email Address" />
//       </form>
//     </div>
//   );
// };

// export default Login;
import { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";
import { BG_URL, LOGO, USER_AVATAR } from "../utils/constants";
import { BackgroundGradient } from "./ui/background-gradient";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="bg-[url(../public/movie.png)] flex justify-center h-screen">
      <div className="absolute w-screen h-screen bg-radial from-30% to-black"></div>
      <Header />

      <div className="flex items-center">
        <BackgroundGradient
          className="rounded-[22px] p-4 bg-black"
          animate={true}
        >
          <form
            onSubmit={(e) => e.preventDefault()}
            className="w-md opacity-95 bg-black p-8 text-white rounded-md"
          >
            <h1 className="font-bold text-5xl py-4">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>

            {!isSignInForm && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="p-4 my-4 w-full bg-gray-700 rounded-md"
              />
            )}
            <input
              ref={email}
              type="text"
              placeholder="Email Address"
              className="p-4 my-4 w-full bg-gray-700 rounded-md"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="p-4 my-4 w-full bg-gray-700 rounded-md"
            />
            <p className="text-red-500 font-bold text-lg py-2">
              {errorMessage}
            </p>
            <button
              className="p-4 my-6 bg-red-700 w-full rounded-lg"
              onClick={handleButtonClick}
            >
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
              {isSignInForm
                ? "New to FrameFlicks? Sign Up Now"
                : "Already registered? Sign In Now."}
            </p>
          </form>
        </BackgroundGradient>
      </div>
    </div>
    // </div>
  );
};
export default Login;
