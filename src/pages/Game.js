import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyledCharacter, StyledGame, StyledScore, StyledShowAnswer, Styledtimer} from "../styled/Game";
import {Strong} from "../styled/Random";
import {questions as QUESTIONS} from "./questions";
import {fromEvent, timer} from "rxjs";
import {map, tap} from "rxjs/operators";
import {keyCombo} from "../Utils/combo";
import {useScore} from "../contexts/ScoreContext";

// Todo: some more obvious effect of scoring , green box when user enters correct
// Todo: Which category of Vim thing to practice on
// Todo: when shown, allow hover to show tooltip - 'hide'
// Todo: fix delayed navigation

function Game({history}) {
	const [score, setScore] = useScore();
	const [showingAnswer, setShowAnswer] = useState(false);
	const questionsLength = Object.entries(QUESTIONS).length;
	const QUESTION_MILISECONDS = 3000;
	const [currentQuestion, setCurrentQuestion] = useState(['','']);
	const MAX_SECONDS = 10;
	const [ms, setMs] = useState(0);
	const [seconds, setSeconds] = useState(MAX_SECONDS);
	const keyWatcherRef = useRef(fromEvent(document, "keypress").pipe(
			map(event => event.key)))

	const setRandomQuestion = useCallback(() => {
		const questions = Object.entries(QUESTIONS);
		const randomQuestionIndex = Math.floor(Math.random() * questionsLength);
		setCurrentQuestion(questions[randomQuestionIndex]);
	}, [questionsLength])

	useEffect(() => {
		setScore(0)
	},[setScore])

	const updateTime = useCallback((startTime) => {
		const endTime = new Date();
		const msPassedStr = (endTime.getTime() - startTime.getTime()).toString();
		// console.log(msPassedStr);
		const formattedMSString = ('0000' + msPassedStr).slice(-5);
		// 00000 - first 2 are seconds, last 3 are the ms that have passed
		const updatedSeconds = MAX_SECONDS - parseInt(formattedMSString.substring(0, 2)) - 1;
		const updatedMs = 1000 - parseInt(formattedMSString.substring(formattedMSString.length - 3));
		setSeconds(addLeadingZeros(updatedSeconds, 3))
		setMs(addLeadingZeros(updatedMs, 3))
	}, []);

	const addLeadingZeros = (num, length) => {
		let zeros = '';
		for (let i = 0; i < length; i++) {
			zeros += '0'
		}
		// console.log((zeros + num)) , if seconds <= -1, but setSeconds length 3 doesnt work, dk y
		return (zeros + num).slice(-length);
	}

	const showAnswer = useCallback(() => {
		setShowAnswer(!showingAnswer);
	}, [showingAnswer])

	useEffect(() => {
		let keyWatcherSub;
		if (currentQuestion) {
			keyWatcherSub = keyCombo(currentQuestion[0].split(''), keyWatcherRef.current)
					.subscribe((res) => {
						setScore((prevScore) => prevScore + 1);
						console.log(res, ' success in executing combo');
					});
		}
		return () => {
			if (keyWatcherSub) {
				keyWatcherSub.unsubscribe();
			}
		}
	}, [currentQuestion, setScore])

	useEffect(() => {
		const questionInterval = timer(0,QUESTION_MILISECONDS)
				.pipe(
						tap(() => {
							setRandomQuestion();
						})
				).subscribe();
		return () => {
			questionInterval.unsubscribe();
		}
	}, [setRandomQuestion, score]);

	useEffect(() => {
		const currentTime = new Date();
		const interval = setInterval(() => updateTime(currentTime), 1);
		return () => {
			clearInterval(interval);
		}
	}, [updateTime])

	useEffect(() => {
		if (parseInt(seconds) <= 0) {
			// Todo: Save the score
			history.push('/gameOver');
		}
	}, [seconds, ms, history])

	return (
			<StyledGame>
				<StyledScore>Score: <Strong>{score}</Strong></StyledScore>
				<StyledShowAnswer onClick={showAnswer}>{showingAnswer ? currentQuestion[0] : 'SHOW'}</StyledShowAnswer>
				<StyledCharacter>{currentQuestion[1]}</StyledCharacter>
				<Styledtimer>Time: <Strong>{seconds}: {ms}</Strong></Styledtimer>
			</StyledGame>
	);
}

export default Game;
