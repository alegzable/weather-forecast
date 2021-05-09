import { LocationModel } from "./LocationModel";
import { getNearestLocation, toNumber } from "./utils";
import { WeatherForecastModel } from "./WeatherForecastModel";

const proxy = "https://cors-anywhere.herokuapp.com";
const baseUrl = `${proxy}/https://www.metaweather.com/api/location`;

const getPhraseSearchUrl = (searchPhrase: string) => `${baseUrl}/search/?query=${searchPhrase}`;

const getCoordinateSearchUrl = (latitude: number, longitude: number) =>
	`${baseUrl}/search/?lattlong=${latitude},${longitude}`;

const getLocationIdUrl = (locationId: string) => `${baseUrl}/${locationId}`;

export const getLocations = async (searchPhrase: string) => {
	try {
		const response = await get<any[]>(getPhraseSearchUrl(searchPhrase));

		return response?.map((x) => new LocationModel(x.title, x.woeid));
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

		const weatherModels = response?.consolidated_weather
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

		return new LocationModel(nearestLocation.title, nearestLocation.woeid);
	} catch (error) {
		console.error(error);
	}
};

const get = async <T>(url: string): Promise<T> => {
	const response = await fetch(url);
	return (await response.json()) as T;
};
