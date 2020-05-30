import React from 'react';
import {Link} from "react-router-dom";

function Navbar(props) {
	return (
			<nav>
				<div>
					<Link to="/">
						Learn <span>Vim.</span>
					</Link>
				</div>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to={"/highScores"}>HighScore</Link></li>
				</ul>
			</nav>
	);
}

export default Navbar;
