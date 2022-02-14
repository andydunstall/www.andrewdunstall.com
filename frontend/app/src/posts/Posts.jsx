import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from 'react-router-dom';
import CDCommitStage from './CDCommitStage';
import GraphQLAPI from './GraphQLAPI';
import Scuttlebutt from './Scuttlebutt';
import TDGammon from './TDGammon';
import UDPImpl from './UDPImpl';

import './Posts.css';

function Posts() {
  const match = useRouteMatch();

  return (
    <div className="posts">
      <Router>
        <Switch>
          <Route path={`${match.url}/scuttlebutt`}>
            <div className="post">
              <Scuttlebutt />
            </div>
          </Route>

          <Route path={`${match.url}/udp-implementation-using-raw-sockets-in-golang`}>
            <div className="post">
              <UDPImpl />
            </div>
          </Route>

          <Route path={`${match.url}/implementing-td-gammon-with-keras`}>
            <div className="post">
              <TDGammon />
            </div>
          </Route>

          <Route path={`${match.url}/graphql-api-in-golang-with-aws-lambda`}>
            <div className="post">
              <GraphQLAPI />
            </div>
          </Route>

          <Route path={`${match.url}/continuous-deployment-pipeline-for-aws-lambda-commit-stage`}>
            <div className="post">
              <CDCommitStage />
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Posts;
