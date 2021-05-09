import { useEffect, useState } from "react";
import { WeatherForecastModel } from "./WeatherForecastModel";
import SearchInput from "./SearchInput";
import styled from "styled-components";
import { LocationModel } from "./LocationModel";
import AvailableLocations from "./AvailableLocations";
import { debounce } from "lodash";
import WeatherForecasts from "./WeatherForecasts";
import { getNearestLocation, toNumber } from "./utils";
import { addToStorage, getFromStorage } from "./localStorageService";
import UnitsToggle from "./UnitsToggle";
import { TemperatureUnits } from "./TemperatureUnits";
import React from "react";
import { getCoordinateSearchUrl, getLocationIdUrl, getPhraseSearchUrl } from "./api";

const Container = styled.div`
	padding: 4rem;
`;

const SearchBar = styled.div`
	display: flex;
	align-items: center;
`;

export const TemperatureUnitsContext = React.createContext<TemperatureUnits>("celcius");

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

async function getLocations(searchPhrase: string) {
	const response = await fetch(getPhraseSearchUrl(searchPhrase));
	const jsonResponse = await response.json();

	return (jsonResponse as any[]).map((x) => new LocationModel(x.title, x.woeid));
}

async function getWeatherForecast(
	locationName: string,
	locationId: string,
	days: number
): Promise<WeatherForecastModel[]> {
	const response = await fetch(getLocationIdUrl(locationId));
	const jsonResponse = await response.json();

	const weatherModels = (jsonResponse.consolidated_weather as any[])
		.slice(0, days)
		.map(
			(x) =>
				new WeatherForecastModel(
					x.id,
					locationName,
					x.applicable_date,
					toNumber(x.the_temp, 1),
					toNumber(x.min_temp, 1),
					toNumber(x.max_temp, 1),
					x.weather_state_name,
					toNumber(x.wind_speed, 1)
				)
		);

	return weatherModels;
}

async function getNearestLocationByCoords(latitude: number, longitude: number) {
	const response = await fetch(getCoordinateSearchUrl(latitude, longitude));
	const jsonResponse = await response.json();

	const nearestLocation = getNearestLocation(jsonResponse as any[]);

	return new LocationModel(nearestLocation.title, nearestLocation.woeid);
}
