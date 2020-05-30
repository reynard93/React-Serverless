import React, {useCallback, useEffect, useState} from 'react';
import {StyledCharacter, StyledGame, StyledScore, Styledtimer} from "../styled/Game";
import {Strong} from "../styled/Random";

function Game({history}) {
	const [score, setScore] = useState(0);
	const MAX_SECONDS = 5;
	const [ms, setMs] = useState(0);
	const [seconds, setSeconds] = useState(MAX_SECONDS);

	const updateTime = useCallback((startTime) => {
		const endTime = new Date();
		const msPassedStr = (endTime.getTime() - startTime.getTime()).toString();
		// console.log(msPassedStr);
		const formattedMSString = ('0000' + msPassedStr).slice(-5);
		// 00000 - first 2 are seconds, last 3 are the ms that have passed
		const updatedSeconds = MAX_SECONDS - parseInt(formattedMSString.substring(0, 2)) - 1;
		const updatedMs = 1000 - parseInt(formattedMSString.substring(formattedMSString.length - 3));
		console.log(addLeadingZeros(updatedSeconds, 2), addLeadingZeros(updatedMs, 3))
		setSeconds(addLeadingZeros(updatedSeconds, 2))
		setMs(addLeadingZeros(updatedMs, 3))
	}, [])


	const addLeadingZeros = (num, length) => {
		let zeros = '';
		for (let i = 0; i < length; i++) {
			zeros += '0'
		}
		return (zeros + num).slice(-length);
	}

		useEffect(() => {
			const currentTime = new Date();
			const interval = setInterval(() => updateTime(currentTime), 1);
			return () => clearInterval(interval);
		}, [updateTime]);

		useEffect(() => {
			if (seconds <= -1) {
				console.log('/gameOver');
				history.push('/gameOver');
			}
		}, [seconds, ms, history])

	return (
			<StyledGame>
				<StyledScore>Score: <Strong>{score}</Strong></StyledScore>
				<StyledCharacter>A</StyledCharacter>
				<Styledtimer>Time: <Strong>{seconds}: {ms}</Strong></Styledtimer>
			</StyledGame>
	);
}

export default Game;
