"use client";
import React, { useEffect, useState, useRef } from "react";
import { doc, getDoc, getFirestore } from "@firebase/firestore";
import { useRouter } from "next/navigation";
import CustomPopup from "@/components/CustomPopup";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "@/lib/firebase";
import Link from "next/link";

const Page = () => {
  const router = useRouter();

  const [emailError, setEmailError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!data.email && !data.password) {
      setEmailError("Email and Password is required");
      setVisible(true);
      return;
    }
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;
      const token = user.accessToken;
      const adminDoc = await getDoc(doc(getFirestore(), "users", user.uid));
      const adminData = adminDoc.data();
      if (adminData && adminData.role === "attendee") {
        const userInfo = {
          uid: user.uid,
          email: user.email,
          ...adminData,
        };
        dispatch(setUser(userInfo));
        localStorage.setItem("userData", JSON.stringify(token));
        setLoading(false);

        router.push("/dashboard");
      } else {
        setError("User not found");
        setVisible(true);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Invalid email address format");
        setVisible(true);
      }

      if (error.code === "auth/user-not-found") {
        setError("User not found");
        setVisible(true);
      }

      if (error.code === "auth/wrong-password") {
        setError("Invalid password");
        setVisible(true);
      } else {
        setError("Invalid password");
        setVisible(true);
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-black text-white w-full min-h-screen flex justify-center items-center ">
      <div className="container mx-auto  h-full  ">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="md:w-3/5 valid:w-full px-5 flex flex-col justify-center items-center ">
            <p className="text-3xl text-center text-primary tracking-wider font-bold">
              Welcome to
            </p>
            <h3 className="bg-secondry px-4 py-2 rounded-xl text-black mt-3 text-center font-bold tracking-wider md:text-3xl text-2xl">
              The Wellness Collective
            </h3>
            <p className="mt-3"> Login to join </p>
            <CustomPopup
              message={error}
              visible={visible}
              setVisible={setVisible}
            />
            <div className="  md:w-3/4 w-full mx-auto">
              <form onSubmit={handleLogin} className="p-5 space-y-6">
                {emailError && <div className="text-red-400">{emailError}</div>}
                {passwordError && (
                  <div className="text-red-400">{passwordError}</div>
                )}

                <input
                  type="email"
                  placeholder="Email"
                  value={data.email}
                  onChange={(event) =>
                    setData({ ...data, email: event.target.value })
                  }
                  className="px-4 py-3 border border-gray-700 rounded-xl w-full bg-transparent"
                />
                <div className="realtive">
                  <input
                    type={isShowPassword ? "text" : "password"}
                    placeholder="Password"
                    value={data.password}
                    onChange={(event) =>
                      setData({ ...data, password: event.target.value })
                    }
                    className="px-4 py-3 border border-gray-700 rounded-xl w-full bg-transparent"
                  />
                </div>
         

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-br from-primary via-primary to-secondry hover:bg-gradient-to-br hover:from-secondry hover:via-primary hover:to-primary text-black w-full py-3 rounded-2xl"
                  >
                    {loading ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
              <div className="text-center space-y-2">
                <div className="tracking-wide ">
                  {` Don't have an account ?`}
                  <Link
                    href={"/attendee_register"}
                    className="text-secondry underline ml-2 "
                  >
                    Register Now
                  </Link>
                </div>
                <div>
                  <Link href={"/forget_password"} className="text-secondry underline ">
                    Forgot Password
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
