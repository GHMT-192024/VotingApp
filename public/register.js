// public/register.js
//const settingsList = document.getElementById("settings-list");
const addVoterForm = document.getElementById("add-voter-form");
debugger;
// Handle form submission
addVoterForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("register Event listener function called");

  const formData = new FormData(addVoterForm);
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const email = formData.get("email");

  try {
    const response = await fetch("/api/registervoter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstname, lastname, email }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Registered successfully!");
      addVoterForm.reset();
    } else {
      alert("Failed to register.");
    }
  } catch (error) {
    console.error("Error registering Voter:", error);
    alert("An error occurred.");
  }
});
