import styled from "styled-components";

export const StyledGame = styled.div`
	height: 75vh;
	max-height: 500px;
	display: grid;
	grid-template-rows: 50px 1fr;
	grid-template-columns: minmax(50px, auto) 1fr minmax(50px, auto);
`
export const StyledScore = styled.p`
	font-size: 1.5rem;
`
export const Styledtimer = styled.p`
	font-size: 1.5rem;
	grid-column: 3;
`
export const StyledCharacter = styled.p`
	font-size: 9rem;
	grid-row: 2;
	grid-column: 1/4;
	text-align: center;
	color: var(--accent-color);
`
export const StyledShowAnswer = styled.button`
	grid-column: 2;
	margin: 0 auto;
	font-size: 1.5rem;
	padding: 2rem;
	line-height: 0;
	min-width: fit-content;
`
