import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import UsersAdmin from './user/UsersAdmin'
import Cars from './user/Cars'
import AddCars from './user/AddCars'

const MainRouter = () => {
 return (<div>
 <Menu/>
 <Switch>
    <Route exact path="/" component={Home}/>
    <Route path="/users" component={Users}/>
    <Route path="/cars" component={Cars}/>
    <Route path="/addcars" component={AddCars}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/signin" component={Signin}/>
    <PrivateRoute path="/user/edit/:userId" component={EditProfile}/>
    <Route path="/user/:userId" component={Profile}/>
    <Route path="/useradmin/:userId" component={UsersAdmin}/>
 </Switch>
 </div>)
}

export default MainRouter