// public/votes.js
//const VotingList = document.getElementById("Voting-list");
const addVoterForm = document.getElementById("add-voter-form");
debugger;
// Handle form submission
addVoterForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  console.log("Vote Event listener function called");

  const formData = new FormData(addVoterForm);
  const Charizard = formData.get("Charizard");
  const Pikachu = formData.get("Pikachu");
  const Machoke = formData.get("Machoke");
  const Machamp = formData.get("Machamp");
  const Magneton = formData.get("Magneton");
  const Other = formData.get("Other");

  try {
    const response = await fetch("/api/Vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Charizard, Pikachu, Machoke, Machamp, Magneton }),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Voted successfully!");
      addVoterForm.reset();
    } else {
      alert("Failed to vote.");
    }
  } catch (error) {
    console.error("Error Vote not applicable:", error);
    alert("An error occurred.");
  }
});
