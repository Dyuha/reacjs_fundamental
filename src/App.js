import "./styles/App.css";
import Posts from "./pages/Posts";
import { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { About } from "./pages/About";
import { Navbar } from "./components/UI/navbar/Navbar";
import PostsIdPage from "./pages/PostIdPage";
import { Login } from "./pages/Login";
import { AuthContext } from "./context/index";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect( () => {
    if(localStorage.getItem('auth')){
      setIsAuth(true);
    }
    setIsLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading,
    }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:id" element={<PostsIdPage />} />
          <Route path="*" element={<Navigate to="/posts" replace />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

export default App;
