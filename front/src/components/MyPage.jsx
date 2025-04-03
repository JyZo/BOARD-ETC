import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Axios from "../utils/Axios";
import { useForm } from "react-hook-form";
import { logout } from "../redux/API/user/userSlice";
import useLogOut from "../utils/useLogOut";

const MyPage = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
    newpassword: user.newpassword,
    newpasswordconfirm: user.newpasswordconfirm,
    phone: user.phone,
    role: user.role,
  });

  const dispatch = useDispatch();
  const { logoutUser } = useLogOut();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm(
    {
      defaultValues: {
        name: user.name,
        email: user.email,
        password: "",
        newpassword: "",
        newpasswordconfirm: "",
        phone: user.phone,
        role: "",
      },
    },
    {
      mode: "onChange",
    }
  );

  const navigate = useNavigate();

  const [showPW, setShowPW] = useState(false);
  const [showNewPW, setNewConfirmPW] = useState(false);
  const [showConfirmPW, setShowConfirmPW] = useState(false);

  const { phone } = userData;

  useEffect(() => {
    setUserData({
      name: user.name,
      email: user.email,
      password: user.password,
      newpassword: user.newpassword,
      newpasswordconfirm: user.newpasswordconfirm,
      phone: user.phone,
      role: user.role,
    });
  }, [user]);

  useEffect(() => {
    if (phone.length === 11) {
      setUserData((preve) => {
        return {
          ...preve,
          phone: phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
        };
      });
    } else if (phone.length === 13) {
      setUserData((preve) => {
        return {
          ...preve,
          phone: phone
            .replace(/-/g, "")
            .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
        };
      });
    }
  }, [phone]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const onSubmit = async () => {
    if (userData.newpassword !== userData.newpasswordconfirm) {
      alert("new password and new confirm password must be same");
      return;
    }

    try {
      const response = await Axios({
        url: "/api/user/userupdate",
        method: "put",
        data: userData,
      });

      alert(response.data.message);

      if (response.status !== 200) {
        alert(response.data.message);
      } else {
        setUserData({
          name: "",
          email: "",
          password: "",
          newpassword: "",
          newpasswordconfirm: "",
          phone: "",
        });
        logoutUser();
        dispatch(logout());
        alert("Logout success retry login");
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
              type="text"
              autoComplete="name"
              value={userData.name}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6 focus:outline-none pl-2"
              {...register("name", {
                onChange: (e) => {},
              })}
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
              value={userData.email}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6 focus:outline-none pl-2"
              {...register("email", {
                disabled: true,
              })}
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
              {...register("password", { required: true, onChange: (e) => {} })}
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
              htmlFor="newpassword"
              className="block text-sm/6 font-medium text-gray-900"
            >
              New Password
            </label>
          </div>
          <div className="mt-2 relative">
            <input
              id="newpassword"
              name="newpassword"
              type={showNewPW ? "text" : "password"}
              autoComplete="current-newpassword"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6 focus:outline-none pl-2"
              {...register("newpassword", {
                required: true,
                onChange: (e) => {},
              })}
              onChange={handleChange}
            />
            <div
              onClick={() => setNewConfirmPW((preve) => !preve)}
              className="w-6 h-6 absolute right-1 top-2.5 text-gray-900"
            >
              {showNewPW ? <AiFillEye /> : <AiFillEyeInvisible />}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="newpasswordconfirm"
              className="block text-sm/6 font-medium text-gray-900"
            >
              New Password confirm
            </label>
          </div>
          <div className="mt-2 relative">
            <input
              id="newpasswordconfirm"
              name="newpasswordconfirm"
              type={showConfirmPW ? "text" : "password"}
              autoComplete="current-newpasswordconfirm"
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6 focus:outline-none pl-2"
              {...register("newpasswordconfirm", {
                required: true,
                onChange: (e) => {},
              })}
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
              type="text"
              placeholder="010-XXXX-XXXX"
              autoComplete="current-phone"
              maxLength={13}
              required
              value={userData.phone}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6 focus:outline-none pl-2"
              {...register("phone", { onChange: (e) => {} })}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-2 mb-60">
          <button
            type="submit"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            내 정보 수정
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

export default MyPage;
