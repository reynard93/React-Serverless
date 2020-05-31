import React, {useEffect, useState} from 'react';
import {ScoreLI, ScoresList} from "../styled/HighScores";

function HighScores(props) {
	const [highScores, setHighScores] = useState([]);

	useEffect(() => {
		const loadHighScores = async() => {
			try {
				const res = await fetch('/.netlify/functions/getHighScores');
				const scores = await res.json();
				setHighScores(scores);
			} catch(err) {
				console.error(err);
			}
		}
		loadHighScores();
	}, [])
	return (
			<div>
				<h1>HighScores</h1>
				<ScoresList>
					{highScores.map(score => (
							<ScoreLI key={score.id}>{score.fields.name} - {score.fields.score}</ScoreLI>
					))}
				</ScoresList>
			</div>
	);
}

export default HighScores;
