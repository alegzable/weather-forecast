import { round } from "lodash";
import { LocationApiResult } from "../Models/LocationApiResult";

export const getNearestLocation = (location: LocationApiResult[]): LocationApiResult | undefined => {
	if (location.length === 0) {
		return undefined;
	}

	return location.reduce((a, b) => {
		return a.distance < b.distance ? a : b;
	});
};

export const toFahrenheit = (tempCelcius: number, digits: number): number => {
	return round(tempCelcius * 1.8 + 32, digits);
};
