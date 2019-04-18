import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Browser, Route, Switch } from 'react-router-dom'
import './style.scss'

import SecureRoute from './components/common/secureRoute'
import Register from './components/auth/register'
import Login from './components/auth/login'
import Home from './components/pages/home'
import QraftIndex from './components/qrafts/qraftsIndex'
import QraftComments from './components/qrafts/qraftComments'
import QraftShow from './components/qrafts/qraftsShow'
import QraftNew from './components/qrafts/qraftsNew'
import QraftEdit from './components/qrafts/qraftEdit'
import QraftTest from './components/qrafts/qraftTest'


import UserProfile from './components/users/userProfile'
import UserEdit from './components/users/userEdit'
import UserContact from './components/users/userContact'
import ErrorPage from './components/pages/errorPage'
import Nav from './components/common/nav.js'


const App = () => {
  return (
    <Browser>
      <div>
        <Nav />
        <Switch>

          <SecureRoute path="/qrafts/new" component={QraftNew} />
          <SecureRoute path="/qrafts/comments" component={QraftComments} />
          <SecureRoute path="/qrafts/:id/edit" component={QraftEdit} />
          <Route path="/qrafts/:id" component={QraftShow} />
          <SecureRoute path="/qrafts/test" component={QraftTest} />

          <SecureRoute path="/user/:id/edit" component={UserEdit} />
          <SecureRoute path="/user/:id" component={UserContact} />
          <SecureRoute path="/user" component={UserProfile} />


          <Route path="/qrafts" component={QraftIndex} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route path='/*' component={ErrorPage} />
        </Switch>
      </div>
    </Browser>

  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
