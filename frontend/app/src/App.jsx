import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Landing from './landing';
import Posts from './posts';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/posts">
          <Posts />
        </Route>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
