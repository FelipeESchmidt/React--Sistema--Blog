import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import BlogController from '../../controllers/BlogController';
import FormController from '../../controllers/FormController';
import BlogContext from '../../contexts/BlogContext';

import Aside from '../Aside';
import Blog from '../Blog';
import CreatePost from '../Forms/CreatePost';
import SinglePost from '../Blog/SinglePost';

function App() {

  const blogController = new BlogController();
  const formController = new FormController();

  return (
    <BlogContext.Provider value={{ helper: blogController, validate: formController }}>
      <Router>
        <Aside />
        <Wrapper>
          <Switch>
            <Route exact path="/">
              <Blog />
            </Route>
            <Route path="/post/:id">
              <SinglePost />
            </Route>
            <Redirect from="/post" to="/" />
            <Route path="/editPost/:id">
              <h2>Edit Post</h2>
            </Route>
            <Redirect from="/editPost" to="/" />
            <Route path="/createPost">
              <CreatePost />
            </Route>
            <Route path="/createCategory">
              <h2>Create Category</h2>
            </Route>
            <Route path="/:categoria">
              <Blog />
            </Route>
          </Switch>
        </Wrapper>
      </Router>
    </BlogContext.Provider>
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