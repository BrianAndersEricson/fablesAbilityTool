import React from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export const SelectGroup = ({
    label,
    value,
    onChange,
    options
}) => {
	return (
		<FormControl>
			<InputLabel shrink htmlFor="select-multiple-native">
				{label}
			</InputLabel>
			<Select
				multiple
				native
				value={value}
				onChange={onChange}
				label="Native"
				inputProps={{
					id: "select-multiple-native",
				}}
			>
				{options.map((name) => (
					<option key={name} value={name}>
						{name}
					</option>
				))}
			</Select>
		</FormControl>
	);
};
