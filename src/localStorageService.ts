const localStorageKeys = "LAST_SELECTED_LOCATION";

export const addToStorage = (key: typeof localStorageKeys, value: unknown) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getFromStorage = <T>(key: typeof localStorageKeys): T | undefined => {
	const json = localStorage.getItem(key);

	if (json === null) {
		return undefined;
	}

	return JSON.parse(json);
};
