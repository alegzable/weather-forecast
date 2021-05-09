const proxy = "https://cors-anywhere.herokuapp.com";
const baseUrl = `${proxy}/https://www.metaweather.com/api/location`;

export const getPhraseSearchUrl = (searchPhrase: string) => `${baseUrl}/search/?query=${searchPhrase}`;

export const getCoordinateSearchUrl = (latitude: number, longitude: number) =>
	`${baseUrl}/search/?lattlong=${latitude},${longitude}`;

export const getLocationIdUrl = (locationId: string) => `${baseUrl}/${locationId}`;
