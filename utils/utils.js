export const getUniqueCountriesArray = (players) => players.map((player) => player.country.code)
  .filter((value, index, self) => self.indexOf(value) === index);
export const formatCountriesObject = (players, countriesArrayList) => {
  players.map((player) => player.country.code)
    .filter((value, index, self) => self.indexOf(value) === index);
  return countriesArrayList.reduce((acc, value) => ({
    ...acc,
    [value]: {
      win: 0,
      lose: 0,
      ratio: 0,
    },
  }), {});
};

export const setMatchResultPerCountry = (players, countries) => {
  const countriesToUpdate = countries;
  for (const player of players) {
    for (const result of player.data.last) {
      const { code } = player.country;
      countriesToUpdate[code][result ? 'win' : 'lose'] += 1;
    }
  }
  return countriesToUpdate;
};

export const calculateRatioPerCountry = (countries) => {
  for (const country of Object.values(countries)) {
    country.ratio = country.win / (country.win + country.lose);
  }
  return countries;
};

export const getCountryWithHighestRatio = (players) => {
  const countries = formatCountriesObject(players, getUniqueCountriesArray(players));
  const countriesWithMatchStats = setMatchResultPerCountry(players, countries);
  const countriesWithRatioStats = calculateRatioPerCountry(countriesWithMatchStats);
  return Object.keys(countriesWithRatioStats)
    .reduce((a, b) => (countries[a].ratio > countries[b].ratio ? a : b));
};

export const calculateBMIOfAPlayer = (playerData) => {
  const { height, weight } = playerData;
  const heightInMeters = height / 100;
  const weightInKilos = weight / 1000;
  return weightInKilos / (heightInMeters * heightInMeters);
};

export const getPlayersAverageBMI = (players) => {
  const playersBMI = players.map((player) => calculateBMIOfAPlayer(player.data));
  const totalBMI = playersBMI.reduce((acc, value) => acc + value, 0);
  return Math.round((totalBMI / playersBMI.length) * 100) / 100;
};

export const getPlayersHeightMedian = (players) => {
  const playersHeight = players.map((player) => player.data.height)
    .sort((heightA, heightB) => heightA - heightB);

  if (playersHeight.length % 2 === 1) {
    return playersHeight[Math.floor(playersHeight.length / 2)];
  }
  const firstHalf = playersHeight[playersHeight.length / 2 - 1];
  const secondHalf = playersHeight[playersHeight.length / 2];
  return ((firstHalf + secondHalf) / 2);
};
