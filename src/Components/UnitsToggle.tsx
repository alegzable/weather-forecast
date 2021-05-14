import React from "react";
import { Toggle } from "react-toggle-component";
import styled from "styled-components";
import { temperatureUnits, TemperatureUnits } from "../Models/TemperatureUnits";

type UnitsToggleProps = {
	onChange: (unit: TemperatureUnits) => void;
	unit: TemperatureUnits;
};

const Label = styled.label`
	color: white;
	font-size: 2rem;
	margin-left: 1rem;
`;

export const testId = "tempUnitToggle";

const UnitsToggle: React.FC<UnitsToggleProps> = ({ onChange, unit }) => {
	const handleChange = (checked: boolean) => {
		const newUnit: TemperatureUnits = checked ? "fahrenheit" : "celcius";
		onChange(newUnit);
	};

	return (
		<Label htmlFor={testId}>
			<span>{temperatureUnits.celcius}</span>
			<Toggle
				name={testId}
				leftBackgroundColor="white"
				rightBackgroundColor="white"
				borderColor="#3887b7"
				knobColor="#3887b7"
				onToggle={(e: any) => {
					handleChange(e.target.checked);
				}}
				checked={unit === "fahrenheit"}
				data-testid={testId}
			/>
			<span>{temperatureUnits.fahrenheit}</span>
		</Label>
	);
};

export default UnitsToggle;
