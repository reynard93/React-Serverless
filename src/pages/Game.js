import React, {useCallback, useEffect, useState} from 'react';
import {StyledCharacter, StyledGame, StyledScore, Styledtimer} from "../styled/Game";
import {Strong} from "../styled/Random";
import {questions as QUESTIONS} from "./questions";

function Game({history}) {
	const [score, setScore] = useState(0);
	const questions = Object.entries(QUESTIONS);
	const questionsLength = 38;
	const [currentQuestion, setCurrentQuestion] = useState(['','']);
	const MAX_SECONDS = 100;
	const [ms, setMs] = useState(0);
	const [seconds, setSeconds] = useState(MAX_SECONDS);

	const setRandomQuestion = useCallback(() => {
		const randomQuestionIndex = Math.floor(Math.random() * questionsLength);
		console.log(questions, 'hjave questiosn ehre??')
		console.log(randomQuestionIndex, 'what my indedx')
		setCurrentQuestion(questions[randomQuestionIndex]);
	}, [questions])

	const updateTime = useCallback((startTime) => {
		const endTime = new Date();
		const msPassedStr = (endTime.getTime() - startTime.getTime()).toString();
		// console.log(msPassedStr);
		const formattedMSString = ('0000' + msPassedStr).slice(-5);
		// 00000 - first 2 are seconds, last 3 are the ms that have passed
		const updatedSeconds = MAX_SECONDS - parseInt(formattedMSString.substring(0, 2)) - 1;
		const updatedMs = 1000 - parseInt(formattedMSString.substring(formattedMSString.length - 3));
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
			const questionInterval = setInterval(() => setRandomQuestion(), 2000); // to be adjusted frm ui
			const interval = setInterval(() => updateTime(currentTime), 1);
			return () => {
				clearInterval(questionInterval);
				clearInterval(interval);
			}
		}, [setRandomQuestion, updateTime]);

		useEffect(() => {
			if (seconds <= -1) {
				console.log('/gameOver');
				history.push('/gameOver');
			}
		}, [seconds, ms, history, questions])

	const keyUpHandler = (e) => {
			console.log(e.key);
	}

	useEffect(() => {
		document.addEventListener('keyup', keyUpHandler)
		return () => {
			document.removeEventListener('keyup', keyUpHandler);
		}
	}, [])

	return (
			<StyledGame>
				<StyledScore>Score: <Strong>{score}</Strong></StyledScore>
				<StyledCharacter>{currentQuestion[1]}</StyledCharacter>
				<Styledtimer>Time: <Strong>{seconds}: {ms}</Strong></Styledtimer>
			</StyledGame>
	);
}

export default Game;
