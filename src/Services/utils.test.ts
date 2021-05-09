import { getNearestLocation } from "./utils";

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
