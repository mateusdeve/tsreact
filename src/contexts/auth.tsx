import { createContext, useEffect, useState } from "react";
import api from "../service/api";
import history from '../service/history'

interface Props {
  children?: React.ReactNode
}

interface User {
  name: string
}

interface AuthContextData {
  signed: boolean,
  signIn: () => void,
  loading: boolean,
  user: User
}


const initialContext =  {
  signed: false,
  setSigned: () => {},
  signIn: () => {},
  loading: true,
  user: {name: ''}
}


const AuthContext = createContext<AuthContextData>(initialContext);

function AuthProvider({ children }:Props){

  useEffect(() => {
    const storageToken = localStorage.getItem('@Auth:TOKEN')
    const storageUser = localStorage.getItem('@Auth:USER')
    if(storageToken && storageUser){
      console.log("Entrou");
      setUser(JSON.parse(storageUser))
      api.defaults.headers.authorization = `Bearer ${storageToken}`
      setSigned(true)
      setLoading(false)
      history.push('/dash')
    }
  }, [])

  const [user, setUser] = useState<User>(initialContext.user)
  const [signed, setSigned] = useState(initialContext.signed)
  const [loading, setLoading] = useState(initialContext.loading)

  async function signIn() {
    try{
      setLoading(true)

      const {data} = await api.post('/signin')

      api.defaults.headers.authorization = `Bearer ${data.token}`
      const apiUser = {
        name: data.name
      }
      localStorage.setItem('@Auth:TOKEN', data.token)
      localStorage.setItem('@Auth:USER', JSON.stringify(apiUser))
      localStorage.setItem('@Auth:SIGNED', 'true')
      setUser(apiUser)
      setSigned(true)
      setLoading(false)
      history.push('/dash')
    } catch(e){
      setLoading(false)
      console.log(e);
    }
  }

  return(
    <AuthContext.Provider value={{signed, signIn, loading, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };