import "./styles/App.css";
import { useMemo, useState } from "react";
import { PostList } from "./components/PostList";
import { PostForm } from "./components/PostForm";
import { MySelect } from "./components/UI/select/MySelect";
import { MyInput } from './components/UI/input/MyInput';

const App = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "JavaScript", description: "JS is AWESOM" },
    { id: 2, title: "Python", description: "JS is AWESOM" },
    { id: 3, title: "C#", description: "JS is AWESOM" },
    { id: 4, title: "Ruby", description: "JS is AWESOM" },
    { id: 5, title: "Java", description: "JAVA is PICE OF SHIT" },
  ]);

  const [selectedSort, setSelectedSort] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const sortedPosts = useMemo( () => {
    console.log('отсортировано')
    if(selectedSort){
      return [...posts].sort((a, b) => a[selectedSort].localeCompare(b[selectedSort]))
    }
    return posts
  }, [selectedSort, posts]);

  const sortedAndSearchedPosts = useMemo( () => {
    return sortedPosts.filter( post => post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                       post.description.toLowerCase().includes(searchQuery.toLowerCase()) )
  }, [searchQuery, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  return (
    <div className="App">
      <PostForm createPost={createPost} />
      <hr style={{ margin: "15px 0" }} />
      <div>
        <MyInput onChange={ e => setSearchQuery(e.target.value)} 
                 value={searchQuery} 
                 placeholder="Поиск"/>
        <MySelect
          defaultValue="Сортировка по"
          value={selectedSort}
          onChange={setSelectedSort}
          options={[
            { value: "title", name: "По названию" },
            { value: "description", name: "По описанию" },
          ]}
        />
      </div>
      {posts.length 
        ? <PostList removePost={removePost} posts={sortedAndSearchedPosts} title={"SPISOK POSTOV"}/>
        : <h1 style={{ textAlign: "center" }}>Няма постов</h1>
      }
    </div>
  );
};

export default App;
