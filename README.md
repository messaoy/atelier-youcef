# atelier-youcef
Welcome to our amazing API about Tennis players!

After cloning the project locally, you will need to create a .env file and an ecosystem.config file using the templates provided in the folder. Don't forget to fill in the configuration values.

Finally, you will need to run the following commands:

- npm run install (install project dependencies)
- npm run start (start the project via pm2 in nodaemon mode)

Three routes will be available to you on the port you configured (3000 default):

- "/": the base route, which allows you to retrieve the list of players

- "/:playerId": the route that allows you to retrieve the data of a single player

- "/stats": the route that allows you to retrieve the following stats in an object "stats": (Country with the highest win ratio, Average BMI of all players, Median height of players)

You also have several handy commands at your disposal, such as:

- npm run test (run unit tests via JEST)
- npm run logs (read PM2 logs)
- npm run kill (destroy the PM2 instance)

This project uses JavaScript, node v18.12.1, and Express v4.18.2.

