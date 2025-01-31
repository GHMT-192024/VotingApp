// public/votes.js
//const VotingList = document.getElementById("Voting-list");
document.addEventListener("DOMContentLoaded", () => {
  const addVoterForm = document.getElementById("add-voter-form");
  const checkboxes = addVoterForm.querySelectorAll('input[type="checkbox"]');
  const pokemonDropdown = document.getElementById("selectPokemon");

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      checkboxes.forEach((otherCheckbox) => {
        if (otherCheckbox !== this) {
          otherCheckbox.checked = false;
        }
      });
    });
  });

  addVoterForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    let selectedOption = null;
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedOption = checkbox.value;
      }
    });

    const pokemonDropdown = document.getElementById("selectPokemon");
    const otherText = pokemonDropdown.value;
    const registeredEmail = localStorage.getItem("registeredEmail");
    localStorage.removeItem("registeredEmail"); // Clean up after use (optional but good practice)

    if (registeredEmail) {
      // Check if the email exists
      // ... use registeredEmail in your fetch call ...
      console.log("registered email is", registeredEmail);
    } else {
      alert("Email not found.  Please register first.");
      // Optionally redirect to the registration page:
      // window.location.href = "register.html";
    }

    if (selectedOption || otherText) {
      // Check if any option is selected
      try {
        const response = await fetch("/api/vote", {
          // Replace with your API endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            selectedOption: selectedOption,
            otherText: otherText, // Include the text box value
            email: registeredEmail,
          }),
        });

        if (response.ok) {
          alert("Vote submitted successfully!");
          addVoterForm.reset(); // Clear the form
          window.location.href = "leaderboard.html";
        } else {
          alert("Error submitting vote.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
      }
    } else {
      alert("Please select a Pokemon.");
    }
  });
});
function getPokemonAPI() {
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let characters = [];
      for (let i = 0; i <= data.results.length; i++) {
        let name = data.results[i];
        characters.push(name);
      }
      console.log(characters);
      const pokemons = characters.map((pokemon) => pokemon?.name);
      console.log(pokemons); // Output: ['Bulbasaur', 'Ivysaur', 'Venusaur'] var select = document.getElementById("selectPokemon");
      const select = document.getElementById("selectPokemon");
      for (let i = 0; i < pokemons.length; i++) {
        let pokemon = pokemons[i];
        pokemon =
          pokemon?.charAt(0).toUpperCase() + pokemon?.slice(1).toLowerCase();
        let el = document.createElement("option");
        el.textContent = pokemon;
        el.value = pokemon;
        select.appendChild(el);
      }
    })
    .catch((error) => {
      console.error("error", error);
    });
}
getPokemonAPI();

// Handle form submission
// addVoterForm.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   console.log("Vote Event listener function called");

//   const formData = new FormData(addVoterForm);
//   const Charizard = formData.get("Charizard");
//   const Pikachu = formData.get("Pikachu");
//   const Machoke = formData.get("Machoke");
//   const Machamp = formData.get("Machamp");
//   const Magneton = formData.get("Magneton");
//   const Other = formData.get("Other");
//   console.log(Other);
//   document.getElementById("basicTextBox");
//   try {
//     const response = await fetch("/api/Vote", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ Charizard, Pikachu, Machoke, Machamp, Magneton }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       alert("Voted successfully!");
//       addVoterForm.reset();
//     } else {
//       alert("Failed to vote.");
//     }
//   } catch (error) {
//     console.error("Error Vote not applicable:", error);
//     alert("An error occurred.");
//   }

//   const maxChecks = 1;
//   let selectedCount = 0;

//   document.querySelector("div").addEventListener("click", (event) => {
//     if (event.target.type === "checkbox") {
//       selectedCount = event.target.checked
//         ? selectedCount + 1
//         : selectedCount - 1;
//     }

//     if (selectedCount >= maxChecks) {
//       [...document.querySelectorAll("input:not(:checked)")].forEach(
//         (input) => (input.disabled = true)
//       );
//     } else {
//       [...document.querySelectorAll("input")].forEach(
//         (input) => (input.disabled = false)
//       );
//     }
//   });
// });
