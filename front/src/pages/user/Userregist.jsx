import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Userregist = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  const navigate = useNavigate();

  const [showPW, setShowPW] = useState(false);
  const [showConfirmPW, setShowConfirmPW] = useState(false);

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
    if (data.password !== data.confirmPassword) {
      alert("password and confirm password must be same");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/userregist",
        data
      );
      alert(response.data.message);

      if (response.status !== 200) {
        alert(response.data.message);
      } else {
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="mt-10 xl:mx-auto xl:w-full xl:max-w-sm">
      <form
        className="space-y-6"
        action="#"
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm/6 font-medium text-gray-900 text-left"
          >
            Name
          </label>
          <div className="mt-2">
            <input
              id="name"
              name="name"
              type="name"
              autoComplete="name"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6 focus:outline-none pl-2"
              {...register("name", { required: true })}
              onChange={handleChange}
            />
          </div>
        </div>
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
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6 focus:outline-none pl-2"
              {...register("email", { required: true })}
              onChange={handleChange}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2 relative">
            <input
              id="password"
              name="password"
              type={showPW ? "text" : "password"}
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6 focus:outline-none pl-2"
              {...register("password", { required: true })}
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
          <div className="flex items-center justify-between">
            <label
              htmlFor="phone"
              className="block text-sm/6 font-medium text-gray-900"
            >
              phone
            </label>
          </div>
          <div className="mt-2">
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="010-1234-1234"
              pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}"
              autoComplete="current-phone"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6 focus:outline-none pl-2"
              {...register("phone", { required: true })}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-2 mb-60">
          <button
            type="submit"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            회원가입
          </button>
          <button
            type="button"
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              navigate("/");
            }}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default Userregist;
