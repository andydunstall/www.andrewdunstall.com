/* eslint max-len: "off" */

import React from 'react';

import { Link } from 'react-router-dom';

import './Posts.css';

function Posts() {
  return (
    <div className="posts">
      <div className="post">
        <h1>Implementing TD-Gammon with Keras</h1>
        <h6>January 24, 2021</h6>
        <p>
          TD-Gammon is an artificial neural network, trained with TD(λ), that
          learns to play Backgammon by self-play.
        </p>
        <p>
          This post implements TD-Gammon 0.0 in Python using Keras and
          Tensorflow. A full description of the TD-Gammon is given in ...
        </p>
        <Link to="/posts/implementing-td-gammon-with-keras" id="more">Read More</Link>
      </div>

      <div className="post">
        <h1>GraphQL API in Golang with AWS Lambda</h1>
        <h6>October 23, 2020</h6>
        <p>
          This article describes building a new Golang back-end API to fetch articies using GraphQL.
        </p>
        <p>
          GraphQL is a query language for APIs. This enables declarative data fetching. The client specifies exactly what data it needs and requests this from a single endpoint, rather than multiple endpoints returning fixed structure as done with REST.
        </p>
        <Link to="posts/graphql-api-in-golang-with-aws-lambda" id="more">Read More</Link>
      </div>

      <div className="post">
        <h1>Continuous Deployment Pipeline for AWS Lambda — Commit Stage</h1>
        <h6>October 11, 2020</h6>
        <p>
          Continuous deployment is a software development practice where the release process is automated from end to end. This includes building, testing and deploying the software in a number of stages.

          This article explains the first stage of the CI/CD pipeline  which builds the release candidate and detects common errors though unit testing and static analysis.
        </p>
        <Link to="posts/continuous-deployment-pipeline-for-aws-lambda-commit-stage" id="more">Read More</Link>
      </div>
    </div>
  );
}

export default Posts;
