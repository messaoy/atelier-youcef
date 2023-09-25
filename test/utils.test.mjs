import {
  describe, it, expect, jest, afterEach,
} from '@jest/globals';

import {
  validData,
  countriesInitializedObject,
  multipleCountries,
  matchValuesMocked,
  countriesSetResultObject,
  countriesSetRatioObject,
  countriesArrayMock,
  validCountriesInitializedObject,
  validCountriesSetRatioObject,
  validCountriesSetResultObject, validDataImpair,
} from './mockData.mjs';

import utilsWrapper from '../utils/utils.mjs';

describe('Utils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUniqueCountriesArray', () => {
    it('should return an array with unique countries from a list of players', () => {
      const expectedResult = countriesArrayMock;
      const result = utilsWrapper.getUniqueCountriesArray(multipleCountries.players);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('formatCountriesObject', () => {
    it('should return a formatted object countries from an array', () => {
      const expectedResult = countriesInitializedObject;
      const result = utilsWrapper.formatCountriesObject(['USA', 'SUI']);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('setMatchResultPerCountry', () => {
    it('should set the total result (win or lose) of all matches played by players for each countries', () => {
      const expectedResult = countriesSetResultObject;
      const result = utilsWrapper.setMatchResultPerCountry(
        matchValuesMocked.players,
        countriesInitializedObject,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('calculateRatioPerCountry', () => {
    it('should calculate win rate ratio for each country', () => {
      const expectedResult = countriesSetRatioObject;
      const result = utilsWrapper.calculateRatioPerCountry(countriesSetResultObject);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getCountryWithHighestRatio', () => {
    it('should get the country with the highestRatio', () => {
      const jestSpy1 = jest.spyOn(utilsWrapper, 'getUniqueCountriesArray').mockReturnValue(countriesArrayMock);
      const jestSpy2 = jest.spyOn(utilsWrapper, 'formatCountriesObject').mockReturnValue(validCountriesInitializedObject);
      const jestSpy3 = jest.spyOn(utilsWrapper, 'setMatchResultPerCountry').mockReturnValue(validCountriesSetResultObject);
      const jestSpy4 = jest.spyOn(utilsWrapper, 'calculateRatioPerCountry').mockReturnValue(validCountriesSetRatioObject);

      const result = utilsWrapper.getCountryWithHighestRatio(validData.players);
      expect(jestSpy1).toBeCalledTimes(1);
      expect(jestSpy2).toBeCalledTimes(1);
      expect(jestSpy3).toBeCalledTimes(1);
      expect(jestSpy4).toBeCalledTimes(1);

      const expectedResult = 'SRB';
      expect(result).toEqual(expectedResult);
    });
  });

  describe('calculateBMIOfAPlayer', () => {
    it('should calculate BMI of a player', () => {
      const expectedResult = 22.63;
      const result = utilsWrapper.calculateBMIOfAPlayer(validData.players[0].data);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getPlayersAverageBMI', () => {
    it('should calculate average BMI of players', () => {
      const expectedResult = 23.32;
      const jestSpy = jest.spyOn(utilsWrapper, 'calculateBMIOfAPlayer');

      const result = utilsWrapper.getPlayersAverageBMI(validData.players);
      expect(jestSpy).toBeCalledTimes(validData.players.length);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getPlayersHeightMedian', () => {
    it('should calculate height median of players (nb of players pair case)', () => {
      const expectedResult = 1.85;

      const result = utilsWrapper.getPlayersHeightMedian(validData.players);
      expect(result).toEqual(expectedResult);
    });

    it('should calculate height median of players (nb of players impair case)', () => {
      const expectedResult = 1.67;

      const result = utilsWrapper.getPlayersHeightMedian(validDataImpair.players);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('checkFileData', () => {
    it('should throw an error if the file data is empty', () => {
      const emptyFileData = '';
      expect(() => utilsWrapper.checkFileData(emptyFileData)).toThrow('File empty.');
    });

    it('should throw an error if no data is provided', () => {
      const noDataFile = JSON.stringify(null);
      expect(() => utilsWrapper.checkFileData(noDataFile)).toThrow('No data provided.');
    });

    it('should throw an error if "players" property is missing or empty', () => {
      const fileWithMissingPlayers = JSON.stringify({ players: [] });
      expect(() => utilsWrapper.checkFileData(fileWithMissingPlayers)).toThrow(
        'There must be a \'players\' array as a property and it cannot be empty.',
      );
    });

    it('should throw an error if a player is missing an "id" property', () => {
      const fileWithPlayerMissingId = JSON.stringify({
        players: [{ name: 'Venus Williams' }],
      });
      expect(() => utilsWrapper.checkFileData(fileWithPlayerMissingId)).toThrow(
        'The player must have an \'id\' property.',
      );
    });

    it('should throw an error if a player is missing a "country" property with "code"', () => {
      const fileWithPlayerMissingCountry = JSON.stringify({
        players: [{ id: 1, name: 'Venus Williams' }],
      });
      expect(() => utilsWrapper.checkFileData(fileWithPlayerMissingCountry)).toThrow(
        'The player must have a \'country\' property with a \'code\' property.',
      );
    });

    it('should throw an error if a player is missing a "data" property', () => {
      const fileWithPlayerMissingData = JSON.stringify({
        players: [{ id: 1, country: { code: 'USA' } }],
      });
      expect(() => utilsWrapper.checkFileData(fileWithPlayerMissingData)).toThrow(
        'The player must have a \'data\' property that is an object.',
      );
    });
  });
});
