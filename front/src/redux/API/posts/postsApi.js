import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/post",
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    console.log("ttttttt");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});

const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery,
  endpoints: (builder) => ({
    fetchAllPosts: builder.query({
      query: () => "/allpost",
      providesTags: ["Posts"],
    }),
  }),
});

export const { useFetchAllPostsQuery } = postsApi;
export default postsApi;
