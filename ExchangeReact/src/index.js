import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getCurrentUser } from './store/auth'
import { Provider } from 'react-redux'
import { store } from './store'
import 'assets/plugins/nucleo/css/nucleo.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'assets/scss/argon-dashboard-react.scss'

import AdminLayout from 'layouts/Admin.js'
import AuthLayout from 'layouts/Auth.js'

const App = () => {

  const auth = useSelector(getCurrentUser)
  return (
    <>
      {auth.data ? (
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Redirect from="/" to="/admin/index" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
          <Redirect from="/" to="/auth/login" />
        </Switch>
      )}
    </>
  )
}
ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <>
        <App />
      </>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
