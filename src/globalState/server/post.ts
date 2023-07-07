import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IPost } from './types/post.types';
import { API_ROOT } from 'config/env';

const postApi = createApi({
  reducerPath: 'post',
  baseQuery: fetchBaseQuery({ baseUrl: API_ROOT }),
  tagTypes: ['Posts'],
  endpoints: build => ({
    getPost: build.query<IPost, string>({
      query: postId => `/posts/${postId}`,
    }),

    getAllPosts: build.query<IPost[], void>({
      query: () => '/posts',
      providesTags: ['Posts'],
    }),

    createPost: build.mutation<IPost, IPost>({
      query: newPost => ({ url: '/posts', method: 'POST', body: newPost }),
      transformResponse: (resp: { data: IPost }) => resp.data,
      invalidatesTags: ['Posts'],
    }),
  }),
});

export default postApi;
export const { useCreatePostMutation, useGetPostQuery, useGetAllPostsQuery } = postApi;
