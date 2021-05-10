export const temperatureUnits = {
	celcius: `${String.fromCharCode(176)}C`,
	fahrenheit: "F",
} as const;

export type TemperatureUnits = keyof typeof temperatureUnits;
