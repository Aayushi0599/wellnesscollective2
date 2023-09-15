"use client";
import Link from "next/link";
import React, { useState } from "react";
import CustomPopup from "@/components/CustomPopup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, setDoc } from "@firebase/firestore";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    foodValue: "",
    housingValue: "",
    displayName: "",
    role: "attendee",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const { email, password, foodValue, housingValue, displayName } = data;
  const handleFoodChange = (event) => {
    setData((prevState) => ({ ...prevState, foodValue: event.target.value }));
  };

  const handlehousingChange = (event) => {
    setData((prevState) => ({
      ...prevState,
      housingValue: event.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
        data.role,
        data.name,
        data.foodValue,
        data.housingValue,
      );
      const user = userCredential.user;

      const userData = {
        displayName: data.displayName,
        email: data.email,
        role: data.role,
        name: data.name,
        foodValue: data.foodValue,
        housingValue: data.housingValue,
      };
    
      const firestore = getFirestore();
      await setDoc(doc(firestore, "users", user.uid), userData);

      if (foodValue === "no" || housingValue === "no") {
        window.open(
          "https://www.selfcarehouseke  eping.com/join-the-team",
          "_blank"
        );
        router.push("/attendee");
      } else {
        router.push("/attendee_login");
      }
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-in-use") {
        setMessage("User already exist");
      } else if (error.code === "auth/weak-password") {
        setMessage("Password must be 6 letter");
      } else {
        setMessage("Please fill correct details");
      }
      setLoading(false);
      setVisible(true);
    }
  };

  // Redirect user to home page if they are already logged in

  return (
    <div className="bg-black text-white">
      <div className="container mx-auto py-12 min-h-screen ">
        <div className="flex justify-center items-center">
          <div className="md:w-3/5 w-full px-5 flex flex-col justify-center items-center ">
            <p className="text-3xl text-center text-primary tracking-wider font-bold">
              Create Account and Attand Events
            </p>
            <CustomPopup
              message={message}
              visible={visible}
              setVisible={setVisible}
            />
            <div className=" mt-2 md:w-3/4 w-full mx-auto">
              <form onSubmit={handleRegister} className="p-5 space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    id="displayName"
                    value={displayName}
                    onChange={(e) =>
                      setData((prevState) => ({
                        ...prevState,
                        displayName: e.target.value,
                      }))
                    }
                    className="px-4 py-3 border border-gray-700 rounded-xl w-full bg-transparent"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                      setData((prevState) => ({
                        ...prevState,
                        email: e.target.value,
                      }))
                    }
                    required
                    className="px-4 py-3 border border-gray-700 rounded-xl w-full bg-transparent"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) =>
                      setData((prevState) => ({
                        ...prevState,
                        password: e.target.value,
                      }))
                    }
                    required
                    className="px-4 py-3 border border-gray-700 rounded-xl w-full bg-transparent"
                  />
                </div>
                <div className="flex flex-col text-gray-400 ">
                  <label htmlFor="food" className=" mb-2">
                    You have Enough Food
                  </label>
                  <select
                    name="food"
                    id="food"
                    value={foodValue}
                    onChange={handleFoodChange}
                    className="px-3 py-3 bg-transparent border border-gray-700 rounded-xl "
                  >
                    <option value="">--Select an option--</option>
                    <option value="yes" className="text-black">
                      Yes
                    </option>
                    <option value="no" className="text-black">
                      No
                    </option>
                  </select>
                </div>
                <div className="flex flex-col text-gray-400 ">
                  <label htmlFor="housing" className=" mb-2">
                    Housing
                  </label>
                  <select
                    name="housing"
                    id="housing"
                    value={housingValue}
                    onChange={handlehousingChange}
                    className="px-3 py-3 bg-transparent border border-gray-700 rounded-xl "
                  >
                    <option value="">--Select an option--</option>
                    <option value="yes" className="text-black">
                      Yes
                    </option>
                    <option value="no" className="text-black">
                      No
                    </option>
                  </select>
                </div>

                <div className="flex flex-col items-center">
                  <button
                    type="submit"
                    className="bg-gradient-to-br from-primary via-primary to-secondry hover:bg-gradient-to-br hover:from-secondry hover:via-primary hover:to-primary text-black w-full py-3 rounded-2xl"
                  >
                    {loading ? "Sign Up..." : "Sign Up"}
                  </button>
                </div>
              </form>
              <div className="text-center space-y-2">
                <div className="tracking-wide ">
                  Already have an account ?
                  <Link
                    href={"/attendee_login"}
                    className="text-secondry underline ml-2 "
                  >
                    Login
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
