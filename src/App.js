import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import {Provider} from 'react-redux'

import Home from '@/pages/web/home/home'
import Article from '@/pages/web/article/article'
import Admin from './pages/admin/home/aHome'
import aLogin from './pages/admin/login/aLogin'
import store from '@/store'
function App() {

  return (
      <Provider store={store}>
          <BrowserRouter>
              <Switch>
                  <Route path='/' exact component={Home} />
                  <Route path='/article/:id' component={Article} />
                  <Route path='/admin' component={Admin} />
                  <Route path='/login' exact component={aLogin} />
              </Switch>
          </BrowserRouter>
      </Provider>

  );
}

export default App;
