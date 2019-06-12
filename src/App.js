import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Home from '@/pages/web/home/home'
import Admin from './pages/admin/home/aHome'
import aLogin from './pages/admin/login/aLogin'
function App() {

  return (
    <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/admin' component={Admin} />
                <Route path='/login' exact component={aLogin} />
            </Switch>
    </BrowserRouter>
  );
}

export default App;
