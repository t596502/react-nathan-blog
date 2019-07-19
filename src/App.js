import React,{ Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from '@/store'
import { Spin } from 'antd';
const Index = lazy(()=> import('@/pages/web/index/index'));
const Admin = lazy(()=> import('./pages/admin/home/aHome'));
const aLogin = lazy(()=> import('./pages/admin/login/aLogin'));
// const Index = lazy(()=> import('@/pages/web/index/index'));
// import Article from '@/pages/web/article/article'
// import Admin from './pages/admin/home/aHome'
// import aLogin from './pages/admin/login/aLogin'

function loading() {
    return(
        <Spin style={{position:'absolute',top:'50%',left:'50%',translate:'(-50%,-50%)'}} tip="Loading..." size="large" />
    )
}

function App() {

  return (
      <Provider store={store}>
          <BrowserRouter>
              <Suspense fallback={loading()}>
              <Switch>
                  <Route path='/admin'  component={Admin} />
                  <Route path='/login' component={aLogin} />
                  <Route path='/' component={Index} />
              </Switch>
              </Suspense>
          </BrowserRouter>
      </Provider>

  );
}

export default App;
