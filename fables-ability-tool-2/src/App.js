import React, { useState } from "react";
import classNames from "classnames";
import styles from "./app.module.css";
import data from "./new-abilities.json";

import { AbilityConfiguration } from "./components/ability-configuration/ability-configuration";

const ABILITY_COMPONENTS = {
    EFFECTS: 'effects',
    LIMITS: 'limits',
    TOLLS: 'tolls',
}
const ABILITY_COMPONENTS_NAME_MAP = {
	effects: "Effect",
	limits: "Limit",
	tolls: "Toll",
};
const POWERLEVEL_KEY = "powerlevels";
const UPGRADES_KEY = "upgrades";

function App() {
	const abilityComponents = Object.keys(data.abilityComponents);

	const [selectedOption, setSelectedOption] = useState("");
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
	const [selectedPowerlevel, setSelectedPowerlevel] = useState();
	const [selectedUpgrades, setSelectedUpgrades] = useState([]);
    let powerlevelDescription = "";
    if (selectedOption && selectedPowerlevel) {
        const abilityComponent = data.abilityComponents[ABILITY_COMPONENTS.EFFECTS];
        powerlevelDescription = abilityComponent[selectedOption][POWERLEVEL_KEY][selectedPowerlevel];

        selectedUpgrades.forEach(upgradeLevel => {
            powerlevelDescription += ` ${abilityComponent[selectedOption][UPGRADES_KEY][upgradeLevel]}`
        })

    }
    console.log(`TEST: ${selectedOption} ${selectedPowerlevel} ${selectedUpgrades} ${powerlevelDescription}`)
	return (
		<div
			className={classNames(
				"ability-generator-app",
				styles["app-container"]
			)}
		>
			<div className={styles["ability-configurator"]}>
				{abilityComponents.slice(0, 1).map((key) => {
					const abilityComponentOptions = Object.keys(
						data.abilityComponents[key]
					);

					return (
						<AbilityConfiguration
							key={key}
							label={ABILITY_COMPONENTS_NAME_MAP[key]}
							options={abilityComponentOptions}
							selectedOption={selectedOption}
							setSelectedOption={setSelectedOption}
							powerLevelOptions={powerLevelAndUpgradesOptions}
							selectedPowerlevel={selectedPowerlevel}
							setSelectedPowerlevel={setSelectedPowerlevel}
							upgradeOptions={powerLevelAndUpgradesOptions}
							selectedUpgrades={selectedUpgrades}
							setSelectedUpgrades={setSelectedUpgrades}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default App;
