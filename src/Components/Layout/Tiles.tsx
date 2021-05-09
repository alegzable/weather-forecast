import styled from "styled-components";

export const Tiles = styled.ul`
	width: 100%;
	margin-top: 4rem;
	text-align: center;
	display: grid;
	grid-gap: 2rem;
	grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
`;

export const Tile = styled.li`
	border-radius: 0.4rem;
	padding: 1rem 0;
	background-color: #042655;
	color: #f0f8ff;
`;
