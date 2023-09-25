const getUniqueCountriesArray = (players) => players.map((player) => player.country.code)
  .filter((value, index, self) => self.indexOf(value) === index);
const formatCountriesObject = (countriesArrayList) => countriesArrayList.reduce((acc, value) => ({
  ...acc,
  [value]: {
    win: 0,
    lose: 0,
    ratio: 0,
  },
}), {});

const setMatchResultPerCountry = (players, countries) => {
  const countriesToUpdate = countries;
  for (const player of players) {
    for (const result of player.data.last) {
      const { code } = player.country;
      countriesToUpdate[code][result ? 'win' : 'lose'] += 1;
    }
  }
  return countriesToUpdate;
};

const calculateRatioPerCountry = (countries) => {
  for (const country of Object.values(countries)) {
    country.ratio = country.win / (country.win + country.lose);
  }
  return countries;
};

const getCountryWithHighestRatio = (players) => {
  const countries = utilsWrapper.formatCountriesObject(utilsWrapper.getUniqueCountriesArray(players));
  const countriesWithMatchStats = utilsWrapper.setMatchResultPerCountry(players, countries);
  const countriesWithRatioStats = utilsWrapper.calculateRatioPerCountry(countriesWithMatchStats);
  return Object.keys(countriesWithRatioStats)
    .reduce((a, b) => (countriesWithRatioStats[a].ratio > countriesWithRatioStats[b].ratio ? a : b));
};

const calculateBMIOfAPlayer = (playerData) => {
  const { height, weight } = playerData;
  const heightInMeters = height / 100;
  const weightInKilos = weight / 1000;
  return Math.round((weightInKilos / (heightInMeters * heightInMeters)) * 100) / 100;
};

const getPlayersAverageBMI = (players) => {
  const playersBMI = players.map((player) => utilsWrapper.calculateBMIOfAPlayer(player.data));
  const totalBMI = playersBMI.reduce((acc, value) => acc + value, 0);
  return Math.round((totalBMI / playersBMI.length) * 100) / 100;
};

const getPlayersHeightMedian = (players) => {
  const playersHeight = players.map((player) => player.data.height)
    .sort((heightA, heightB) => heightA - heightB);

  if (playersHeight.length % 2 === 1) {
    return (playersHeight[Math.floor(playersHeight.length / 2)]) / 100;
  }
  const firstHalf = playersHeight[playersHeight.length / 2 - 1];
  const secondHalf = playersHeight[playersHeight.length / 2];
  return (((firstHalf + secondHalf) / 2)) / 100;
};

const checkFileData = (dataFromFile) => {
  if (!dataFromFile) {
    throw new Error('File empty.');
  }

  const data = JSON.parse(dataFromFile);

  if (!data) {
    throw new Error('No data provided.');
  }

  if (!data.players || !Array.isArray(data.players) || !data.players.length) {
    throw new Error("There must be a 'players' array as a property and it cannot be empty.");
  }

  for (const player of data.players) {
    if (!player.id) {
      throw new Error("The player must have an 'id' property.");
    }

    if (!player.country || !player.country.code) {
      throw new Error("The player must have a 'country' property with a 'code' property.");
    }

    if (!player.data || typeof player.data !== 'object') {
      throw new Error("The player must have a 'data' property that is an object.");
    }

    if (typeof player.data.rank !== 'number') {
      throw new Error("The 'rank' property in 'data' must be a number.");
    }

    if (typeof player.data.weight !== 'number') {
      throw new Error("The 'weight' property in 'data' must be a number.");
    }

    if (typeof player.data.height !== 'number') {
      throw new Error("The 'height' property in 'data' must be a number.");
    }

    if (!Array.isArray(player.data.last) || player.data.last.length !== 5 || !player.data.last.every((item) => typeof item === 'number')) {
      throw new Error("The 'last' property in 'data' must be an array of 5 numeric values.");
    }
  }
  return data;
};

const utilsWrapper = {
  getUniqueCountriesArray,
  formatCountriesObject,
  setMatchResultPerCountry,
  calculateRatioPerCountry,
  getCountryWithHighestRatio,
  getPlayersHeightMedian,
  getPlayersAverageBMI,
  calculateBMIOfAPlayer,
  checkFileData,
};

export default utilsWrapper;
