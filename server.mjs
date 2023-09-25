import express from 'express';
import dotenv from 'dotenv';
import playerRouter from './router/player/playerRouter.mjs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const pathToFile = process.env.DATA_FILE_PATH;

if (!pathToFile || !pathToFile.length) {
  throw new Error('Server require a path to the players data file to start');
}

app.use('/players', playerRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
