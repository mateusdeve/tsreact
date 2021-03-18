import {useContext } from "react"
import { AuthContext } from "../../contexts/auth"

function SingIn(){
  const {signed, loading, user, signIn} = useContext(AuthContext)
  console.log(signed);
  console.log(loading);
  console.log(user);
  
  function handleSignIn() {
    signIn()
  }
  return(
    <div>
      <button onClick={handleSignIn}>{loading ? 'Carregando' : 'Entrar'}</button>
    </div>
  )
}
export default SingIn