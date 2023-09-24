import dotenv from "dotenv";
import fs from 'fs';
import {
  getCountryWithHighestRatio,
  getPlayersAverageBMI, getPlayersHeightMedian,
} from "../../utils/utils.js";

dotenv.config();

const pathToFile = process.env.DATA_FILE_PATH;

export class PlayerController {
  constructor() {}

  async getAllPlayers(req, res) {
    const readStream = fs.createReadStream(pathToFile);
    let data = '';

    readStream
      .on('data', (chunk) => {
        data += chunk;
      })
      .on('end', () => {
        try {
          const { players } = JSON.parse(data);
          const sortedPlayers = [...players].sort((a, b) => a.data.rank - b.data.rank);
          res.status(200).json(sortedPlayers);
        } catch (err) {
          res.status(400).json({ message: 'An error has occurred while reading the file'});
        }
      })
      .on('error', (err) => {
        res.status(500).json({ message: 'An error has occurred' });
      });
  }

  async getPlayerById(req, res) {
    const playerId = parseInt(req.params.playerId);
    if (!Number.isInteger(parseInt(playerId))) {
      return res.status(400).json({ message: 'Id must be numeric.' });
    }
    const readStream = fs.createReadStream(pathToFile);

    let data = '';

    readStream
      .on('data', (chunk) => {
        data += chunk;

      })
      .on('end', () => {
        try {
          const { players } = JSON.parse(data);
          const player = players.find((p) => p.id === playerId);
          if (!player) {
            res.status(404).json({message: 'Player not found'});
          }
            res.status(200).json(player);
        } catch (err) {
          res.status(400).json({ message: 'An error has occurred while reading the file'});
        }
      })
      .on('error', (err) => {
        res.status(500).json({ message: 'An error has occurred' });
      });
  }

  async getStats(req, res) {
    const readStream = fs.createReadStream(pathToFile);
    let data = '';

    readStream
      .on('data', (chunk) => {
        data += chunk;
      })
      .on('end', () => {
        try {
          const { players } = JSON.parse(data);
          const stats = {
            countryWithHighestRatio: getCountryWithHighestRatio(players),
            playersAverageBMI: getPlayersAverageBMI(players),
            playersHeightMedian: getPlayersHeightMedian(players),
          }

          res.status(200).json(stats);
        }
         catch (err) {
          res.status(400).json({ message: err.message});
        }})
      .on('error', (err) => {
        res.status(500).json({ message: 'An error has occurred', err });
      });
  }
}
