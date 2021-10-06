import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import BlogController from '../../controllers/BlogController';
import ApiContext from '../../contexts/ApiContext';

import Aside from '../Aside';
import Blog from '../Blog';

function App() {

  const controller = new BlogController();

  return (
    <ApiContext.Provider value={{ controller: controller }}>
      <Router>
        <Aside />
        <Wrapper>
          <Switch>
            <Route exact path="/">
              <Blog />
            </Route>
            <Redirect from="/post" to="/" />
            <Route path="/post/:id">
              <h2>Post</h2>
            </Route>
            <Route path="/:categoria">
              <Blog />
            </Route>
            <Route path="/">
              <h1>404</h1>
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </ApiContext.Provider>
  );
}

function Wrapper({ children }) {
  return (
    <div style={{ marginLeft: "300px", height: "100%", maxWidth: "calc(100% - 300px)" }}>
      {children}
    </div>
  );
}

export default App;