import { LocationModel } from "../../Models/LocationModel";

type AvailableLocationProps = {
	location: LocationModel;
};

const AvailableLocation: React.FC<AvailableLocationProps> = ({ location }) => {
	return (
		<div>
			<h3>{location.name}</h3>
		</div>
	);
};

export default AvailableLocation;
