import React from 'react';
import {Link} from "react-router-dom";
import {StyledLink, StyledNavbar, StyledNavBrand, StyledNavItems, StyledButtonLink} from "../styled/Navbar";
import {Accent} from "../styled/Random";
import {useAuth0} from "../auth";
import {StyledButton} from "../styled/Buttons";

function Navbar({toggleTheme}) {
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
								<StyledButtonLink onClick={loginWithRedirect}>Login</StyledButtonLink>
							</li>
					)}
					{isAuthenticated && (
							<li>
								<StyledButtonLink onClick={logout}>Logout</StyledButtonLink>
							</li>
					)}
					<StyledButton onClick={toggleTheme}>
						Toggle Theme
					</StyledButton>
				</StyledNavItems>
			</StyledNavbar>
	);
}

export default Navbar;
