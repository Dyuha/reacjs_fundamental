import { MyInput } from './UI/input/MyInput';
import { MyButton } from './UI/button/MyButton';
import { useState } from 'react';

export const PostForm = ({createPost, ...props}) => {

  const [post, setPost] = useState({title:'', body:'',});

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      id: Date.now(),
      ...post,
    }
    createPost(newPost);
    setPost({title: '', body: ''})
  };

  return (
    <>
      <form>
        <MyInput
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          value={post.title}
          type="text"
          placeholder="Названиве"
        />
        <MyInput
          onChange={(e) => setPost({ ...post, body: e.target.value })}
          value={post.body}
          type="text"
          placeholder="Описание"
        />
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
    </>
  );
};
