import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LocationModel } from "../Models/LocationModel";
import { temperatureUnits, TemperatureUnits } from "../Models/TemperatureUnits";
import { WeatherForecastModel } from "../Models/WeatherForecastModel";
import { testId as searchInputTestId } from "./SearchInput";
import { testId as unitsToggleTestId } from "./UnitsToggle";
import WeatherSearch from "./WeatherSearch";

describe("WeatherSearch tests", () => {
	test("Toggle temperature units renders correct results", () => {
		let selectedTemperatureUnit: TemperatureUnits = "celcius";

		const setSelectedTemperatureUnit = (unit: TemperatureUnits) => {
			selectedTemperatureUnit = unit;
		};

		const selectedLocation = { name: "Location 1", id: 1 };

		const weatherForecasts: WeatherForecastModel[] = [
			{
				id: 1,
				locationName: "Location 1",
				date: "2021-01-01",
				tempCelcius: 10,
				minTempCelcius: 5,
				maxTempCelcius: 10,
				state: "Sunny",
				windSpeed: 5,
			},
		];

		const { rerender } = render(
			<WeatherSearch
				temperatureUnit={selectedTemperatureUnit}
				onTemperatureUnitChange={setSelectedTemperatureUnit}
				onSearchInputChange={jest.fn}
				selectedLocation={selectedLocation}
				onSelectedLocationChange={jest.fn}
				weatherForecasts={weatherForecasts}
				availableLocations={{ value: [] }}
				isLoading={false}
			/>
		);

		expect(screen.queryByText(`Location 1 - 10${temperatureUnits.celcius}`)).toBeInTheDocument();
		expect(screen.queryByText(`5 - 10${temperatureUnits.celcius}`)).toBeInTheDocument();

		fireEvent.click(screen.getByTestId(unitsToggleTestId));

		expect(selectedTemperatureUnit).toBe("fahrenheit");

		rerender(
			<WeatherSearch
				temperatureUnit={selectedTemperatureUnit}
				onTemperatureUnitChange={setSelectedTemperatureUnit}
				onSearchInputChange={jest.fn}
				selectedLocation={selectedLocation}
				onSelectedLocationChange={jest.fn}
				weatherForecasts={weatherForecasts}
				availableLocations={{ value: [] }}
				isLoading={false}
			/>
		);

		expect(screen.queryByText(`Location 1 - 50${temperatureUnits.fahrenheit}`)).toBeInTheDocument();
		expect(screen.queryByText(`41 - 50${temperatureUnits.fahrenheit}`)).toBeInTheDocument();
	});

	test("Searching displays matching locations", async () => {
		const searchPhrase = "Test";
		const allMatchingLocations = [
			{ name: `${searchPhrase} 1`, id: 1 },
			{ name: `${searchPhrase} 2`, id: 2 },
			{ name: `${searchPhrase} 3`, id: 3 },
		];
		const notMatchingLocation = { name: "Some Name", id: "4" };
		let availableLocations: LocationModel[] = [];

		const onSearchInputChange = (value: string) => {
			availableLocations = [...allMatchingLocations.filter((x) => x.name.includes(value))];
		};

		const { rerender } = render(
			<WeatherSearch
				temperatureUnit={"celcius"}
				onTemperatureUnitChange={jest.fn}
				onSearchInputChange={onSearchInputChange}
				selectedLocation={undefined}
				onSelectedLocationChange={jest.fn}
				weatherForecasts={[]}
				availableLocations={{ value: availableLocations }}
				isLoading={false}
			/>
		);

		expect(screen.queryByText(searchPhrase)).not.toBeInTheDocument();

		fireEvent.change(screen.getByTestId(searchInputTestId), { target: { value: searchPhrase } });

		await waitFor(() => {
			expect(availableLocations.length).toBe(3);
		});

		rerender(
			<WeatherSearch
				temperatureUnit={"celcius"}
				onTemperatureUnitChange={jest.fn}
				onSearchInputChange={onSearchInputChange}
				selectedLocation={undefined}
				onSelectedLocationChange={jest.fn}
				weatherForecasts={[]}
				availableLocations={{ value: availableLocations }}
				isLoading={false}
			/>
		);

		allMatchingLocations.forEach((location) => {
			expect(screen.queryByText(location.name)).toBeInTheDocument();
		});

		expect(screen.queryByText(notMatchingLocation.name)).not.toBeInTheDocument();
	});
});
