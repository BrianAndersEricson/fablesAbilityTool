import React, { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { CheckboxGroup } from "../checkbox-group/checkbox-group";
import styles from "./ability-configuration.module.css";

export const AbilityConfiguration = ({
  upgradeOptions = [],
  powerLevelOptions = [],
}) => {
  const [selectedUpgrades, setSelectedUpgrades] = useState([]);
  const [disabledUpgrades, setDisabledUpgrades] = useState([]);
  const [selectedPowerLevels, setSelectedPowerLevels] = useState([]);
  const [disabledPowerLevels, setDisabledPowerLevels] = useState([]);

  const onUpgradesChange = (selectedValues) => {
    setSelectedUpgrades(selectedValues);
  };

  useEffect(() => {
    if (selectedUpgrades.length > 0) {
      setDisabledUpgrades(
        upgradeOptions
          .filter((option) => !selectedUpgrades.includes(option.value))
          .map((option) => option.value)
      );
    } else {
      setDisabledUpgrades([]);
    }
  }, [upgradeOptions, selectedUpgrades]);

  const onPowerLevelChange = (selectedValues) => {
    setSelectedPowerLevels(selectedValues);
  };

  useEffect(() => {
    if (selectedPowerLevels.length > 0) {
      setDisabledPowerLevels(
        powerLevelOptions
          .filter((option) => !selectedPowerLevels.includes(option.value))
          .map((option) => option.value)
      );
    } else {
      setDisabledPowerLevels([]);
    }
  }, [powerLevelOptions, selectedPowerLevels]);

  const [personName, setPersonName] = React.useState([]);
  const handleChangeMultiple = (event) => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  return (
    <div className={styles["container"]}>
      <FormControl className={styles['select-group-container']}>
        <InputLabel shrink htmlFor="select-multiple-native">
          Native
        </InputLabel>
        <Select
          multiple
          native
          value={personName}
          onChange={handleChangeMultiple}
          label="Native"
          inputProps={{
            id: "select-multiple-native",
          }}
        >
          {/* {names.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))} */}
        </Select>
      </FormControl>
      {upgradeOptions.length > 0 && (
        <CheckboxGroup
          className={styles["checkbox-container"]}
          label="Upgrades"
          options={upgradeOptions}
          selectedValues={selectedUpgrades}
          disabledValues={disabledUpgrades}
          onChange={onUpgradesChange}
        />
      )}
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
    </div>
  );
};
