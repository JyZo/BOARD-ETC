import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//rtkquery api 세팅
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/post",
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});

const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery,
  tagTypes: ["Posts"],
  endpoints: (builder) => ({
    fetchAllPosts: builder.query({
      query: () => "/allpost",
      providesTags: ["Posts"],
    }),
    fetchPostById: builder.query({
      query: (id) => `/post-detail/${id}`,
      providesTags: (result, error, id) => [{ type: "Posts", id }],
    }),
    addPost: builder.mutation({
      query: (newPost) => ({
        url: "/postregist",
        method: "POST",
        body: newPost,
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation({
      query: ({ id, updatePost }) => ({
        url: `/update-post/${id}`,
        method: "PUT",
        body: { updatePost },
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/delete-post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useFetchAllPostsQuery,
  useFetchPostByIdQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
export default postsApi;
