import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const categories = ["자유", "질문", "유머"];

const Postdetail = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    setPost(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
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
            글 제목 [{post.title}]
          </label>
          <div className="mt-2">
            <input
              id="street-address"
              name="street-address"
              type="text"
              autoComplete="street-address"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6 mb-6"
              value={post.title}
              disabled
            />
          </div>
          <div className="sm:col-span-3"></div>
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
              <textarea
                id="about"
                name="about"
                rows={30}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                value={post.body}
                disabled
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postdetail;
