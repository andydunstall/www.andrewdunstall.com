import React from 'react';

import Header from './Header';
import Posts from './Posts';

import './Landing.css';

function Landing() {
  return (
    <div className="landing">
      <Header />
      <Posts />
    </div>
  );
}

export default Landing;
