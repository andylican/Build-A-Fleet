# Build-A-Fleet
Try it out: https://buildafleet.herokuapp.com/ (site may take a few seconds to load at first as it needs to start the server)

A Star Wars themed web app that allows the user to buy starships and build a fleet with the amount of credits inputted. 

How it works:

The app was created using Express.js, and it also uses a MongoDB database. The starship data is fetched from https://swapi.dev/ and is then stored in our database. There is also a database collection that stores the user's current fleet. Whenever the user submits the form on the home page, the "fleet" collection is cleared and as the user buys more ships, the "fleet" collection gets updated. The user's current credit count is also kept track of, and the app will only display ships that the user can still afford by selectively querying the database.

It is unadvisable for this app to be used by multiple people or opened in multiple instances simultaneously, as the "fleet" database collection is shared by all users and could reset mid-use.
