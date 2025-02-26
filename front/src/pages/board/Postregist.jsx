import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAddPostMutation } from "../../redux/API/posts/postsApi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Wysiwyg from "../../components/Wysiwyg";

const categories = [
  { value: "", label: "선택해주세요" },
  { value: "자유", label: "자유" },
  { value: "질문", label: "질문" },
  { value: "유머", label: "유머" },
];

const Postregist = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    setValue,
  } = useForm();
  const [addPost, { isLoading, isError }] = useAddPostMutation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [content, setContent] = useState(" ");

  // useEffect(() => {
  //   setValue("content", content);
  // }, [content]);

  const onSubmit = async (data) => {
    console.log(data);
    // console.log(getValues("content"));
    const newPost = {
      ...data,
      createuser: user._id,
      content: content,
    };
    try {
      await addPost(newPost).unwrap();
      alert("post regiest success");
      setContent("");
      navigate("/freeboard", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 font-size mt-6 mb-10">
            자유게시판 글 작성
          </h2>

          <div className="col-span-full">
            <label
              htmlFor="street-address"
              className="block font-medium text-gray-900 text-2xl text-left"
            >
              글 제목
            </label>
            <div className="mt-2">
              <input
                id="street-address"
                name="street-address"
                type="text"
                autoComplete="street-address"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 mb-6 pl-2 focus:outline-none"
                {...register("title", { required: true })}
              />
              {errors.title && <p>{errors.title.message}</p>}
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block font-medium text-gray-900 text-2xl text-left "
              >
                카테고리
              </label>
              <div className="mt-2">
                <select
                  {...register("category", { required: true })}
                  id="category"
                  name="category"
                  autoComplete="category-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6 pl-2 focus:outline-none"
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-2xl font-medium text-gray-900 text-left"
              >
                내용
              </label>
              {/* <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={20}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 focus:outline-none pl-2"
                  defaultValue={""}
                  {...register("content", { required: true })}
                />
              </div> */}
              <Wysiwyg
                htmlContent={content}
                setContentHandler={setContent}
                // {...register("content", { required: true })}
              />
              {/* {errors.title && <p>{errors.title.message}</p>} */}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-2 mb-60">
          <button
            type="button"
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            onClick={() => {
              navigate("/freeboard");
            }}
          >
            취소
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            작성
          </button>
        </div>
      </div>
    </form>
  );
};

export default Postregist;
