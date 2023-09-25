import express from 'express';
import dotenv from 'dotenv';
import playerRouter from './router/player/playerRouter.mjs';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/players', playerRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
