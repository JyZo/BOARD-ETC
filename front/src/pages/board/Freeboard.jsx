import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useFetchAllPostsQuery } from "../../redux/API/posts/postsApi";
import Axios from "../../utils/Axios";
import fetchUserDetail from "../../utils/fetchUserDetail";

const Freeboard = () => {
  const { data: posts = [], refetch } = useFetchAllPostsQuery({
    pollingInterval: 2000,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const categories = ["전체", "자유", "질문", "유머"];

  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filteredPosts =
    selectedCategory === "전체"
      ? posts
      : posts.filter(
          (post) => post.category === selectedCategory.toLowerCase()
        );

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  let currentPosts = 0;
  currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredPosts.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const incViewCnt = async (id) => {
    try {
      const response = await Axios({
        url: `api/post/update-viewcnt/${id}`,
        method: "put",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  useEffect(() => {
    refetch();
  }, [incViewCnt]);

  if (loading) return <div>Loading....</div>;
  return (
    <div>
      <div className="mt-6 text-left font-semibold flex justify-between">
        <span>자유 게시판</span>
        <Link to="/postregist">
          <button>글작성</button>
        </Link>
      </div>
      <div>
        <div className="mb-8 flex items-center">
          <select
            onChange={(e) => setSelectedCategory(e.target.value)}
            name="category"
            id="category"
            className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <hr className="h-1 my-10 bg-blue-400"></hr>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 table-auto">
        <thead className="text-xs text-black uppercase bg-blue-400 border-black dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">번호</th>
            <th className="px-6 py-3">카테고리</th>
            <th className="px-6 py-3">제목</th>
            <th className="px-6 py-3">날짜</th>
            <th className="px-6 py-3">조회</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id} className="bg-whiteborder-b w-[100%]">
              <td className="px-2 py-4 font-medium text-black whitespace-nowrap text-center w-[7%]">
                {post.id}
              </td>
              <td className="px-6 py-4 font-medium text-black whitespace-nowrap w-[13%]">
                {post.category}
              </td>
              <td className="px-6 py-4 font-medium text-black whitespace-nowrap w-[60%]">
                <Link
                  to={`/postdetail/${post.id}`}
                  onClick={() => incViewCnt(post.id)}
                >
                  {post.title}
                </Link>
              </td>
              <td className="px-6 py-4 font-medium text-black whitespace-nowrap w-[8%]">
                {post.createdAt !== undefined ? (
                  new Intl.DateTimeFormat("ko-KR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour12: false,
                  }).format(new Date(post.createdAt))
                ) : (
                  <div> </div>
                )}
              </td>
              <td className="px-6 py-4 font-medium text-black whitespace-nowrap w-[12%]">
                {post.viewcount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <nav>
          <ul className="flex items-center h-8 text-sm justify-center">
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-blue-400 border border-e-0 border-gray-300 rounded-sm hover:bg-white hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-whitefont-bold"
            >
              prev
            </button>
            {pageNumbers.map((number) => (
              <li
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`flex items-center justify-center px-3 h-8 ms-0 leading-tight bg-blue-400 border border-e-0 border-gray-300 rounded-sm hover:bg-white hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white cursor-pointer ${
                  number === currentPage
                    ? "text-orange-500 font-bold"
                    : "text-white"
                }`}
              >
                <span className="page-link">{number}</span>
              </li>
            ))}
            <button
              onClick={goToNextPage}
              disabled={currentPage === pageNumbers.length}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-white bg-blue-400 border border-e-0 border-gray-300 rounded-sm hover:bg-white hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-whitefont-bold"
            >
              next
            </button>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Freeboard;
