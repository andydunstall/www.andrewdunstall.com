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
    </div>
  );
}

export default Posts;
