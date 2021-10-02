import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import { AllNetworks, Auth, SingleNetwork, NetworkLogs, PicLogs, TopicLogs, MyLogs } from './Pages'
import { Navbar } from './Components'
import './app.css'

function App() {
  return (
    <HashRouter>
      <Navbar/>
      <div className='bg bg_body container-fluid'>
        <Switch>
          <Redirect from='/' to='/home' exact/>
          <Route exact path='/auth' component={Auth} />
          <Route exact path='/networks' component={AllNetworks} />
          <Route exact path='/network_name/network_logs' component={NetworkLogs} />
          <Route exact path='/network_name/picture_logs' component={PicLogs} />
          <Route exact path='/network_name/topic_logs' component={TopicLogs} />
          <Route exact path='/network_name/my_logs' component={MyLogs} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;