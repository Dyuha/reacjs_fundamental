import { useParams } from "react-router-dom"
import { useEffect, useState } from 'react';
import { useFetching } from "../hooks/useFetching";
import PostService from '../API/API';
import { Loader } from "../components/UI/loader/Loader";
import withAuthRedirect from '../hoc/withAuthRedirect';


const Comments = (props) => {
  return (
    <div>
      <hr style={{margin: "15px 0"}}/>
      <h3>{props.comment.name}</h3>
      <div style={{color:'rgba(0,0,0,0.5)'}}>{props.comment.email}</div>
      <div style={{fontSize:'18px'}}>{props.comment.body}</div>
    </div>
  );
};

const PostsIdPage = () => {
  
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([])

  const [fetchPostById, isFetching, postError] = useFetching(async () => {
    const response = await PostService.getById(params.id);
    setPost(response.data);
  });

  const [fetchCommentsById, isCommentsFetching, commentsError] = useFetching( async () => {
    const response = await PostService.getCommentsById(params.id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById();
    fetchCommentsById();
  }, []);
  
  return (
    <div>
      <h1> Страница поста с ID = {params.id} </h1>
      {isFetching 
        ? <Loader/>
        : <div style={{width:'800px'}}>{post.id}{post.title}{post.body}</div>
      }

      <h2 style={{marginTop:'30px'}}>COMMENTS</h2>
      {isCommentsFetching 
        ? <Loader/>
        : <div style={{width:'800px'}}>{comments.map(comment =>
            <Comments key={comment.id} comment={comment} />)}
          </div>
      }
    </div>
  )
}

export default withAuthRedirect(PostsIdPage);