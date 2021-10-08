import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import TDGammon from './TDGammon';

import './Posts.css';

function Posts() {
  const match = useRouteMatch();

  return (
    <div className="posts">
      <Router>
        <Switch>
          <Route path={`${match.url}/implementing-td-gammon-with-keras`}>
            <div className="post">
              <TDGammon />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Posts;
