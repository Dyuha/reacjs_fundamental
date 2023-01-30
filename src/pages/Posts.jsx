import { useEffect, useState, useRef } from "react";
import { PostList } from "../components/PostList";
import { PostForm } from "../components/PostForm";
import { PostFilter } from "../components/PostFilter";
import { MyModal } from "../components/UI/MyModal/MyModal";
import { MyButton } from '../components/UI/button/MyButton';
import { usePosts } from "../hooks/usePosts";
import PostService from '../API/API';
import { Loader } from "../components/UI/loader/Loader";
import { useFetching } from '../hooks/useFetching';
import { getPagesCount } from '../utils/Pages';
import { usePagination } from '../hooks/usePagination';
import { Pagination } from "../components/UI/pagination/Pagination";
import withAuthRedirect from '../hoc/withAuthRedirect';
import { useObserver } from '../hooks/useObserver';

const Posts = () => {

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort:'', query:''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const pagesArray = usePagination(totalPages)

  const [fetchPosts, isFetching, postError] = useFetching( async () => {
    const response = await PostService.getAllPosts(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPagesCount(totalCount, limit))
  })

  useObserver(lastElement, isFetching, page < totalPages, () => {
    setPage(page+1);
  });

  // ============== ну и так тоже работает ================
  // useEffect(() => {
  //   const callback = (entries, observer) => {
  //     if(entries[0].isIntersecting){
  //       console.log(page);
  //       setPage(page => page + 1)
  //     }
  //   };
  //   observer.current = new IntersectionObserver(callback);
  //   observer.current.observe(lastElement.current)
  // }, []) 

  useEffect( () => {
    fetchPosts()
  }, [page])

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
      <PostFilter filter={filter} setFilter={setFilter}/>
      {postError && <h1>{postError}</h1>}
      <PostList removePost={removePost} posts={sortedAndSearchedPosts} title={"SPISOK POSTOV"}/>

      <div style={{height:'20px'}} ref={lastElement}/>
      
      {isFetching && <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}} ><Loader/></div>}
      {/* ================== постраничный вывод =================== */}
      {/* <Pagination key={page} pagesArray={pagesArray} page={page} changePage={setPage}/> */}
    </div>
  );
};

export default withAuthRedirect(Posts);
