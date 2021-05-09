import { useContext } from "react";
import { temperatureUnits } from "../../TemperatureUnits";
import { TemperatureUnitsContext } from "../../TemperatureUnitsContext";
import { toFahrenheit } from "../../Services/utils";
import { WeatherForecastModel } from "../../WeatherForecastModel";

type WeatherForecastProps = {
	forecast: WeatherForecastModel;
};

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast }: WeatherForecastProps) => {
	const temperatureUnitsContext = useContext(TemperatureUnitsContext);

	const toSelectedUnit = (tempCelcius: number) => {
		return temperatureUnitsContext === "celcius" ? tempCelcius : toFahrenheit(tempCelcius, 1);
	};

	const unit = temperatureUnits[temperatureUnitsContext];

	return (
		<div>
			<h3>
				{forecast.locationName} - {toSelectedUnit(forecast.tempCelcius)}
				{unit}
			</h3>
			<h3>{forecast.date}</h3>
			<p>
				{toSelectedUnit(forecast.minTempCelcius)} - {toSelectedUnit(forecast.maxTempCelcius)}
				{unit}
			</p>
			<p>Wind speed {forecast.windSpeed} mph</p>
			<p>{forecast.state}</p>
		</div>
	);
};

export default WeatherForecast;
