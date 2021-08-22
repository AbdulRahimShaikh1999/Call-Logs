import React from 'react';
import { NavLink } from 'react-router-dom'

const NavBar = () => {
	return (
		<nav>
			<ul>
				<li>
				<NavLink to="/">Inbox</NavLink>
				</li>
				{/* <li>
					<NavLink to="/detail">All calls</NavLink>
				</li> */}
			</ul>
		</nav>
	)
}

export default NavBar
