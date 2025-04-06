import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import axios from "axios";
import Axios from "../../utils/Axios";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  const [showPW, setShowPW] = useState(false);
  const [showConfirmPW, setShowConfirmPW] = useState(false);

  useEffect(() => {
    if (location.state.data.message != "OTP verified!!") {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((preve) => {
        return {
          ...preve,
          email: location?.state?.email,
        };
      });
    }
  }, []);
  console.log(data);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  console.log("data reset password", data);

  const onSubmit = async () => {
    if (data.newPassword !== data.confirmPassword) {
      alert("New password and confirm password must be same.");
      return;
    }

    try {
      const response = await Axios({
        url: "/api/user/resetpassword",
        method: "put",
        data: data,
      });

      if (response.status !== 200) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Enter in to your New password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          className="space-y-6"
          action="#"
          method="POST"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="newPassword"
                className="block text-sm/6 font-medium text-gray-900"
              >
                newPassword
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="newPassword"
                name="newPassword"
                type={showPW ? "text" : "password"}
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6 focus:outline-none pl-2"
                {...register("newPassword", { required: true })}
                onChange={handleChange}
              />
              <div
                onClick={() => setShowPW((preve) => !preve)}
                className="w-6 h-6 absolute right-1 top-2.5 text-gray-900"
              >
                {showPW ? <AiFillEye /> : <AiFillEyeInvisible />}
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="confirmPassword"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password confirm
              </label>
            </div>
            <div className="mt-2 relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPW ? "text" : "password"}
                autoComplete="current-confirmPassword"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6 focus:outline-none pl-2"
                {...register("confirmPassword", { required: true })}
                onChange={handleChange}
              />
              <div
                onClick={() => setShowConfirmPW((preve) => !preve)}
                className="w-6 h-6 absolute right-1 top-2.5 text-gray-900"
              >
                {showConfirmPW ? <AiFillEye /> : <AiFillEyeInvisible />}
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 "
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
