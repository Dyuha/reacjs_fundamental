import { MyInput } from '../components/UI/input/MyInput';
import { MyButton } from '../components/UI/button/MyButton';
import { useContext } from 'react';
import { AuthContext } from '../context/index';
import { Navigate } from 'react-router-dom';

export const Login = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);

  const login = (e) => {
    e.preventDefault();
    setIsAuth(true);
    localStorage.setItem('auth', 'true');
  }

  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Введите логин" />
        <MyInput type="password" placeholder="Введите пароль" />
        <MyButton>Войти</MyButton>
      </form>
      {isAuth ? <Navigate to="/posts" /> : ""}
      {console.log(isAuth)}
    </div>
  );
};