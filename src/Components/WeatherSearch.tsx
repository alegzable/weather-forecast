import { debounce } from "lodash";
import React from "react";
import styled from "styled-components";
import { LocationModel } from "../Models/LocationModel";
import { TemperatureUnits } from "../Models/TemperatureUnits";
import { WeatherForecastModel } from "../Models/WeatherForecastModel";
import { TemperatureUnitsContext } from "../TemperatureUnitsContext";
import AvailableLocations from "./AvaliableLocations/AvailableLocations";
import { Loader } from "./Layout/Loader";
import SearchInput from "./SearchInput";
import UnitsToggle from "./UnitsToggle";
import WeatherForecasts from "./WeatherForecasts/WeatherForecasts";

const Container = styled.div`
	padding: 4rem;
	height: 100%;
`;

const SearchBar = styled.div`
	display: flex;
	align-items: center;
`;

type WeatherSearchProps = {
	temperatureUnit: TemperatureUnits;
	onTemperatureUnitChange: (unit: TemperatureUnits) => void;
	onSearchInputChange: (searchPhrase: string) => void;
	selectedLocation: LocationModel | undefined;
	onSelectedLocationChange: (location: LocationModel) => void;
	weatherForecasts: WeatherForecastModel[];
	availableLocations: LocationModel[];
	debounceWaitPeriod?: number;
	isLoading: boolean;
};

const WeatherSearch: React.FC<WeatherSearchProps> = ({
	temperatureUnit,
	onTemperatureUnitChange,
	onSearchInputChange,
	selectedLocation,
	onSelectedLocationChange,
	weatherForecasts,
	availableLocations,
	debounceWaitPeriod,
	isLoading,
}) => {
	return (
		<Container>
			<TemperatureUnitsContext.Provider value={temperatureUnit}>
				<SearchBar>
					<SearchInput onChange={debounce(onSearchInputChange, debounceWaitPeriod)} />
					<UnitsToggle onChange={onTemperatureUnitChange} unit={temperatureUnit} />
				</SearchBar>
				<Loader isLoading={isLoading}>
					{selectedLocation ? (
						<WeatherForecasts forecasts={weatherForecasts} />
					) : (
						<AvailableLocations
							locations={availableLocations}
							onLocationSelect={(location: LocationModel) => onSelectedLocationChange(location)}
						/>
					)}
				</Loader>
			</TemperatureUnitsContext.Provider>
		</Container>
	);
};

export default WeatherSearch;
