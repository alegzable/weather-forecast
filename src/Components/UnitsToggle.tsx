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

const UnitsToggle: React.FC<UnitsToggleProps> = ({ onChange, unit }: UnitsToggleProps) => {
	const handleChange = (checked: boolean) => {
		const newUnit: TemperatureUnits = checked ? "fahrnheit" : "celcius";
		onChange(newUnit);
	};

	const toggleName = "tempUnitToggle";

	return (
		<Label htmlFor={toggleName}>
			<span>{temperatureUnits.celcius}</span>
			<Toggle
				name={toggleName}
				leftBackgroundColor="white"
				rightBackgroundColor="white"
				borderColor="#3887b7"
				knobColor="#3887b7"
				onToggle={(e: any) => handleChange(e.target.checked)}
				checked={unit === "fahrnheit"}
			/>
			<span>{temperatureUnits.fahrnheit}</span>
		</Label>
	);
};

export default UnitsToggle;
