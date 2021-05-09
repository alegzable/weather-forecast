export class WeatherForecastModel {
	public constructor(
		public id: string,
		public locationName: string,
		public date: string,
		public tempCelcius: number,
		public minTempCelcius: number,
		public maxTempCelcius: number,
		public state: string,
		public windSpeed: number
	) {}
}
