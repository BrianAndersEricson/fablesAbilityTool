import { compact, union } from "lodash-es";
import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./app.module.css";
import data from "./new-abilities.json";

import { AbilityConfiguration } from "./components/ability-configuration/ability-configuration";

const ABILITY_COMPONENTS = {
	EFFECTS: "effects",
	LIMITS: "limits",
	TOLLS: "tolls",
};
const ABILITY_COMPONENTS_NAME_MAP = {
	effects: "Effect",
	limits: "Limit",
	tolls: "Toll",
};
const POWERLEVEL_KEY = "powerlevels";
const UPGRADES_KEY = "upgrades";

function App() {
	const abilityComponents = Object.keys(data.abilityComponents);
	const [powerLevelAndUpgradesOptions] = useState([
		{
			label: "1",
			value: "1",
		},
		{
			label: "2",
			value: "2",
		},
		{
			label: "3",
			value: "3",
		},
	]);
	// const [selectedPowerlevel, setSelectedPowerlevel] = useState();
	// const [selectedUpgrades, setSelectedUpgrades] = useState([]);
	// let powerlevelDescription = "";
	// if (selectedOption && selectedPowerlevel) {
	//     const abilityComponent = data.abilityComponents[ABILITY_COMPONENTS.EFFECTS];
	//     powerlevelDescription = abilityComponent[selectedOption][POWERLEVEL_KEY][selectedPowerlevel];

	//     selectedUpgrades.forEach(upgradeLevel => {
	//         powerlevelDescription += ` ${abilityComponent[selectedOption][UPGRADES_KEY][upgradeLevel]}`
	//     })

	// }
	// console.log(`TEST: ${selectedOption} ${selectedPowerlevel} ${selectedUpgrades} ${powerlevelDescription}`)

	const [selectedEffectsOption, setSelectedEffectsOption] = useState("");
	const [selectedLimitsOption, setSelectedLimitsOption] = useState("");
	const [selectedTollsOption, setSelectedTollsOption] = useState("");

	const selectedOptionMap = {
		[ABILITY_COMPONENTS.EFFECTS]: selectedEffectsOption,
		[ABILITY_COMPONENTS.LIMITS]: selectedLimitsOption,
		[ABILITY_COMPONENTS.TOLLS]: selectedTollsOption,
	};
	const setSelectedOptionMap = {
		[ABILITY_COMPONENTS.EFFECTS]: setSelectedEffectsOption,
		[ABILITY_COMPONENTS.LIMITS]: setSelectedLimitsOption,
		[ABILITY_COMPONENTS.TOLLS]: setSelectedTollsOption,
	};

	const [selectedEffectsPowerlevel, setSelectedEffectsPowerlevel] =
		useState();
	const [selectedLimitsPowerlevel, setSelectedLimitsPowerlevel] = useState();
	const [selectedTollsPowerlevel, setSelectedTollsPowerlevel] = useState();

	const selectedPowerlevelMap = {
		[ABILITY_COMPONENTS.EFFECTS]: selectedEffectsPowerlevel,
		[ABILITY_COMPONENTS.LIMITS]: selectedLimitsPowerlevel,
		[ABILITY_COMPONENTS.TOLLS]: selectedTollsPowerlevel,
	};
	const setSelectedPowerlevelMap = {
		[ABILITY_COMPONENTS.EFFECTS]: setSelectedEffectsPowerlevel,
		[ABILITY_COMPONENTS.LIMITS]: setSelectedLimitsPowerlevel,
		[ABILITY_COMPONENTS.TOLLS]: setSelectedTollsPowerlevel,
	};

	const [mergedSelectedPowerlevels, setMergedSelectedPowerlevels] = useState(
		[]
	);

	const [selectedEffectsUpgrades, setSelectedEffectsUpgrades] = useState([]);

	useEffect(() => {
		let mergedSelectedPowerlevels = compact(
			union(
				[selectedEffectsPowerlevel],
				[selectedLimitsPowerlevel],
				[selectedTollsPowerlevel]
			)
		).sort((a, b) => a - b);
		setMergedSelectedPowerlevels(
			powerLevelAndUpgradesOptions
				.map((option) => option.value)
				.filter((value) => mergedSelectedPowerlevels.includes(value))
		);
	}, [
		powerLevelAndUpgradesOptions,
		selectedEffectsPowerlevel,
		selectedLimitsPowerlevel,
		selectedTollsPowerlevel,
	]);
	return (
		<div
			className={classNames(
				"ability-generator-app",
				styles["app-container"]
			)}
		>
			<div className={styles["ability-configurator"]}>
				{abilityComponents.map((key) => {
					const abilityComponentOptions = Object.keys(
						data.abilityComponents[key]
					);

					const abilityComponentSpecificDisabledPowerlevels =
						selectedPowerlevelMap[key] !== undefined
							? powerLevelAndUpgradesOptions
									.map((option) => option.value)
									.filter(
										(value) =>
											selectedPowerlevelMap[key] !== value
									)
							: mergedSelectedPowerlevels.filter(
									(value) =>
										selectedPowerlevelMap[key] !== value
							  );

					return (
						<AbilityConfiguration
							key={key}
							label={ABILITY_COMPONENTS_NAME_MAP[key]}
							options={abilityComponentOptions}
							selectedOption={selectedOptionMap[key]}
							setSelectedOption={setSelectedOptionMap[key]}
							powerLevelOptions={powerLevelAndUpgradesOptions}
							selectedPowerlevel={selectedPowerlevelMap[key]}
							setSelectedPowerlevel={
								setSelectedPowerlevelMap[key]
							}
							disabledPowerlevels={abilityComponentSpecificDisabledPowerlevels}
							upgradeOptions={
								key === ABILITY_COMPONENTS.EFFECTS
									? powerLevelAndUpgradesOptions
									: []
							}
							selectedUpgrades={selectedEffectsUpgrades}
							setSelectedUpgrades={setSelectedEffectsUpgrades}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default App;
