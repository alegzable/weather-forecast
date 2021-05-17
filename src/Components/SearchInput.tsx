import React, { useEffect, useState } from "react";
import styled from "styled-components";

type SearchInputProps = {
	value?: string;
	onChange: (value: string) => void;
};

export const testId = "searchInput";

const Input = styled.input`
	flex: 1;
	height: 4rem;
	padding: 0.8rem;
	font-size: 1.8rem;
	border-radius: 0.4rem;
	background-color: #f0f8ff;
`;

const SearchInput: React.FC<SearchInputProps> = ({ value = "", onChange }) => {
	const [inputValue, setInputValue] = useState(value);

	useEffect(() => {
		setInputValue(value);
	}, [value]);

	return (
		<Input
			value={inputValue}
			type="text"
			placeholder="Search..."
			onChange={(e) => {
				setInputValue(e.target.value);
				onChange(e.target.value);
			}}
			data-testid={testId}
		/>
	);
};

export default SearchInput;
