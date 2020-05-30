import React from 'react';
import {StyledCharacter, StyledGame, StyledScore, Styledtimer} from "../styled/Game";
import {Strong} from "../styled/Random";

function Game(props) {
	return (
			<StyledGame>
				<StyledScore>Score: <Strong>0</Strong></StyledScore>
				<StyledCharacter>A</StyledCharacter>
				<Styledtimer>Time: <Strong>00: 000</Strong></Styledtimer>
			</StyledGame>
	);
}

export default Game;
