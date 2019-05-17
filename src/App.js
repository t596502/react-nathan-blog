import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Home from './pages/home/home'
import Article from './pages/article/article'
function App() {

  return (
    <BrowserRouter>
        <div>
            <Route path='/' exact component={Home}>

            </Route>

        </div>
    </BrowserRouter>
  );
}

export default App;
