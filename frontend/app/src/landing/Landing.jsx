import React from 'react';

import Email from '../icons/Email';
import GitHub from '../icons/GitHub';

import './Landing.css';

function Landing() {
  return (
    <div className="landing">
      <h1>Andy Dunstall</h1>
      <h2>Software Engineer</h2>
      <div className="contact">
        <a href="https://github.com/dunstall" aria-label="GitHub"><GitHub /></a>
        <a href="mailto:andydunstall@hotmail.co.uk" aria-label="Email"><Email /></a>
      </div>
    </div>
  );
}

export default Landing;
