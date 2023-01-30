import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../context/index';
import { Loader } from '../components/UI/loader/Loader';

const withAuthRedirect = (Component) => {
  const AuthRedirect = (props) => {
  const {isAuth, isLoading} = useContext(AuthContext);
    if (isLoading){
      return <Loader/>
    }
    if (isAuth){
      return <Component {...props}/>
    }
    return <Navigate to={"/login"}/>
  }
  return AuthRedirect;
}

export default withAuthRedirect;

