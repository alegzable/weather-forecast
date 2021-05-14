import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const AnimatedSpinner = styled(FontAwesomeIcon)`
	color: white;
	font-size: 2.4rem;
	transform: translate(-50%, -50%);
	animation: rotation 1s infinite linear;

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;

const SpinnerContainer = styled.div`
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Spinner = () => (
	<SpinnerContainer>
		<AnimatedSpinner icon={faSpinner} />
	</SpinnerContainer>
);

export default Spinner;
