import React from 'react';

import Email from '../icons/Email';
import GitHub from '../icons/GitHub';

import './Header.css';

function Header() {
  return (
    <div className="header">
      <h1>Andrew Dunstall</h1>
      <h2>Software Engineer | London</h2>
      <div className="contact">
        <a href="https://github.com/dunstall" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><GitHub /></a>
        <a href="mailto:andydunstall@hotmail.co.uk" aria-label="Email"><Email /></a>
      </div>
    </div>
  );
}

export default Header;
