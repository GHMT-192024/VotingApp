// public/settings.js
const settingsList = document.getElementById("settings-list");
const addSettingForm = document.getElementById("add-setting-form");

// Fetch initial settings data
fetch("/api/settings")
  .then((response) => response.json())
  .then((settings) => {
    displaySettings(settings);
  })
  .catch((error) => {
    console.error("Error fetching settings:", error);
  });

// Function to display settings
function displaySettings(settings) {
  settingsList.innerHTML = "";
  settings.forEach((setting) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${setting.key}: ${setting.value}`;
    // Add buttons for update and delete (implement later)
    settingsList.appendChild(listItem);
  });
}

// Handle form submission
addSettingForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(addSettingForm);
  const key = formData.get("key");
  const value = formData.get("value");

  try {
    const response = await fetch("/api/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key, value }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Setting added successfully!");
      addSettingForm.reset();
      // Fetch and display updated settings
      fetch("/api/settings")
        .then((response) => response.json())
        .then((settings) => {
          displaySettings(settings);
        });
    } else {
      alert("Failed to add setting.");
    }
  } catch (error) {
    console.error("Error adding setting:", error);
    alert("An error occurred.");
  }
});

// Implement update and delete functionality (similar to addSettingForm)

// ... (previous code for fetching and displaying settings)

// Handle update button click (assuming you have an "update" button for each setting)
settingsList.addEventListener("click", async (event) => {
  if (event.target.matches(".update-button")) {
    const settingId = event.target.dataset.settingId;
    const keyInput = document.getElementById(`key-${settingId}`);
    const valueInput = document.getElementById(`value-${settingId}`);

    try {
      const response = await fetch(`/api/settings/${settingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: keyInput.value,
          value: valueInput.value,
        }),
      });

      if (response.ok) {
        alert("Setting updated successfully!");
        // Fetch and display updated settings
        fetch("/api/settings")
          .then((response) => response.json())
          .then((settings) => {
            displaySettings(settings);
          });
      } else {
        alert("Failed to update setting.");
      }
    } catch (error) {
      console.error("Error updating setting:", error);
      alert("An error occurred.");
    }
  }
});

// Modify displaySettings function to include update inputs
function displaySettings(settings) {
  settingsList.innerHTML = "";
  settings.forEach((setting) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${setting.key}: </span>
      <input type="text" id="key-${setting.id}" value="${setting.key}"> 
      <input type="text" id="value-${setting.id}" value="${setting.value}">
      <button class="update-button" data-setting-id="${setting.id}">Update</button>
      <button class="delete-button" data-setting-id="${setting.id}">Delete</button>
    `;
    settingsList.appendChild(listItem);
  });
}

// Handle delete button click (assuming you have an "delete" button for each setting)
settingsList.addEventListener("click", async (event) => {
  if (event.target.matches(".delete-button")) {
    const settingId = event.target.dataset.settingId;
    const keyInput = document.getElementById(`key-${settingId}`);
    const valueInput = document.getElementById(`value-${settingId}`);

    try {
      const response = await fetch(`/api/settings/${settingId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: keyInput.value,
          value: valueInput.value,
        }),
      });

      if (response.ok) {
        alert("Setting delete successfully!");
        // Fetch and display deleted settings
        fetch("/api/settings")
          .then((response) => response.json())
          .then((settings) => {
            displaySettings(settings);
          });
      } else {
        alert("Failed to delete setting.");
      }
    } catch (error) {
      console.error("Error deleting setting:", error);
      alert("An error occurred.");
    }
  }
});
