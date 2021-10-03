import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Login, SignUp, AllNetworks, MyLogs, NetworkLogs, MyOfficialLogs, OfficialLogs, PicLogs } from './Pages'
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

            <Redirect from='/meh' to='/network_name/all_logs' exact/>
            <PrivateRoute exact path='/network_name/my_logs' component={MyLogs} />
            <PrivateRoute exact path='/network_name/all_logs' component={NetworkLogs} />
            <PrivateRoute exact path='/network_name/my_official_logs' component={MyOfficialLogs} />
            <PrivateRoute exact path='/network_name/official_logs' component={OfficialLogs} />
            <PrivateRoute exact path='/network_name/picture_logs' component={PicLogs} />
            
          </Switch>
        </div>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;