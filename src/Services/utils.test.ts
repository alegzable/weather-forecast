import { getNearestLocation, toFahrenheit } from "./utils";

describe("getNearestLocation", () => {
	test("returns nearest element", () => {
		const expectedNearest = { distance: 1 };
		const array = [{ distance: 2 }, { distance: 3 }, expectedNearest];

		const result = getNearestLocation(array);

		expect(result).toBe(expectedNearest);
	});

	test("returns null when array is empty", () => {
		const result = getNearestLocation([]);

		expect(result).toBe(null);
	});
});

describe("toFahrenheit", () => {
	const cases = [
		{
			celcius: -15,
			fahrenheit: 5,
		},
		{
			celcius: 5,
			fahrenheit: 41,
		},
		{
			celcius: 10,
			fahrenheit: 50,
		},
		{ celcius: 20.3, fahrenheit: 68.5 },
	];

	test.each(cases)("[%s] correctly converts celcius to fahrenheit", (testCase) => {
		const result = toFahrenheit(testCase.celcius, 1);

		expect(result).toBe(testCase.fahrenheit);
	});
});
