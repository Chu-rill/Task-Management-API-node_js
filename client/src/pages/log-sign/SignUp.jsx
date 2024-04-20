import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import SignError from "../../components/ui/SignError";
// import { useNavigate } from "react-router-dom";

function SignUp(props) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  // const navigate = useNavigate();

  // a basic function to check id there an empty input field
  function auth() {
    if (user === "" || pass === "" || email === "") {
      setShowPopover(true); // Show popover if fields are not filled
    } else {
      // Assuming successful authentication (replace with your logic)
      // console.log("Authentication successful!");
      // Navigate to the desired page after successful authentication
      // navigate("/Home");
      // Replace "/home" with your target route
    }
  }

  const closePopover = () => {
    setShowPopover(false);
  };

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
