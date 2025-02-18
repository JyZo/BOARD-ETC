import React from "react";
import { useSelector } from "react-redux";
import Login from "./Login";

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  console.log("private user", user);

  return (
    <>
      {user._id ? (
        children
      ) : (
        <div>
          <p className="text-red-600 bg-red-100 p-4">
            Do not have permission Please Login
          </p>
          <Login></Login>
        </div>
      )}
    </>
  );
};

export default PrivateRoute;
