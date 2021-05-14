import { LocationModel } from "../Models/LocationModel";
import { getNearestLocation, toNumber } from "./utils";
import { WeatherForecastModel } from "../Models/WeatherForecastModel";

const proxy = "https://cors-anywhere.herokuapp.com";
const baseUrl = `${proxy}/https://www.metaweather.com/api/location`;

const getPhraseSearchUrl = (searchPhrase: string) => `${baseUrl}/search/?query=${searchPhrase}`;

const getCoordinateSearchUrl = (latitude: number, longitude: number) =>
	`${baseUrl}/search/?lattlong=${latitude},${longitude}`;

const getLocationIdUrl = (locationId: string) => `${baseUrl}/${locationId}`;

export const getLocations = async (searchPhrase: string): Promise<LocationModel[]> => {
	try {
		const response = await get<any[]>(getPhraseSearchUrl(searchPhrase));

		return response?.map((x) => {
			return { name: x.title, id: x.woeid };
		});
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const getWeatherForecast = async (
	locationName: string,
	locationId: string,
	days: number
): Promise<WeatherForecastModel[]> => {
	try {
		const response = await get<{ consolidated_weather: any[] }>(getLocationIdUrl(locationId));

		const weatherModels = response?.consolidated_weather.slice(0, days).map((x) => {
			return {
				id: x.id,
				locationName: locationName,
				date: x.applicable_date,
				tempCelcius: toNumber(x.the_temp, 1),
				minTempCelcius: toNumber(x.min_temp, 1),
				maxTempCelcius: toNumber(x.max_temp, 1),
				state: x.weather_state_name,
				windSpeed: toNumber(x.wind_speed, 1),
			};
		});

		return weatherModels;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const getNearestLocationByCoords = async (
	latitude: number,
	longitude: number
): Promise<LocationModel | undefined> => {
	try {
		const response = await get<any[]>(getCoordinateSearchUrl(latitude, longitude));

		const nearestLocation = getNearestLocation(response || []);

		return { name: nearestLocation.title, id: nearestLocation.woeid };
	} catch (error) {
		console.error(error);
	}
};

const get = async <T>(url: string): Promise<T> => {
	const response = await fetch(url);
	return (await response.json()) as T;
};
