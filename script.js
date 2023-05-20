document.addEventListener('DOMContentLoaded', function () {
  // Fetch the JSON data
  fetch('abilities.json')
    .then(response => response.json())
    .then(data => {
      // DOM elements
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
      populateOptions(effectSelect, data.effects);
      populateOptions(limitSelect, data.limits);
      populateOptions(tollSelect, data.tolls);

      // Add event listeners
      checkboxes.forEach(checkbox => checkbox.addEventListener('change', handleCheckboxChange));
      powerLevelCheckboxes.forEach(checkbox => checkbox.addEventListener('change', updateTooltips));
      generateButton.addEventListener('click', generateAbility);
      copyButton.addEventListener('click', copyToClipboard);

      // Initial tooltips update
      updateTooltips.call(powerLevelCheckboxes[0]);

      // ----------------- Function Definitions ---------------------

      // Function to copy generated ability text to clipboard
      function copyToClipboard() {
        abilityOutput.select();
        document.execCommand('copy');
        copyNotification.textContent = 'Ability copied to clipboard!';
      }

      // Create and append option elements
      function createOption(value) {
        const option = document.createElement('option');
        option.value = value;
        option.text = value;
        return option;
      }

      // Generate ability text based on selected components
      function generateAbility() {
        const selectedEffect = effectSelect.value;
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

        const selectedUpgrades = Array.from(upgradeCheckboxes)
          .filter(checkbox => checkbox.checked)
          .map(checkbox => checkbox.value.split('-')[1]); // Split the checkbox value and take the second part, which is the upgrade number

        const upgradeDescriptions = selectedUpgrades.map(upgradeNumber => getUpgradeDescription(upgradeNumber)); // Retrieve the upgrade descriptions

        let abilityText = `${selectedEffect} ${selectedLimit} ${selectedToll}\n${effectDescription} ${limitDescription} ${tollDescription}`;

        if (upgradeDescriptions.length > 0) {
          abilityText += '\nUpgrades: ' + upgradeDescriptions.join(' ');
        }

        abilityOutput.textContent = abilityText;
      }

      // Handle checkbox change event
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
          const upgradeDescription = getUpgradeDescription(checkedCheckbox.value); // Pass the value attribute
          const upgradeTooltip = checkedCheckbox.nextElementSibling;
          upgradeTooltip.title = upgradeDescription;
        }
      }

      // Get upgrade description for selected upgrade
      function getUpgradeDescription(upgradeNumber) {
        const selectedEffect = effectSelect.value;
        const effect = data.effects.find(effect => effect.name === selectedEffect);

        if (!effect) return '';

        // Convert the upgradeNumber to a string, because the upgrade keys in your data are strings
        const upgradeKey = String(upgradeNumber);
        const upgrade = effect.upgrades[upgradeKey];

        return upgrade ? upgrade.description : '';
      }

      // Populate options and tooltips for select element
      function populateOptions(selectElement, dataItems) {
        dataItems.forEach(item => {
          const option = createOption(item.name);
          selectElement.appendChild(option);
        });
      }

      // Update tooltip text for select element
      function updateTooltipText(selectElement, dataItems, powerLevel) {
        const options = selectElement.options;
        for (let i = 0; i < options.length; i++) {
          const itemName = options[i].value;
          const item = dataItems.find(item => item.name === itemName);
          const tooltipText = item.description[powerLevel];
          options[i].title = tooltipText;
        }
      }

      // Update tooltips for all power levels
      function updateTooltips() {
        const selectedPowerLevel = this.value;
        updateTooltipText(effectSelect, data.effects, selectedPowerLevel);
        updateTooltipText(limitSelect, data.limits, selectedPowerLevel);
        updateTooltipText(tollSelect, data.tolls, selectedPowerLevel);
      }
    });
});
