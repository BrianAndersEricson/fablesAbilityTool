document.addEventListener('DOMContentLoaded', function() {
  // Fetch the JSON data
  fetch('abilities.json')
    .then(response => response.json())
    .then(data => {
      const effectSelect = document.getElementById('effect');
      const limitSelect = document.getElementById('limit');
      const tollSelect = document.getElementById('toll');
      const upgradeCheckboxes = document.getElementsByClassName('upgrade-checkbox');
  
      // Populate the multi-select options and set tooltips
      data.effects.forEach(effect => {
        const option = document.createElement('option');
        option.value = effect.name;
        option.text = effect.name;
        effectSelect.appendChild(option);
      });
  
      data.limits.forEach(limit => {
        const option = document.createElement('option');
        option.value = limit.name;
        option.text = limit.name;
        limitSelect.appendChild(option);
      });
  
      data.tolls.forEach(toll => {
        const option = document.createElement('option');
        option.value = toll.name;
        option.text = toll.name;
        tollSelect.appendChild(option);
      });

// Get all the checkbox elements except the upgrade checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(.upgrade-checkbox)');

// Add event listeners to the checkboxes
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', handleCheckboxChange);
});

// Function to handle checkbox change event
function handleCheckboxChange(event) {
  const checkedCheckbox = event.target;
  const isChecked = checkedCheckbox.checked;
  const checkboxName = checkedCheckbox.name;

  // Disable corresponding checkboxes based on the checked checkbox
  checkboxes.forEach((checkbox) => {
    if (checkbox.name === checkboxName && checkbox !== checkedCheckbox && !checkbox.classList.contains('upgrade-checkbox')) {
      checkbox.disabled = isChecked;
    }

    // Disable checkboxes with different power levels
    if (checkbox.name !== checkboxName && checkbox.value === checkedCheckbox.value && !checkbox.classList.contains('upgrade-checkbox')) {
      checkbox.disabled = isChecked;
    }
  });
}

      // Add event listener to power level checkbox buttons
      const powerLevelCheckboxes = document.querySelectorAll('input[name^="power-level"]');
      powerLevelCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
          const selectedPowerLevel = this.value;
  
          // Update the tooltip text for the effects, limits, and tolls
          updateTooltips(selectedPowerLevel);
        });
      });
  
      // Function to update the tooltip text
      function updateTooltips(powerLevel) {
        const effectOptions = effectSelect.options;
        for (let i = 0; i < effectOptions.length; i++) {
          const effectName = effectOptions[i].value;
          const effect = data.effects.find(effect => effect.name === effectName);
          const tooltipText = effect.description[powerLevel];
          effectOptions[i].title = tooltipText;
        }
  
        const limitOptions = limitSelect.options;
        for (let i = 0; i < limitOptions.length; i++) {
          const limitName = limitOptions[i].value;
          const limit = data.limits.find(limit => limit.name === limitName);
          const tooltipText = limit.description[powerLevel];
          limitOptions[i].title = tooltipText;
        }
  
        const tollOptions = tollSelect.options;
        for (let i = 0; i < tollOptions.length; i++) {
          const tollName = tollOptions[i].value;
          const toll = data.tolls.find(toll => toll.name === tollName);
          const tooltipText = toll.description[powerLevel];
          tollOptions[i].title = tooltipText;
        }
      }
  
      // Set initial tooltips based on default power level
      updateTooltips('1');
  
      // Function to generate ability based on selected components
      function generateAbility() {
        const selectedEffect = effectSelect.value;
        const selectedUpgrades = getSelectedUpgrades(upgradeCheckboxes);
        const selectedLimit = limitSelect.value;
        const selectedToll = tollSelect.value;
        const selectedEffectPowerLevel = document.querySelector('input[name="power-level-effect"]:checked').value;
        const selectedLimitPowerLevel = document.querySelector('input[name="power-level-limit"]:checked').value;
        const selectedTollPowerLevel = document.querySelector('input[name="power-level-toll"]:checked').value;
  
        // Finding selected effect, limit, and toll
        const effect = data.effects.find(effect => effect.name === selectedEffect);
        const limit = data.limits.find(limit => limit.name === selectedLimit);
        const toll = data.tolls.find(toll => toll.name === selectedToll);
  
        // Getting the description based on the selected power level
        const effectDescription = effect.description[selectedEffectPowerLevel];
        const limitDescription = limit.description[selectedLimitPowerLevel];
        const tollDescription = toll.description[selectedTollPowerLevel];
  
        // Constructing the ability text
        let abilityText = `${selectedEffect} ${selectedLimit} ${selectedToll}\n${effectDescription} ${limitDescription} ${tollDescription}`;
  
        if (selectedUpgrades.length > 0) {
          abilityText += '\nUpgrades: ' + selectedUpgrades.join(', ');
        }
  
        // Displaying the ability text
        const abilityOutput = document.getElementById('ability-text');
        abilityOutput.textContent = abilityText;
      }
  
      // Function to copy generated ability text to clipboard
      function copyToClipboard() {
        const abilityOutput = document.getElementById('ability-text');
        abilityOutput.select();
        document.execCommand('copy');
  
        const copyNotification = document.getElementById('copy-notification');
        copyNotification.textContent = 'Ability copied to clipboard!';
      }
  
      // Event listener for the Generate Ability button
      const generateButton = document.getElementById('generate-ability');
      generateButton.addEventListener('click', generateAbility);
  
      // Event listener for the Copy to Clipboard button
      const copyButton = document.getElementById('copy-ability');
      copyButton.addEventListener('click', copyToClipboard);
    });
    
  // Helper function to get selected upgrades
  function getSelectedUpgrades(checkboxes) {
    const selectedUpgrades = [];
    for (let i = 0; i < checkboxes.length; i++) {
      const checkbox = checkboxes[i];
      if (checkbox.checked) {
        selectedUpgrades.push(checkbox.value);
      }
    }
    return selectedUpgrades;
  }
});
