import React from 'react';

import Logo from './Logo.jsx';
import NavBar from './NavBar.jsx';

const Header = () => {
  return (
    <header>
		<Logo />
	  <div className="navbar">
		<NavBar />
	  </div>
    </header>
  );
};

export default Header;
