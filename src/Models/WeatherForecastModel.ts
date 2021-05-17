export type WeatherForecastModel = {
	id: number;
	locationName: string;
	date: string;
	tempCelcius: number;
	minTempCelcius: number;
	maxTempCelcius: number;
	state: string;
	windSpeed: number;
};
