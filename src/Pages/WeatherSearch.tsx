import { useEffect, useState } from "react";
import { addToStorage, getFromStorage } from "../localStorageService";
import { TemperatureUnits } from "../Models/TemperatureUnits";
import { getLocations, getNearestLocationByCoords, getWeatherForecast } from "../Services/api";
import { LocationModel } from "../Models/LocationModel";
import { WeatherForecastModel } from "../Models/WeatherForecastModel";
import WeatherSearch from "../Components/WeatherSearch";

const WeatherSearchPage = (): JSX.Element => {
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

	return (
		<WeatherSearch
			temperatureUnit={selectedTemperatureUnit}
			onTemperatureUnitChange={setSelectedTemperatureUnit}
			onSearchInputChange={onSearchInputChange}
			selectedLocation={selectedLocation}
			onSelectedLocationChange={setSelectedLocation}
			weatherForecasts={weatherForecasts}
			availableLocations={availableLocations}
			debounceWaitPeriod={1000}
		/>
	);
};

export default WeatherSearchPage;
