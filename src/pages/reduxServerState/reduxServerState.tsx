import { useState } from 'react';
import AddPost from './components/addPost';
import Post from './components/post';
import AllPosts from './components/posts';

export default function ReduxServerStateDemo() {
  const [currentPostId, setCurrentPostId] = useState('');

  return (
    <div className='flex flex-row h-[calc(100vh-2rem)]'>
      <AllPosts setCurrentPostId={setCurrentPostId} />
      <Post postId={currentPostId} />
      <AddPost />
    </div>
  );
}
