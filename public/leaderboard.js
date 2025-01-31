// public/leaderboard.js

const reportTableContainer = document.getElementById("report-table-container");

fetch("/api/report") // Fetch data from your API endpoint
  .then((response) => response.json())
  .then((data) => {
    if (data.length === 0) {
      reportTableContainer.innerHTML = "<p>No votes recorded yet.</p>";
      return;
    }

    const table = document.createElement("table");
    const headerRow = table.insertRow();
    const characterHeader = headerRow.insertCell();
    const countHeader = headerRow.insertCell();

    characterHeader.textContent = "Character";
    countHeader.textContent = "Vote Count";

    data.forEach((row) => {
      const dataRow = table.insertRow();
      const characterCell = dataRow.insertCell();
      const countCell = dataRow.insertCell();

      characterCell.textContent = row.Character;
      countCell.textContent = row.Count; // Assuming your API returns 'Count'
    });

    reportTableContainer.innerHTML = ""; // Clear loading message
    reportTableContainer.appendChild(table);
  })
  .catch((error) => {
    console.error("Error fetching report data:", error);
    reportTableContainer.innerHTML = "<p>Error fetching report data.</p>";
  });
