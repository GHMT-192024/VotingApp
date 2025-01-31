// public/register.js
//const settingsList = document.getElementById("settings-list");
const addVoterForm = document.getElementById("add-voter-form");
// In your form handling module

// Handle form submission
addVoterForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("register Event listener function called");

  const formData = new FormData(addVoterForm);
  const firstname = formData.get("firstname");
  const lastname = formData.get("lastname");
  const email = formData.get("email");

  if (firstname.trim() == "" || lastname.trim() == "" || email.trim() == "") {
    alert("Please fill out all the information before you register");
    return;
  }

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
      localStorage.setItem("registeredEmail", email);
      addVoterForm.reset();
      window.location.href = "votes.html";
    } else {
      alert("Failed to register.");
    }
  } catch (error) {
    console.error("Error registering Voter:", error);
    alert("An error occurred.");
  }
});
const formData = new FormData(addVoterForm);
export function getRegisteredEmail(formData) {
  // Pass formData as an argument
  const email = formData.get("email");
  return email;
}
