import { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { AuthContext } from "../contexts/auth";

interface Props extends RouteProps{
  isPrivate: boolean
  signed: boolean
}
function CustomRoute({isPrivate, signed, ...rest}: Props){
  const {loading} = useContext(AuthContext)
  if(loading){
    <h1>Carregando...</h1>
  }
  if(isPrivate && !signed){
    return <Redirect to="/" />
  }
  return <Route {...rest} />
}

export default CustomRoute