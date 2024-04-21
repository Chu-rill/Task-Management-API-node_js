import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import SignError from "../../components/ui/SignError";
import Loading from "../../components/Loading";

function SignUp(props) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const [loading, setLoading] = useState(false); // Initialize loading state
  const [success, setSuccess] = useState(false); // Initialize success state

  async function auth() {
    if (user === "" || pass === "" || email === "") {
      setShowPopover(true);
    } else {
      setLoading(true); // Start loading
      try {
        const response = await fetch(
          `http://localhost:3000/auth/registerUser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: user,
              password: pass,
              email: email,
            }),
          }
        );
        const res = await response.json();
        if (!response.ok) {
          throw new Error(res.message);
        }
        setUser("");
        setPass("");
        setEmail("");
        setSuccess(true); // Set success state to true
        console.log(res);
        alert("User Created");
      } catch (error) {
        console.error("Error signing up:", error);
        setShowPopover(true);
      } finally {
        setLoading(false); // Stop loading
      }
    }
  }

  const closePopover = () => {
    setShowPopover(false);
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 2000); // Show success message for 2 seconds
    }
  }, [success]);

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-y-auto">
      <div className=" bg-blue-300 dark:bg-gray-800 rounded-lg shadow-md p-8 max-w-sm w-full">
        <h2 className="text-2xl mb-4 font-semibold text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Username"
          className="w-full rounded-md px-4 py-2 mb-4 dark:bg-gray-200 dark:text-gray-800 focus:outline-none focus:ring focus:border-purple-600"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded-md px-4 py-2 mb-4 dark:bg-gray-200 dark:text-gray-800 focus:outline-none focus:ring focus:border-purple-600"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <input
          type="text"
          placeholder="E-mail"
          className="w-full rounded-md px-3 py-2 mb-4 dark:bg-gray-200 dark:text-gray-800 focus:outline-none focus:ring focus:border-purple-600"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-300"
          onClick={auth}
        >
          Sign Up
        </Button>
        <SignError isOpen={showPopover} onClose={closePopover} />
        {loading && (
          // <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
          //   <div className="text-white">Loading...</div>

          // </div>
          <div>
            <Loading />
          </div>
        )}
        {success && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-green-500 bg-opacity-50 z-50">
            <div className="text-white">Sign up successful!</div>
          </div>
        )}
        <div className="flex justify-center mt-2">
          <p className="text-sm">
            Already have an account?{" "}
            <span
              className="text-purple-600 cursor-pointer"
              onClick={() => props.setLogin((prevLogin) => !prevLogin)}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
