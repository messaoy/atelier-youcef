import express from 'express';
import PlayerController from '../../controller/player/playerController.mjs';

const playerRouter = express.Router();
const playerController = new PlayerController();

playerRouter.get('/', (req, res) => playerController.getAllPlayers(req, res));
playerRouter.get('/stats', (req, res) => playerController.getStats(req, res));
playerRouter.get('/:playerId', (req, res) => playerController.getPlayerById(req, res));

export default playerRouter;
