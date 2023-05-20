import React, { useState, useEffect } from "react";
import { CheckboxGroup } from "../checkbox-group/checkbox-group";
import { SelectGroup } from "../select-group/select-group";
import styles from "./ability-configuration.module.css";

export const AbilityConfiguration = ({
	label,
	options,
	selectedOption,
	setSelectedOption,
	powerLevelOptions = [],
	selectedPowerlevel,
	setSelectedPowerlevel,
	upgradeOptions,
	selectedUpgrades,
	setSelectedUpgrades,
}) => {
	/* START - Options */
	const handleSelectChange = (event) => {
		setSelectedOption(event.target.value);
	};
	/* END - Options */

	/* START - Powerlevels */
	const [selectedPowerLevels, setSelectedPowerLevels] = useState([]);
	const [disabledPowerLevels, setDisabledPowerLevels] = useState([]);

	const onPowerLevelChange = (selectedValues) => {
		setSelectedPowerLevels(selectedValues); // set "multiple" for the downstream component
		setSelectedPowerlevel(
			selectedValues.length > 0 ? selectedValues[0] : undefined
		); // set "single" for the parent component
	};

	useEffect(() => {
		if (selectedPowerLevels.length > 0) {
			setDisabledPowerLevels(
				powerLevelOptions
					.filter(
						(option) => !selectedPowerLevels.includes(option.value)
					)
					.map((option) => option.value)
			);
		} else {
			setDisabledPowerLevels([]);
		}
	}, [powerLevelOptions, selectedPowerLevels]);

	useEffect(() => {
		setSelectedPowerLevels(
			selectedPowerlevel !== undefined ? [selectedPowerlevel] : []
		);
	}, [selectedPowerlevel]);
	/* END - Powerlevels */

	/* START - Upgrades */
	const [selectedInternalUpgrades, setSelectedInternalUpgrades] = useState([]);
	// const [disabledUpgrades, setDisabledUpgrades] = useState([]);

	const onUpgradesChange = (selectedValues) => {
		setSelectedInternalUpgrades(selectedValues); // set "multiple" for the downstream component
		setSelectedUpgrades(selectedValues); // set "multiple" for the parent component
	};

	// useEffect(() => {
	// 	if (selectedUpgrades.length > 0) {
	// 		setDisabledUpgrades(
	// 			upgradeOptions
	// 				.filter(
	// 					(option) => !selectedUpgrades.includes(option.value)
	// 				)
	// 				.map((option) => option.value)
	// 		);
	// 	} else {
	// 		setDisabledUpgrades([]);
	// 	}
	// }, [upgradeOptions, selectedUpgrades]);

	useEffect(() => {
		setSelectedInternalUpgrades(selectedUpgrades);
	}, [selectedUpgrades]);
	/* END - Upgrades */

	return (
		<div className={styles["container"]}>
			<SelectGroup
				label={label}
				value={[selectedOption]}
				onChange={handleSelectChange}
				options={options}
			/>
			{powerLevelOptions.length > 0 && (
				<CheckboxGroup
					className={styles["checkbox-container"]}
					label="Power Level"
					options={powerLevelOptions}
					selectedValues={selectedPowerLevels}
					disabledValues={disabledPowerLevels}
					onChange={onPowerLevelChange}
				/>
			)}
			{upgradeOptions.length > 0 && (
				<CheckboxGroup
					className={styles["checkbox-container"]}
					label="Upgrades"
					options={upgradeOptions}
					selectedValues={selectedInternalUpgrades}
					// disabledValues={disabledUpgrades}
					onChange={onUpgradesChange}
				/>
			)}
		</div>
	);
};
