import WeatherForecast from "./WeatherForecast";
import { WeatherForecastModel } from "./WeatherForecastModel";
import React from "react";
import { Tile, Tiles } from "./Layout/Tiles";

type WeatherForecastsProps = {
	forecasts: WeatherForecastModel[];
};

const WeatherForecasts: React.FC<WeatherForecastsProps> = ({ forecasts }: WeatherForecastsProps) => {
	return (
		<Tiles>
			{forecasts.map((forecast) => (
				<Tile key={forecast.id}>
					<WeatherForecast forecast={forecast} />
				</Tile>
			))}
		</Tiles>
	);
};

export default WeatherForecasts;
