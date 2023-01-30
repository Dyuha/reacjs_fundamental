import { MyButton } from './UI/button/MyButton';
import { useNavigate, useParams } from 'react-router-dom';


export const PostItem = ({ post, number, removePost }) => {
  
  const navigate = useNavigate();
  
  return (
    <>
      <div className="post">
        <div className="post__content">
          <strong>{number}. {post.title}</strong>
          <div>{post.body}</div>
        </div>
        <div className="post__button">
          <MyButton onClick={() => navigate(`/posts/${post.id}`)}>Open</MyButton>
          <MyButton onClick={() => removePost(post)}>Delete</MyButton>
        </div>
      </div>
    </>
  );
};
