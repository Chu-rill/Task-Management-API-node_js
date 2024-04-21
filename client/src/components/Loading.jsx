import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50 ">
      <div className=""></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
