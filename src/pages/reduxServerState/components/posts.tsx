/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useGetAllPostsQuery } from 'globalState/post';

interface Props {
  setCurrentPostId: (postId: string) => void;
}

export default function AllPosts({ setCurrentPostId }: Props) {
  const { data: posts, isLoading, isError } = useGetAllPostsQuery();

  return (
    <div className='flex-1 ring-1'>
      <div className='mb-4'>All Posts</div>
      {posts &&
        posts.map(post => (
          <div key={post.id} onClick={() => setCurrentPostId(post.id)} className='cursor-pointer'>
            {post.title}
          </div>
        ))}
      {isLoading && <div className='my-1 text-yellow-500'>Loading...</div>}
      {isError && <div className='text-red-400'>Something went wrong</div>}
    </div>
  );
}
