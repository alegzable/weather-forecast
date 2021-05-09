import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import styled from "styled-components";
import AvailableLocations from "./AvaliableLocations/AvailableLocations";
import { debounce } from "lodash";
import WeatherForecasts from "./WeatherForecasts/WeatherForecasts";
import { addToStorage, getFromStorage } from "../localStorageService";
import UnitsToggle from "./UnitsToggle";
import { TemperatureUnits } from "../Models/TemperatureUnits";
import { getLocations, getNearestLocationByCoords, getWeatherForecast } from "../Services/api";
import { TemperatureUnitsContext } from "../TemperatureUnitsContext";
import { LocationModel } from "../Models/LocationModel";
import { WeatherForecastModel } from "../Models/WeatherForecastModel";

const Container = styled.div`
	padding: 4rem;
`;

const SearchBar = styled.div`
	display: flex;
	align-items: center;
`;

const WeatherSearch = (): JSX.Element => {
	const [availableLocations, setAvailableLocations] = useState<LocationModel[]>([]);
	const [selectedLocation, setSelectedLocation] = useState<LocationModel>();
	const [weatherForecasts, setWeatherForecasts] = useState<WeatherForecastModel[]>([]);
	const [selectedTemperatureUnit, setSelectedTemperatureUnit] = useState<TemperatureUnits>("celcius");

	useEffect(() => {
		const lastSelectedLocation = getFromStorage<LocationModel>("LAST_SELECTED_LOCATION");

		if (lastSelectedLocation) {
			setSelectedLocation(lastSelectedLocation);
		} else {
			navigator.geolocation.getCurrentPosition(async (position) => {
				setSelectedLocation(
					await getNearestLocationByCoords(position.coords.latitude, position.coords.longitude)
				);
			});
		}
	}, []);

	useEffect(() => {
		async function setWeatherModelsAsync() {
			if (!selectedLocation) {
				setWeatherForecasts([]);
			} else {
				setWeatherForecasts(await getWeatherForecast(selectedLocation.name, selectedLocation.id, 3));
				addToStorage("LAST_SELECTED_LOCATION", selectedLocation);
			}
		}

		setWeatherModelsAsync();
	}, [selectedLocation]);

	const onSearchInputChange = async (searchPhrase: string) => {
		if (searchPhrase.trim() === "") {
			return;
		}

		const locations = await getLocations(searchPhrase);

		if (locations.length === 1) {
			const selectedLocation = locations[0];
			setSelectedLocation(selectedLocation);
		} else {
			setAvailableLocations(locations);
			setSelectedLocation(undefined);
		}
	};

	const debounceWaitPeriod = 1000;

	return (
		<Container>
			<TemperatureUnitsContext.Provider value={selectedTemperatureUnit}>
				<SearchBar>
					<SearchInput onChange={debounce(onSearchInputChange, debounceWaitPeriod)} />
					<UnitsToggle onChange={setSelectedTemperatureUnit} unit={selectedTemperatureUnit} />
				</SearchBar>

				{selectedLocation ? (
					<WeatherForecasts forecasts={weatherForecasts} />
				) : (
					<AvailableLocations
						locations={availableLocations}
						onLocationSelect={(location: LocationModel) => setSelectedLocation(location)}
					/>
				)}
			</TemperatureUnitsContext.Provider>
		</Container>
	);
};

export default WeatherSearch;
