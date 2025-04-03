import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Axios from "../utils/Axios";
import fetchUserDetail from "../utils/fetchUserDetail";
import { setUserDetails } from "../redux/API/user/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [showPW, setShowPW] = useState(false);

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
    console.log(data);

    try {
      const response = await Axios({
        url: "/api/user/login",
        method: "post",
        data: data,
      });
      //다른 방식 axios 사용법 메모
      // await Axios.post("/api/user/login", {
      //   ...data,
      // })
      //   .then(function (response) {
      //     console.log(response);
      //   })
      //   .catch(function (error) {
      //     console.log(error.response.data.message);
      // });

      // async/await을 사용하면 await가 대기를 처리해주기 때문에 .then이 거의 필요하지 않습니다.
      // 여기에 더하여 .catch 대신 일반 try..catch를 사용할 수 있다는 장점도 생깁니다.
      // 항상 그러한 것은 아니지만, promise.then을 사용하는 것보다 async/await를 사용하는 것이 대개는 더 편리합니다.
      // 그런데 문법 제약 때문에 async함수 바깥의 최상위 레벨 코드에선 await를 사용할 수 없습니다.
      // 그렇기 때문에 관행처럼 .then/catch를 추가해 최종 결과나 처리되지 못한 에러를 다룹니다.

      alert(response.data.message);

      if (response.status !== 200) {
        alert(response.data.message);
      } else {
        console.log(response);

        localStorage.setItem("accesstoken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);

        const userDetails = await fetchUserDetail();
        dispatch(setUserDetails(userDetails.data));

        setData({
          email: "",
          password: "",
        });
        // navigate("/");
        navigate(-1);
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
          src="https://imgup-bucket.s3.ap-northeast-2.amazonaws.com/upload/loginlogo.svg"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
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
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to={"/forgotpassword"}
                  className="font-semibold text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPW ? "text" : "password"}
                // autoComplete="current-password"
                required
                className="left-1 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 focus:outline-none sm:text-sm/6 pl-2"
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
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 "
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Not a member?
          <Link
            to={"/userregist"}
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Sign Up!
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
