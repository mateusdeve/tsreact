import { useContext } from 'react'
import {Route, Switch} from 'react-router-dom'
import { AuthContext } from '../contexts/auth'
import DashBoard from '../pages/DashBoard'
import SingIn from '../pages/SingIn'
import CustomRoute from './routes'

export default function Routes(){
  const {signed} = useContext(AuthContext)
  return(
    <Switch>
      <Route path='/' exact component={SingIn}></Route>
      <CustomRoute isPrivate signed={signed} path='/dash' component={DashBoard}/>
    </Switch>
  )
}