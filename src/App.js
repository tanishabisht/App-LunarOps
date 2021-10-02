import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Login, SignUp, AllNetworks, NetworkLogs, PicLogs, TopicLogs, MyLogs } from './Pages'
import { Navbar } from './Components'
import { AuthProvider } from './Config/auth'
import PrivateRoute from './Container/PrivateRoute'
import './app.css'

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Navbar/>
        <div className='container_main'>
          <Switch>
            <Redirect from='/' to='/networks' exact/>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <PrivateRoute exact path='/networks' component={AllNetworks} />
            <PrivateRoute exact path='/network_name/network_logs' component={NetworkLogs} />
            <PrivateRoute exact path='/network_name/picture_logs' component={PicLogs} />
            <PrivateRoute exact path='/network_name/topic_logs' component={TopicLogs} />
            <PrivateRoute exact path='/network_name/my_logs' component={MyLogs} />
          </Switch>
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;