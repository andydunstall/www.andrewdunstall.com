import React from 'react';

import './Posts.css';

function Posts() {
  return (
    <div className="posts">
      <div className="post">
        <h3>Implementing TD-Gammon with Keras</h3>
        <h6>January 24, 2021</h6>
        <p>
          TD-Gammon is an artificial neural network, trained with TD(λ), that
          learns to play Backgammon by self-play. This post implements TD-Gammon
          0.0 in Python using Keras and Tensorflow. A full description of the
          TD-Gammon is given in Temporal Difference Learning...
        </p>
        <a href="/">Read More</a>
      </div>
      <div className="post">
        <h3>Adding Authorization with GitHub OAuth</h3>
        <h6>October 31, 2020</h6>
        <p>
          TD-Gammon is an artificial neural network, trained with TD(λ), that
          learns to play Backgammon by self-play. This post implements TD-Gammon
          0.0 in Python using Keras and Tensorflow. A full description of the
          TD-Gammon is given in Temporal Difference Learning...
        </p>
        <a href="/">Read More</a>
      </div>
    </div>
  );
}

export default Posts;
