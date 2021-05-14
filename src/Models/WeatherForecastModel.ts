export type WeatherForecastModel = {
	id: string;
	locationName: string;
	date: string;
	tempCelcius: number;
	minTempCelcius: number;
	maxTempCelcius: number;
	state: string;
	windSpeed: number;
};
