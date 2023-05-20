import React, { useState } from "react";
import classNames from "classnames";
import styles from "./app.module.css";
import abilities from "./abilities.json";

import { AbilityConfiguration } from "./components/ability-configuration/ability-configuration";

function App() {
  console.log("abilities", abilities);
  const [upgradeOptions] = useState([
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
  const [powerLevelOptions] = useState([
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
  return (
    <div
      className={classNames("ability-generator-app", styles["app-container"])}
    >
      <div className={styles["ability-configurator"]}>
        <AbilityConfiguration
          upgradeOptions={upgradeOptions}
          powerLevelOptions={powerLevelOptions}
        />
      </div>
    </div>
  );
}

export default App;
