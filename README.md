
Code Structured as below:

![image](https://github.com/user-attachments/assets/72f77776-b56a-4fd1-b0b6-84150f5c2ec4)

HTML files:
index.html - Is the home page or entry to the voting app with a welcome message leading the user to register to Vote
register.html - The user can provide his first name, last name, and email to register. A user can register only once.
votes.html - The user can cast his vote for the predefined pokemon or select from a dropdown with multiple other Pokemon
leaderboard.html - Displays #of votes received by each Pokemon in a table sorted from highest to lowest


Java Script files:
register.js - Handles Event listener for the Submit button to register a voter
votes.js - Handles Event listener for the Submit button to voter's choice of vote
leaderboard.js - Has a fetch method to display the leaderboard (#of votes received by each Pokemon)
server.js - This script defines all GET, POST, PUT APIs. These APIs have integrated to MYSQL database to fetch, save and update operations.


