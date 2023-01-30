import { MyButton } from './UI/button/MyButton';

export const PostItem = ({ post, number, removePost }) => {
  return (
    <>
      <div className="post">
        <div className="post__content">
          <strong>{number}. {post.title}</strong>
          <div>{post.body}</div>
        </div>
        <div className="post__button">
          <MyButton onClick={() => removePost(post)}>Delete</MyButton>
        </div>
      </div>
    </>
  );
};
