
Code Structured as below:

![image](https://github.com/user-attachments/assets/72f77776-b56a-4fd1-b0b6-84150f5c2ec4)

HTML files: 
<p>
<br>index.html - Is the home page or entry to the voting app with a welcome message leading the user to register to Vote</br>
<br>register.html - The user can provide his first name, last name, and email to register. A user can register only once.</br>
<br>votes.html - The user can cast his vote for the predefined pokemon or select from a dropdown with multiple other Pokemon</br>
<br>leaderboard.html - Displays #of votes received by each Pokemon in a table sorted from highest to lowest</br></p>


Java Script files:
<p>
<br>register.js - Handles Event listener for the Submit button to register a voter</br>
<br>votes.js - Handles Event listener for the Submit button to voter's choice of vote</br>
<br>leaderboard.js - Has a fetch method to display the leaderboard (#of votes received by each Pokemon)</br>
<br>server.js - This script defines all GET, POST, PUT APIs. These APIs have integrated to MYSQL database to fetch, save and update operations.</p>

<p><br>API code (server.js) is in the parent directory</br>
<br>Webpages and related javascript files are in ./public directory</br></p>
