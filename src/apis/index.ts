import { IPost } from 'models/post';

export const API_ROOT = 'http://localhost:3002';

function betterFetch<T>(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<T> {
  return new Promise((resolve, reject) => {
    fetch(input, init)
      .then(res => {
        if (res.ok) resolve(res.json());
        else reject(res);
      })
      .catch(err => reject(err));
  });
}

export default {
  getPost: (postId: number) => betterFetch<IPost>(`${API_ROOT}/posts/${postId}`),
  getAllPosts: () => betterFetch<IPost[]>(`${API_ROOT}/posts`),
  createPost: (post: IPost) =>
    betterFetch<IPost>(`${API_ROOT}/posts`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    }),
};

export const QUERY_KEYS = {
  ALL_POSTS: 'posts',
  POST: 'post',
};
