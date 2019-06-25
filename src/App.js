import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import {Provider} from 'react-redux'

import Index from '@/pages/web/index/index'
import Article from '@/pages/web/article/article'
import Admin from './pages/admin/home/aHome'
import aLogin from './pages/admin/login/aLogin'
import store from '@/store'
function App() {

  return (
      <Provider store={store}>
          <BrowserRouter>
              <Switch>
                  <Route path='/admin'  component={Admin} />
                  <Route path='/' component={Index} />
                  {/*<Route path='/login' exact component={aLogin} />*/}
              </Switch>
          </BrowserRouter>
      </Provider>

  );
}

export default App;
