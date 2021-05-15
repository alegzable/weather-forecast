import { Loader } from "./Loader";
import { render, screen } from "@testing-library/react";
import { testId as spinnerTestId } from "./Spinner";

describe("Loader tests", () => {
	const contentTestId = "content";

	test("Only shows spinner when loading", () => {
		render(<Loader isLoading>{<div data-testid={contentTestId}></div>}</Loader>);

		const spinner = screen.queryByTestId(spinnerTestId);
		const content = screen.queryByTestId(contentTestId);

		expect(spinner).toBeInTheDocument();
		expect(content).not.toBeInTheDocument();
	});

	test("Only shows content when not loading", () => {
		render(<Loader>{<div data-testid={contentTestId}></div>}</Loader>);

		const spinner = screen.queryByTestId(spinnerTestId);
		const content = screen.queryByTestId(contentTestId);

		expect(spinner).not.toBeInTheDocument();
		expect(content).toBeInTheDocument();
	});
});
