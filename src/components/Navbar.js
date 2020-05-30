import React from 'react';
import {Link} from "react-router-dom";
import {StyledLink, StyledNavbar, StyledNavBrand, StyledNavItems} from "../styled/Navbar";
import {Accent} from "../styled/Random";

function Navbar(props) {
	return (
			<StyledNavbar>
				<StyledNavBrand>
					<Link to="/">
						Learn <Accent>Vim.</Accent>
					</Link>
				</StyledNavBrand>
				<StyledNavItems>
					<li><StyledLink to="/">Home</StyledLink></li>
					<li><StyledLink to={"/highScores"}>HighScore</StyledLink></li>
				</StyledNavItems>
			</StyledNavbar>
	);
}

export default Navbar;
