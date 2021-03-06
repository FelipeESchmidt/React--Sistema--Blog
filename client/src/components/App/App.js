import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import BlogController from '../../controllers/BlogController';
import FormController from '../../controllers/FormController';
import BlogContext from '../../contexts/BlogContext';

import Aside from '../Aside';
import Blog from '../Blog';
import CreatePost from '../Forms/CreatePost';
import CreateCategory from '../Forms/CreateCategory';
import SinglePost from '../Blog/SinglePost';
import AlertMessage from '../AlertMessage';
import EditPost from '../Forms/EditPost';
import EditComment from '../Forms/EditComment';

function App() {

  const blogController = new BlogController();
  const formController = new FormController();

  return (
    <BlogContext.Provider value={{ blogHelper: blogController, formHelper: formController }}>
      <Router>
        <Aside />
        <AlertMessage />
        <Wrapper>
          <Switch>
            <Route exact path="/">
              <Blog />
            </Route>
            <Route path="/post/:postId/editComment/:commentId">
              <EditComment />
            </Route>
            <Redirect from="/post/:postId/editComment" to="/" />
            <Route path="/post/:id">
              <SinglePost />
            </Route>
            <Redirect from="/post" to="/" />
            <Route path="/editPost/:id">
              <EditPost />
            </Route>
            <Redirect from="/editPost" to="/" />
            <Route path="/createPost">
              <CreatePost />
            </Route>
            <Route path="/createCategory">
              <CreateCategory />
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