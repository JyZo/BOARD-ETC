import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  useFetchPostByIdQuery,
  useUpdatePostMutation,
} from "../../redux/API/posts/postsApi";
import axios from "axios";
import Wysiwyg from "../../components/Wysiwyg";

const categories = [
  { value: "", label: "선택해주세요" },
  { value: "자유", label: "자유" },
  { value: "질문", label: "질문" },
  { value: "유머", label: "유머" },
];

const Postupdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: post, isLoading, isError, refetch } = useFetchPostByIdQuery(id);
  const [updatePost] = useUpdatePostMutation();
  const [content, setContent] = useState(post);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (post) {
      window.scrollTo(0, 0);
      setValue("id", post.id);
      setValue("title", post.title);
      setValue("content", post.content);
      setValue("category", post.category);
    }
  }, [post, setValue]);

  const onSubmit = async (data) => {
    const updatePostData = {
      id: Number(data.id),
      title: data.title,
      category: data.category,
      content: data.content,
      createuser: "haha",
    };

    try {
      await axios.put(
        `http://localhost:5000/api/post/update-post/${id}`,
        updatePostData
      );
      alert("update fin");
      navigate("/postdetail/" + id);
    } catch (error) {
      console.log(error);
    }
    await refetch();
  };

  if (isLoading) return <div>Loading...</div>;
  console.log(errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 font-size mt-6 mb-10">
              자유게시판 글 수정
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 mb-6 pl-2 focus:outline-none pl-2"
                  {...register("title", { required: "This is required." })}
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
                    {...register("category", {
                      required: true,
                      onChange: (e) => {},
                    })}
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
                <div className="mt-2">
                  {/* <textarea
                    id="about"
                    name="about"
                    rows={20}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 focus:outline-none pl-2"
                    {...register("content", {
                      required: true,
                      onChange: (e) => {},
                    })}
                  /> */}
                  <Wysiwyg
                    htmlContent={content}
                    setContentHandler={setContent}
                    // {...register("content", { required: true })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-2 mb-60">
            <button
              type="submit"
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              수정
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Postupdate;
