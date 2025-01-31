const express = require("express");
const mysql = require("mysql2/promise");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// MySQL connection configuration
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "VotingApp",
  database: "VotingApp",
});

// Middleware
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files (HTML, CSS, JS)

// Get API to retrieve Settings
app.get("/api/settings", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM SettingsTbl");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ error: "Failed to fetch settings" });
  }
});
// Post API to save new Setting
app.post("/api/settings", async (req, res) => {
  try {
    const { key, value } = req.body;
    const [result] = await pool.execute(
      "INSERT INTO SettingsTbl (`key`, `value`) VALUES (?, ?)",
      [key, value]
    );
    res
      .status(201)
      .json({ message: "Setting added successfully", id: result.insertId });
  } catch (error) {
    console.error("Error adding setting:", error);
    res.status(500).json({ error: "Failed to add setting" });
  }
});
// Put API to update Setting with  id
app.put("/api/settings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { key, value } = req.body;
    const [result] = await pool.execute(
      "UPDATE SettingsTbl SET `key` = ?, `value` = ? WHERE `id` = ?",
      [key, value, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Setting not found" });
    }
    res.json({ message: "Setting updated successfully" });
  } catch (error) {
    console.error("Error updating setting:", error);
    res.status(500).json({ error: "Failed to update setting" });
  }
});
//Delete API to remove a setting using it's id
app.delete("/api/settings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.execute(
      "DELETE FROM SettingsTbl WHERE `id` = ?",
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Setting not found" });
    }
    res.json({ message: "Setting deleted successfully" });
  } catch (error) {
    console.error("Error deleting setting:", error);
    res.status(500).json({ error: "Failed to delete setting" });
  }
});
// Put API to update option with optionname
app.put("/api/options/:optionname", async (req, res) => {
  try {
    const { optionname } = req.params;
    //const { key, value } = req.body;
    const [result] = await pool.execute(
      "UPDATE OptionsTbl SET `optionName` = ?, `value` = ? WHERE `optionName` = ?",
      [optionname]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Setting not found" });
    }
    res.json({ message: "Option updated successfully" });
  } catch (error) {
    console.error("Error updating Option:", error);
    res.status(500).json({ error: "Failed to update option" });
  }
});
// Get API to retrieve votes
app.get("/api/Vote", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM VotesTbl");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching Vote:", error);
    res.status(500).json({ error: "Failed to fetch Vote" });
  }
});
//Post API to save the voted option
app.post("/api/Vote", async (req, res) => {
  try {
    let { selectedOption, otherText, email } = req.body;
    if (!selectedOption) {
      return res.status(400).send("No option selected");
    }

    // Process the vote (e.g., store in database)
    console.log("Vote received:", selectedOption);
    if (otherText) {
      console.log("Other text:", otherText);
      selectedOption = otherText;
    }

    // Need to enhance this to capture the user who registered
    //const Email = "sstankala@gmail.com";
    console.log("selectedOption:", selectedOption);
    console.log("otherText:", otherText);
    console.log("email:", email);
    const [result] = await pool.execute(
      "INSERT INTO VotesTbl (`Email`, `Character`) VALUES (?, ?)",
      [email, selectedOption]
    );
    res
      .status(201)
      .json({ message: "Vote added successfully", id: result.insertId });
  } catch (error) {
    console.error("Error adding vote:", error);
    res.status(500).json({ error: "Failed to add vote" });
  }
});

// API to register voter
app.post("/api/registervoter", async (req, res) => {
  try {
    const { firstname, lastname, email } = req.body;
    console.log(firstname);
    console.log(lastname);
    console.log(email);
    const [result] = await pool.execute(
      "INSERT INTO VoterInfoTbl (`firstname`, `lastname`, `email`) VALUES (?, ?, ?)",
      [firstname, lastname, email]
    );
    res
      .status(201)
      .json({ message: "Voter registered successfully", id: result.insertId });
  } catch (error) {
    console.error("Error in inserting Voter:", error);
    res.status(500).json({ error: "Failed to register" });
  }
});
//API to get options
app.get("/api/options", async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM OptionsTbl");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching Options:", error);
    res.status(500).json({ error: "Failed to fetch options" });
  }
});
//API to save options
app.post("/api/options", async (req, res) => {
  try {
    const { OptionName } = req.body;
    const [result] = await pool.execute(
      "INSERT INTO OptionsTbl (`optionName`) VALUES (?)",
      [OptionName]
    );
    res.status(201).json({ message: "Option added successfully" });
  } catch (error) {
    console.error("Error inserting Options:", error);
    res.status(500).json({ error: "Failed to insert options" });
  }
});

app.get("/api/report", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      "SELECT `Character`, COUNT(*) AS Count FROM VotingApp.VotesTbl GROUP BY `Character` ORDER BY Count DESC;"
    );
    res.json(rows); // Send the results as JSON
  } catch {
    console.error("Error fetching report data:", err);
    res.status(500).json({ error: "Error fetching report data" }); // Send JSON error
    return;
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
