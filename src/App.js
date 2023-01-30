import "./styles/App.css";
import { useState } from "react";
import { PostList } from "./components/PostList";
import { PostForm } from "./components/PostForm";
import { PostFilter } from "./components/PostFilter";
import { MyModal } from "./components/UI/MyModal/MyModal";
import { MyButton } from './components/UI/button/MyButton';
import { usePosts } from "./hooks/usePosts";

const App = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", body: "JS is AWESOM" },
   ]);
 
  const [filter, setFilter] = useState({sort:'', query:''});
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
 
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>Создать пост</MyButton>
      <MyModal visible={modal} setVisible={setModal}><PostForm createPost={createPost} /></MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter}/>
      <PostList removePost={removePost} posts={sortedAndSearchedPosts} title={"SPISOK POSTOV"}/>
    </div>
  );
};

export default App;
