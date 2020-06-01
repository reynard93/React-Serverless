import React from 'react';
import {Link} from "react-router-dom";
import {StyledLink, StyledNavbar, StyledNavBrand, StyledNavItems} from "../styled/Navbar";
import {Accent} from "../styled/Random";
import {useAuth0} from "../auth";

function Navbar(props) {
	const {isAuthenticated, loginWithRedirect, logout} = useAuth0();
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
					{!isAuthenticated && (
							<li>
								<button onClick={loginWithRedirect}>Login</button>
							</li>
					)}
					{isAuthenticated && (
							<li>
								<button onClick={logout}>Logout</button>
							</li>
					)}
				</StyledNavItems>
			</StyledNavbar>
	);
}

export default Navbar;
