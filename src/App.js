import "./styles/App.css";
import Posts from "./pages/Posts";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { About } from "./pages/About";
import { Navbar } from "./components/UI/navbar/Navbar";
import { PostsIdPage } from "./pages/PostIdPage"

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostsIdPage />} />
          <Route path="*" element={<Navigate to="/posts" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
