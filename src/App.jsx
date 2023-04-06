import Home from './components/Home.jsx'
import './index.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import checkout from './components/Checkout.jsx';

function App() {

  const [user, setLoginUser] = useState({})

  useEffect(() => {
    setLoginUser(JSON.parse(localStorage.getItem("MyUser")))
  }, [])

  return (
    <BrowserRouter>
        {
            <Router>
            <div>
        
                    {user?
                    <Switch>
                    <Route path = '/' exact component={Home} />
                    {/* <Route path = '/pending' exact component={PendingTransactions}/> */}
                    <Route path = '/checkout' exact component={checkout}/>
                    </Switch>
                    :
                    <Switch>
                    <Route path = '/' exact component={Home} />
                    <Redirect to = '/' exact component = { Home } />
                    </Switch>
                    }
                
            </div>
            
        </Router>
        }
        </BrowserRouter>
  );
}
export default App;