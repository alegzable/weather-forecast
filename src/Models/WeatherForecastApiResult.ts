export type WeatherForecastApiResult = {
	consolidated_weather: {
		id: number;
		applicable_date: string;
		the_temp: number;
		min_temp: number;
		max_temp: number;
		weather_state_name: string;
		wind_speed: number;
	}[];
};
