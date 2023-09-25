import dotenv from 'dotenv';
import fs from 'fs';
import utilsWrapper from '../../utils/utils.mjs';

dotenv.config();

const pathToFile = process.env.DATA_FILE_PATH;

class PlayerController {
  async getAllPlayers(req, res) {
    const readStream = fs.createReadStream(pathToFile);
    let data = '';

    readStream
      .on('data', (chunk) => {
        data += chunk;
      })
      .on('end', () => {
        try {
          const dataParsed = utilsWrapper.checkFileData(data);
          const { players } = dataParsed;
          const sortedPlayersByRank = [...players].sort((a, b) => a.data.rank - b.data.rank);
          res.status(200).json(sortedPlayersByRank);
        } catch (err) {
          res.status(400).json({ message: err.message ? err.message : 'An error has occurred while reading the file' });
        }
      })
      .on('error', (err) => {
        res.status(500).json({ message: 'An error has occurred', err });
      });
  }

  async getPlayerById(req, res) {
    if (!Number.isInteger(parseInt(req.params.playerId, 10))) {
      res.status(400).json({ message: 'Id must be numeric.' });
    }
    const playerId = parseInt(req.params.playerId, 10);
    const readStream = fs.createReadStream(pathToFile);

    let data = '';

    readStream
      .on('data', (chunk) => {
        data += chunk;
      })
      .on('end', () => {
        try {
          const dataParsed = utilsWrapper.checkFileData(data);
          const { players } = dataParsed;
          const player = players.find((p) => p.id === playerId);
          if (!player) {
            res.status(404).json({ message: 'Player not found' });
          }
          res.status(200).json(player);
        } catch (err) {
          res.status(400).json({ message: err.message ? err.message : 'An error has occurred while reading the file' });
        }
      })
      .on('error', (err) => {
        res.status(500).json({ message: 'An error has occurred', err });
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
          const dataParsed = utilsWrapper.checkFileData(data);
          const { players } = dataParsed;
          const stats = {
            countryWithHighestRatio: utilsWrapper.getCountryWithHighestRatio(players),
            playersAverageBMI: utilsWrapper.getPlayersAverageBMI(players),
            playersHeightMedian: utilsWrapper.getPlayersHeightMedian(players),
          };

          res.status(200).json({ stats });
        } catch (err) {
          res.status(400).json({ message: err.message ? err.message : 'An error has occurred while reading the file' });
        }
      })
      .on('error', (err) => {
        res.status(500).json({ message: 'An error has occurred', err });
      });
  }
}

export default PlayerController;
