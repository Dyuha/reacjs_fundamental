import "./styles/App.css";
import { useEffect, useState } from "react";
import { PostList } from "./components/PostList";
import { PostForm } from "./components/PostForm";
import { PostFilter } from "./components/PostFilter";
import { MyModal } from "./components/UI/MyModal/MyModal";
import { MyButton } from './components/UI/button/MyButton';
import { usePosts } from "./hooks/usePosts";
import PostService from './API/API';
import { Loader } from "./components/UI/loader/Loader";
import { useFetching } from './hooks/useFetching';

const App = () => {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort:'', query:''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [fetchPosts, isFetching, postError] = useFetching( async () => {
    const posts = await PostService.getAllPosts();
    setPosts(posts);
  })
 
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  useEffect( () => {
    fetchPosts()
  }, [])

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      {/* <MyButton onClick={fetchPosts} >GET POSTS</MyButton> */}
      <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>Создать пост</MyButton>
      <MyModal visible={modal} setVisible={setModal}><PostForm createPost={createPost} /></MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter}/>
      {isFetching
        ? <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}} ><Loader/></div>
        : <PostList removePost={removePost} posts={sortedAndSearchedPosts} title={"SPISOK POSTOV"}/>
      }
    </div>
  );
};

export default App;
