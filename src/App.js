import React,{ Suspense, lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from '@/store'
import { Spin } from 'antd';
import AuthorizedRoute from './AuthorizedRoute'
const Index = lazy(()=> import('@/pages/web/index/index'));
const Admin = lazy(()=> import('./pages/admin/home/aHome'));
const aLogin = lazy(()=> import('./pages/admin/login/aLogin'));
/*
import Index from '@/pages/web/index/index';
import Admin from './pages/admin/home/aHome'
import aLogin from './pages/admin/login/aLogin'
*/
function loading() {
    return(
        <Spin style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}} tip="Loading..." size="large" />
    )
}

function App() {

  return (
      <Provider store={store}>
          <HashRouter forceRefresh={true}>
              <Suspense fallback={loading()}>
              <Switch>
                  {/*<Route path='/admin'  component={Admin} />*/}
                  <AuthorizedRoute path='/admin' linkType={'admin'}  component={Admin} />
                  <Route path='/login' component={aLogin} />
                  <Route path='/' component={Index} />
              </Switch>
              </Suspense>
          </HashRouter>
      </Provider>

  );
}

export default App;
