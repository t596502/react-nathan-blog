import React, { Suspense, lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import { Spin } from 'antd';

const Index = lazy(() => import('@/pages/index/index'));
const Archives = lazy(() => import('@/pages/archives/archives'))
const Home = lazy(() => import('@/pages/home/home'))
const Article = lazy(() => import('@/pages/article/article'))
const About = lazy(() => import('@/pages/about/about'))
const PageNotFound = lazy(() => import('@/components/pageNotFound'))

function loading() {
  return (
    <Spin style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} tip="Loading..." size="large" />
  )
}

function App() {

  return (
    <Provider store={store}>
      <HashRouter forceRefresh={true}>
        <Suspense fallback={loading()}>
          <Switch>
            {/*<Route path='/' component={Index} />*/}
            <Route path='' exact render={() => (
              <Index>
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/article/:id' component={Article} />
                  <Route path='/about' component={About} />
                  <Route path='/archives' component={Archives} />
                  <Route path="*" component={PageNotFound} />
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
