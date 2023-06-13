import { useGetPostQuery } from 'globalState/post';

interface Props {
  postId: string;
}
export default function Post({ postId }: Props) {
  const { data: post, isError, isFetching } = useGetPostQuery(postId, { skip: postId.length === 0 });

  return (
    <div className='flex-1 ring-1'>
      <div className='mb-4'>Current Post</div>
      {!isFetching && !isError && post && (
        <div className='px-2'>
          <div>{post.title}</div>
          <div>{post.content}</div>
        </div>
      )}
      {isFetching && <div className='my-1 text-yellow-500'>Loading...</div>}
      {isError && <div className='text-red-400'>Something went wrong</div>}
    </div>
  );
}
