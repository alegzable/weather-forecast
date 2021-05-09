export const temperatureUnits = {
	celcius: `${String.fromCharCode(176)}C`,
	fahrnheit: "F",
} as const;

export type TemperatureUnits = keyof typeof temperatureUnits;
