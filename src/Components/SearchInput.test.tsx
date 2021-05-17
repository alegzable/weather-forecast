import { fireEvent, render, screen } from "@testing-library/react";
import SearchInput, { testId as searchInputTestId } from "./SearchInput";

describe("SearchInput tests", () => {
	test("Displays initial value", () => {
		const initialValue = "Initial Value";

		render(<SearchInput value={initialValue} onChange={jest.fn} />);

		expect(screen.getByTestId(searchInputTestId)).toHaveValue(initialValue);
	});

	test("Changes value on internal change event", () => {
		const initialValue = "Initial Value";

		render(<SearchInput value={initialValue} onChange={jest.fn} />);

		const searchInput = screen.getByTestId(searchInputTestId);
		const newValue = "New Value";

		fireEvent.change(searchInput, { target: { value: newValue } });

		expect(searchInput).toHaveValue(newValue);
	});

	test("Changes value after receiving new value prop", () => {
		const initialValue = "Initial Value";

		const { rerender } = render(<SearchInput value={initialValue} onChange={jest.fn} />);

		const newValue = "New Value";

		rerender(<SearchInput value={newValue} onChange={jest.fn} />);

		const searchInput = screen.getByTestId(searchInputTestId);

		expect(searchInput).toHaveValue(newValue);
	});

	test("Runs onChange from props", () => {
		let initialValue = "Initial Value";

		render(<SearchInput onChange={(value) => (initialValue = value)} />);

		const newValue = "New Value";

		fireEvent.change(screen.getByTestId(searchInputTestId), { target: { value: newValue } });

		expect(initialValue).toBe(newValue);
	});
});
