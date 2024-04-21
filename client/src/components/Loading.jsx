import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-700 bg-opacity-50 z-50 ">
      <div className="border-4 border-gray-300 border-solid border-t-0 border-l-0 border-b-0 rounded-full w-12 h-12 animate-spin"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
