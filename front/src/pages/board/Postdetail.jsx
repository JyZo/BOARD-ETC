import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeletePostMutation,
  useFetchPostByIdQuery,
} from "../../redux/API/posts/postsApi";
import { useSelector } from "react-redux";
import dompurify from "dompurify";

const categories = ["자유", "질문", "유머"];

const Postdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: post, isLoading, isError, refetch } = useFetchPostByIdQuery(id);
  const [deletePost] = useDeletePostMutation();
  const user = useSelector((state) => state.user);
  // const [isOwner, setIsOwner] = useState(false);

  // 스크립트를 활용하여 javascript와 HTML로 악성 코드를 웹 브라우저에 심어,
  // 사용자 접속시 그 악성코드가 실행되는 것을 XSS, 보안을 위해 sanitize 추가
  const sanitizer = dompurify.sanitize;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const moveUpdate = () => {
    navigate("/postupdate/" + id);
  };

  const deletePostClick = async (id) => {
    try {
      await deletePost(id).unwrap();
      alert("Post deleted!");
      refetch();
      navigate("/freeboard");
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-12">
      <div className="border-b border-gray-900/10 pb-12">
        <div>
          <span className="block text-2xl font-medium text-gray-900 text-left mt-10">
            {post.category}[{post.title}]
          </span>
        </div>
        <hr className="h-1 bg-blue-400"></hr>
        <div className="flex justify-between mb-3">
          <span className="block text-base font-medium text-gray-900 text-left">
            작성자 : {post.createuser}
          </span>
          <span className="block text-base font-medium text-gray-900 text-left">
            {post.createdAt !== undefined ? (
              new Intl.DateTimeFormat("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }).format(new Date(post.createdAt))
            ) : (
              <div> </div>
            )}
          </span>
        </div>

        <div className="col-span-full">
          <div className="mt-2"></div>
          <div className="sm:col-span-3"></div>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-full">
            <div
              className="min-h-[300px] text-left mt-5"
              dangerouslySetInnerHTML={{ __html: sanitizer(`${post.content}`) }}
            ></div>
          </div>
        </div>
      </div>
      {/* <div>{post.createuser}</div>
      <div>{user._id}</div> */}
      {post.createuser === user._id ? (
        <div className="pt-6 flex items-center justify-end gap-x-2 pb-4">
          <button
            type="button"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            onClick={() => {
              moveUpdate();
            }}
          >
            수정
          </button>
          <button
            type="submit"
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => {
              deletePostClick(post.id);
            }}
          >
            삭제
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Postdetail;
