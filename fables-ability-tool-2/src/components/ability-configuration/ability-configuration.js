import {union} from 'lodash-es';
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
	disabledPowerlevels = [],
	upgradeOptions = [],
	selectedUpgrades,
	setSelectedUpgrades,
}) => {
	/* START - Options */
	const handleSelectChange = (event) => {
		const { options } = event.target;
		let selections = [...options]
			.filter((option) => option.selected)
			.map((option) => option.value)
			.slice(0, 1);
		console.log("onchange", event.target.value, selections);
		setSelectedOption(selections.length > 0 ? selections[0] : "");
	};
	/* END - Options */

	/* START - Powerlevels */
	const [selectedPowerLevels, setSelectedPowerLevels] = useState([]);
	const [disabledInternalPowerLevels, setDisabledInternalPowerLevels] =
		useState([]);

	const onPowerLevelChange = (selectedValues) => {
		setSelectedPowerLevels(selectedValues); // set "multiple" for the downstream component
		setSelectedPowerlevel(
			selectedValues.length > 0 ? selectedValues[0] : undefined
		); // set "single" for the parent component
	};

	useEffect(() => {
		if (disabledPowerlevels.length === 0 && selectedPowerLevels.length > 0) {
			setDisabledInternalPowerLevels(
				powerLevelOptions
					.filter(
						(option) => !selectedPowerLevels.includes(option.value)
					)
					.map((option) => option.value)
			);
		} else {
			setDisabledInternalPowerLevels([]);
		}
	}, [powerLevelOptions, selectedPowerLevels, disabledPowerlevels]);

	useEffect(() => {
		setSelectedPowerLevels(
			selectedPowerlevel !== undefined ? [selectedPowerlevel] : []
		);
	}, [selectedPowerlevel]);

    const combinedDisabledPowerlevels = union(disabledPowerlevels, disabledInternalPowerLevels).sort((a,b) => a-b);
	/* END - Powerlevels */

	/* START - Upgrades */
	const [selectedInternalUpgrades, setSelectedInternalUpgrades] = useState(
		[]
	);
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
					disabledValues={combinedDisabledPowerlevels}
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
