document.addEventListener('DOMContentLoaded', function () {
  // Fetch the JSON data
  fetch('abilities.json')
    .then(response => response.json())
    .then(data => {
      const effectSelect = document.getElementById('effect');
      const limitSelect = document.getElementById('limit');
      const tollSelect = document.getElementById('toll');
      const upgradeCheckboxes = document.getElementsByClassName('upgrade-checkbox');
      const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(.upgrade-checkbox)');
      const powerLevelCheckboxes = document.querySelectorAll('input[name^="power-level"]');
      const abilityOutput = document.getElementById('ability-text');
      const copyNotification = document.getElementById('copy-notification');
      const generateButton = document.getElementById('generate-ability');
      const copyButton = document.getElementById('copy-ability');

      // Populate the multi-select options and set tooltips
      data.effects.forEach(effect => {
        const option = createOption(effect.name);
        effectSelect.appendChild(option);
      });

      data.limits.forEach(limit => {
        const option = createOption(limit.name);
        limitSelect.appendChild(option);
      });

      data.tolls.forEach(toll => {
        const option = createOption(toll.name);
        tollSelect.appendChild(option);
      });

      // Add event listeners
      checkboxes.forEach(checkbox => checkbox.addEventListener('change', handleCheckboxChange));
      powerLevelCheckboxes.forEach(checkbox => checkbox.addEventListener('change', updateTooltips));
      generateButton.addEventListener('click', generateAbility);
      copyButton.addEventListener('click', copyToClipboard);

      // Function to create an option element
      function createOption(value) {
        const option = document.createElement('option');
        option.value = value;
        option.text = value;
        return option;
      }

      // Function to handle checkbox change event
      function handleCheckboxChange(event) {
        const checkedCheckbox = event.target;
        const isChecked = checkedCheckbox.checked;
        const checkboxName = checkedCheckbox.name;

        checkboxes.forEach(checkbox => {
          if (checkbox.name === checkboxName && checkbox !== checkedCheckbox && !checkbox.classList.contains('upgrade-checkbox')) {
            checkbox.disabled = isChecked;
          }

          if (checkbox.name !== checkboxName && checkbox.value === checkedCheckbox.value && !checkbox.classList.contains('upgrade-checkbox')) {
            checkbox.disabled = isChecked;
          }
        });

        if (isChecked && checkedCheckbox.classList.contains('upgrade-checkbox')) {
          const upgradeDescription = getUpgradeDescription(checkedCheckbox.value);
          const upgradeTooltip = checkedCheckbox.nextElementSibling;
          upgradeTooltip.title = upgradeDescription;
        }
      }

      // Function to get the upgrade description based on the selected upgrade
      function getUpgradeDescription(upgradeName) {
        const selectedEffect = effectSelect.value;
        const effect = data.effects.find(effect => effect.name === selectedEffect);
        const upgrade = effect.upgrades[upgradeName];
        return upgrade ? upgrade.description : '';
      }

      // Function to update the tooltip text
      function updateTooltips() {
        const selectedPowerLevel = this.value;
        updateTooltipText(effectSelect, data.effects, selectedPowerLevel);
        updateTooltipText(limitSelect, data.limits, selectedPowerLevel);
        updateTooltipText(tollSelect, data.tolls, selectedPowerLevel);
      }

      // Function to update the tooltip text for a select element
      function updateTooltipText(selectElement, dataItems, powerLevel) {
        const options = selectElement.options;
        for (let i = 0; i < options.length; i++) {
          const itemName = options[i].value;
          const item = dataItems.find(item => item.name === itemName);
          const tooltipText = item.description[powerLevel];
          options[i].title = tooltipText;
        }
      }

      // Set initial tooltips based on default power level
      updateTooltips.call(powerLevelCheckboxes[0]);

      // Function to generate ability based on selected components
      function generateAbility() {
        const selectedEffect = effectSelect.value;
        const selectedUpgrades = getSelectedUpgrades(upgradeCheckboxes);
        const selectedLimit = limitSelect.value;
        const selectedToll = tollSelect.value;
        const selectedEffectPowerLevel = document.querySelector('input[name="power-level-effect"]:checked').value;
        const selectedLimitPowerLevel = document.querySelector('input[name="power-level-limit"]:checked').value;
        const selectedTollPowerLevel = document.querySelector('input[name="power-level-toll"]:checked').value;

        const effect = data.effects.find(effect => effect.name === selectedEffect);
        const limit = data.limits.find(limit => limit.name === selectedLimit);
        const toll = data.tolls.find(toll => toll.name === selectedToll);

        const effectDescription = effect.description[selectedEffectPowerLevel];
        const limitDescription = limit.description[selectedLimitPowerLevel];
        const tollDescription = toll.description[selectedTollPowerLevel];

        let abilityText = `${selectedEffect} ${selectedLimit} ${selectedToll}\n${effectDescription} ${limitDescription} ${tollDescription}`;

        if (selectedUpgrades.length > 0) {
          abilityText += '\nUpgrades: ' + selectedUpgrades.join(', ');
        }

        abilityOutput.textContent = abilityText;
      }

      // Function to copy generated ability text to clipboard
      function copyToClipboard() {
        abilityOutput.select();
        document.execCommand('copy');
        copyNotification.textContent = 'Ability copied to clipboard!';
      }

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
});
