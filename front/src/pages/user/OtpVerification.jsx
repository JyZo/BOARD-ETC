import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Axios from "../../utils/Axios";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef([]);

  const [data, setData] = useState(["", "", "", "", "", ""]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm();

  const onSubmit = async () => {
    try {
      const response = await Axios({
        url: "/api/user/verifyotp",
        method: "put",
        data: {
          otp: data.join(""),
          email: location?.state?.email,
        },
      });

      if (response.status !== 200) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/resetpassword", {
          state: {
            data: response.data,
            email: location?.state?.email,
          },
        });
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
          Enter in your OTP
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
              htmlFor="otp"
              className="block text-sm/6 font-medium text-gray-900 text-left"
            >
              O T P :
            </label>
            <div className="flex items-center gap-2 justify-between mt-3">
              {data.map((element, index) => {
                return (
                  <input
                    key={"otp" + index}
                    type="text"
                    id="otp"
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    value={data[index]}
                    onChange={(e) => {
                      const value = e.target.value;
                      console.log("value", value);

                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (index < 5) {
                        console.log(index);
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    maxLength={1}
                    className="bg-blue-50 w-full max-w-16 p-2 border rounded outline-none focus:border-primary-200 text-center font-semibold"
                  />
                );
              })}
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

export default OtpVerification;
