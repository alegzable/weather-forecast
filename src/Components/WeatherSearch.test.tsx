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

		const selectedLocation = new LocationModel("Location 1", "1");

		const weatherForecasts: WeatherForecastModel[] = [
			new WeatherForecastModel("1", "Location 1", "2021-01-01", 10, 5, 10, "Sunny", 5),
		];

		const { rerender } = render(
			<WeatherSearch
				temperatureUnit={selectedTemperatureUnit}
				onTemperatureUnitChange={setSelectedTemperatureUnit}
				onSearchInputChange={jest.fn}
				selectedLocation={selectedLocation}
				onSelectedLocationChange={jest.fn}
				weatherForecasts={weatherForecasts}
				availableLocations={[]}
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
				availableLocations={[]}
			/>
		);

		expect(screen.queryByText(`Location 1 - 50${temperatureUnits.fahrenheit}`)).toBeInTheDocument();
		expect(screen.queryByText(`41 - 50${temperatureUnits.fahrenheit}`)).toBeInTheDocument();
	});

	test("Searching displays matching locations", async () => {
		const searchPhrase = "Test";
		const allMatchingLocations = [
			new LocationModel(`${searchPhrase} 1`, "1"),
			new LocationModel(`${searchPhrase} 2`, "2"),
			new LocationModel(`${searchPhrase} 3`, "3"),
		];
		const notMatchingLocation = new LocationModel("Some Name", "4");
		let availableLocations: LocationModel[] = [];

		const onSearchInputChange = (value: string) => {
			availableLocations = [...allMatchingLocations.filter((x) => x.name.includes(value))];
		};

		let { rerender } = render(
			<WeatherSearch
				temperatureUnit={"celcius"}
				onTemperatureUnitChange={jest.fn}
				onSearchInputChange={onSearchInputChange}
				selectedLocation={undefined}
				onSelectedLocationChange={jest.fn}
				weatherForecasts={[]}
				availableLocations={availableLocations}
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
				availableLocations={availableLocations}
			/>
		);

		allMatchingLocations.forEach((location) => {
			expect(screen.queryByText(location.name)).toBeInTheDocument();
		});

		expect(screen.queryByText(notMatchingLocation.name)).not.toBeInTheDocument();
	});
});
