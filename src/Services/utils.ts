export const getNearestLocation = (array: { distance: number }[]): any => {
	if (array.length === 0) {
		return null;
	}

	return array.reduce((a, b) => {
		return a.distance < b.distance ? a : b;
	});
};

export const toNumber = (value: string, digits: number): number => {
	return round(+value, digits);
};

export const toFahrenheit = (tempCelcius: number, digits: number): number => {
	return round(tempCelcius * 1.8 + 32, digits);
};

const round = (value: number, digits: number): number => {
	return +value.toFixed(digits);
};
