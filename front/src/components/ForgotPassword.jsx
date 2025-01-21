import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const onSubmit = async () => {
    try {
      const response = await axios.put(
        "http://localhost:5000/api/user/forgotpassword",
        data
      );

      if (response.status !== 200) {
        alert(response.data.message);
      } else {
        setData({
          email: "",
        });
        navigate("/verifyotp");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=blue&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Enter in to your Email address
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
            <label
              htmlFor="email"
              className="block text-sm/6 font-medium text-gray-900 text-left"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm/6 pl-2"
                {...register("email", { required: true })}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 "
            >
              Send OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
