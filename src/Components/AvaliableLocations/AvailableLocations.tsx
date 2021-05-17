import AvailableLocation from "./AvailableLocation";
import { LocationModel } from "../../Models/LocationModel";
import React from "react";
import { Tile, Tiles } from "../Layout/Tiles";
import styled from "styled-components";
import NoResults from "../NoResults";

type AvailableLocationsProps = {
	locations?: LocationModel[];
	onLocationSelect: (location: LocationModel) => void;
};

const ClickableTile = styled(Tile)`
	cursor: pointer;
`;

const AvailableLocations: React.FC<AvailableLocationsProps> = ({ locations, onLocationSelect }) => {
	return locations ? (
		<Tiles>
			{locations.map((location) => (
				<ClickableTile key={location.id} onClick={() => onLocationSelect(location)}>
					<AvailableLocation location={location} />
				</ClickableTile>
			))}
		</Tiles>
	) : (
		<NoResults />
	);
};

export default AvailableLocations;
