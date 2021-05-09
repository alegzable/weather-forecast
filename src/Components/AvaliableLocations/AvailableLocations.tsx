import AvailableLocation from "./AvailableLocation";
import { LocationModel } from "../../LocationModel";
import React from "react";
import { Tile, Tiles } from "../Layout/Tiles";
import styled from "styled-components";

type AvailableLocationsProps = {
	locations: LocationModel[];
	onLocationSelect: (location: LocationModel) => void;
};

const ClickableTile = styled(Tile)`
	cursor: pointer;
`;

const AvailableLocations: React.FC<AvailableLocationsProps> = ({
	locations,
	onLocationSelect,
}: AvailableLocationsProps) => {
	return (
		<Tiles>
			{locations.map((location) => (
				<ClickableTile key={location.id} onClick={() => onLocationSelect(location)}>
					<AvailableLocation location={location} />
				</ClickableTile>
			))}
		</Tiles>
	);
};

export default AvailableLocations;
