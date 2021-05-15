import AvailableLocation from "./AvailableLocation";
import { LocationModel } from "../../Models/LocationModel";
import React from "react";
import { Tile, Tiles } from "../Layout/Tiles";
import styled from "styled-components";
import { Maybe } from "../../Models/Maybe";
import NoResults from "../NoResults";

type AvailableLocationsProps = {
	locations: Maybe<LocationModel[]>;
	onLocationSelect: (location: LocationModel) => void;
};

const ClickableTile = styled(Tile)`
	cursor: pointer;
`;

const AvailableLocations: React.FC<AvailableLocationsProps> = ({ locations, onLocationSelect }) => {
	return locations.value ? (
		<Tiles>
			{locations.value.map((location) => (
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
