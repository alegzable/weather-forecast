import { useEffect, useState } from "react";
import { addToStorage, getFromStorage } from "../localStorageService";
import { TemperatureUnits } from "../Models/TemperatureUnits";
import { getLocations, getNearestLocationByCoords, getWeatherForecast } from "../Services/api";
import { LocationModel } from "../Models/LocationModel";
import { WeatherForecastModel } from "../Models/WeatherForecastModel";
import WeatherSearch from "../Components/WeatherSearch";
import { Maybe } from "../Models/Maybe";

const WeatherSearchPage = (): JSX.Element => {
	const [availableLocations, setAvailableLocations] = useState<Maybe<LocationModel[]>>({ value: [] });
	const [selectedLocation, setSelectedLocation] = useState<LocationModel>();
	const [weatherForecasts, setWeatherForecasts] = useState<WeatherForecastModel[]>([]);
	const [selectedTemperatureUnit, setSelectedTemperatureUnit] = useState<TemperatureUnits>("celcius");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [searchInputValue, setSearchInputValue] = useState<string>();

	useEffect(() => {
		setIsLoading(true);

		const lastSelectedLocation = getFromStorage<LocationModel>("LAST_SELECTED_LOCATION");

		if (lastSelectedLocation) {
			setSelectedLocation(lastSelectedLocation);
		} else {
			navigator.geolocation.getCurrentPosition(async (position) => {
				setSelectedLocation(
					await getNearestLocationByCoords(position.coords.latitude, position.coords.longitude)
				);

				setIsLoading(false);
			});
		}
	}, []);

	useEffect(() => {
		runLoadingAction(async () => {
			if (!selectedLocation) {
				setWeatherForecasts([]);
			} else {
				setWeatherForecasts(await getWeatherForecast(selectedLocation.name, selectedLocation.id, 3));
				addToStorage("LAST_SELECTED_LOCATION", selectedLocation);
			}

			if (selectedLocation) {
				setSearchInputValue(selectedLocation.name);
			}
		});
	}, [selectedLocation]);

	const onSearchInputChange = async (searchPhrase: string) => {
		setSearchInputValue(searchPhrase);
		if (searchPhrase.trim() === "") {
			return;
		}

		await runLoadingAction(async () => {
			const locations = await getLocations(searchPhrase);

			if (locations.length === 1) {
				const selectedLocation = locations[0];
				setSelectedLocation(selectedLocation);
			} else {
				setAvailableLocations({ value: locations.length > 0 ? locations : undefined });
				setSelectedLocation(undefined);
			}
		});
	};

	const runLoadingAction = async (action: () => Promise<void>) => {
		setIsLoading(true);
		await action();
		setIsLoading(false);
	};

	return (
		<WeatherSearch
			temperatureUnit={selectedTemperatureUnit}
			onTemperatureUnitChange={setSelectedTemperatureUnit}
			searchInputValue={searchInputValue}
			onSearchInputChange={onSearchInputChange}
			selectedLocation={selectedLocation}
			onSelectedLocationChange={setSelectedLocation}
			weatherForecasts={weatherForecasts}
			availableLocations={availableLocations}
			isLoading={isLoading}
			debounceWaitPeriod={300}
		/>
	);
};

export default WeatherSearchPage;
