import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import styles from "./checkbox-group.module.css";

export const CheckboxGroup = ({
    className = null,
    label = "",
    options = [],
    selectedValues = [],
    disabledValues = [],
    onChange = null,
}) => {
    if (!(label && options?.length > 0 && onChange)) {
        return null;
    }

    const isMoreThanOneOption = options.length > 1;
    const Group = isMoreThanOneOption ? FormGroup : React.Fragment;
    const groupProps = isMoreThanOneOption ? { row: true } : {};

    const checkboxControlLabelDefaultProps = {
        sx: {
            padding: 0,
            paddingRight: 1,
        },
    };
    const checkboxDefaultProps = {
        size: "small",
        sx: {
            padding: 0,
            paddingRight: 0.5,
        },
    };

    const internalOnChange = (e) => {
        let newSelectedValues = [...selectedValues];
        const value = e.target.value;
        const isChecked = e.target.checked;

        const indexOfValueInSelectedValues = selectedValues.indexOf(value);
        if (!isChecked && indexOfValueInSelectedValues !== -1) {
            newSelectedValues.splice(indexOfValueInSelectedValues, 1);
        }

        if (isChecked && indexOfValueInSelectedValues === -1) {
            newSelectedValues.push(value);
            newSelectedValues.sort((a, b) => a - b);
        }
        onChange(newSelectedValues);
    };

    return (
        <div className={className}>
            <FormControl
                component="fieldset"
                variant="standard"
                className={styles["form-control"]}
            >
                <FormLabel
                    component="legend"
                    className={styles["label-legend"]}
                    sx={{ marginRight: 2 }}
                >{`${label}:`}</FormLabel>
                <Group {...groupProps}>
                    {options.map((option) => (
                        <FormControlLabel
                            key={option.label}
                            control={
                                <Checkbox
                                    checked={selectedValues.some(
                                        (value) => value === option.value
                                    )}
                                    disabled={disabledValues.some(
                                        (value) => value === option.value
                                    )}
                                    onChange={internalOnChange}
                                    name={option.label}
                                    value={option.value}
                                    {...checkboxDefaultProps}
                                />
                            }
                            label={option.label}
                            {...checkboxControlLabelDefaultProps}
                        />
                    ))}
                </Group>
            </FormControl>
        </div>
    );
};
