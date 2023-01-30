import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../context/index';

const withAuthRedirect = (Component) => {
  const AuthRedirect = (props) => {
  const {isAuth} = useContext(AuthContext);
    if (isAuth){
      return <Component {...props}/>
    }
    return <Navigate to={"/login"}/>
  }
  return AuthRedirect;
}

export default withAuthRedirect;

