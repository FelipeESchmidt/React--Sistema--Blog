import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Aside from '../Aside';

function App() {

  return (

    <Router>
      <Aside />
      <Wrapper>
        <Switch>
          <Route exact path="/">
          </Route>
          <Route path="/reading">
          </Route>
          <Route path="/want_read">
          </Route>
          <Route path="/read">
          </Route>
          <Route path="/search/:type">
          </Route>
          <Redirect from="/search" to="/" />
          <Route path="/">
            <h1>404</h1>
          </Route>
        </Switch>
      </Wrapper>
    </Router>

  );
}

function Wrapper({children}) {
  return (
    <div style={{ marginLeft: "300px" }}>
      {children}
    </div>
  );
}

export default App;