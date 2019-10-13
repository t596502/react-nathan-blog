import React,{ Suspense, lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from '@/store'
import { Spin } from 'antd';
import AuthorizedRoute from './AuthorizedRoute'
import AddArticle from "@/pages/admin/article/edit/edit";
import Manage from "@/pages/admin/article/manage/manage";
import SettingUp from "@/pages/admin/user/settingUp/settingUp";
import MyUser from "@/pages/admin/user/myUser/myUser";
const Index = lazy(()=> import('@/pages/web/index/index'));
const Admin = lazy(()=> import('./pages/admin/home/aHome'));
const aLogin = lazy(()=> import('./pages/admin/login/aLogin'));

const Archives = lazy(() => import('@/pages/web/archives/archives'))
const Home = lazy(() => import('@/pages/web/home/home'))
const Article = lazy(() => import('@/pages/web/article/article'))
const About = lazy(() => import('@/pages/web/about/about'))


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
                  <AuthorizedRoute path='/admin' linkType={'admin'} render={()=>(
                      <Admin>
                          <Switch>
                              <Route path='/admin/article/edit' component={AddArticle} />
                              <Route path='/admin/article/manage' component={Manage} />
                              <Route path='/admin/user/settingUp' component={SettingUp} />
                              <Route path='/admin/user/myUser' component={MyUser} />
                          </Switch>
                      </Admin>
                  )} />
                  <Route path='/login' component={aLogin} />
                  {/*<Route path='/' component={Index} />*/}
                  <Route path='/' render={()=>(
                      <Index>
                          <Switch>
                              <Route exact path='/' component={Home}/>
                              <Route path='/article/:id' component={Article}/>
                              <Route path='/about' component={About}/>
                              <Route path='/archives' component={Archives}/>
                          </Switch>
                      </Index>
                  )} />
              </Switch>
              </Suspense>
          </HashRouter> 
      </Provider>

  );
}

export default App;
