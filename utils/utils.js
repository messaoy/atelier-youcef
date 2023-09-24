export const getUniqueCountriesArray = (players) => players.map(player => player.country.code)
    .filter((value, index, self) => self.indexOf(value) === index);
export const formatCountriesObject = (players, countriesArrayList) => {
  players.map(player => player.country.code)
    .filter((value, index, self) => self.indexOf(value) === index);
  return countriesArrayList.reduce((acc, value) => {
    return {...acc, [value]: {
        win: 0,
        lose: 0,
        ratio: 0,
      }};
  }, {});
}

export const setMatchResultPerCountry = (players, countries) => {
  for (const player of players) {
    for (const result of player.data.last) {
      const { code } = player.country;
      countries[code][result ? 'win' : 'lose']++;
    }
  }
  return countries;
}

export const calculateRatioPerCountry = (countries) => {
  for (const country of Object.values(countries)) {
    country.ratio = country.win / (country.win + country.lose);
  }
  return countries;
}

export const getCountryWithHighestRatio = (players) => {
  const countries = formatCountriesObject(players, getUniqueCountriesArray(players));
  const countriesWithMatchStats = setMatchResultPerCountry(players, countries);
  const countriesWithRatioStats = calculateRatioPerCountry(countriesWithMatchStats);
  return Object.keys(countriesWithRatioStats).reduce((countryA, countryB) =>
    countries[countryA].ratio > countries[countryB].ratio ? countryA : countryB);
}

export const calculateBMIOfAPlayer = (playerData) => {
  const { height, weight } = playerData;
  const heightInMeters = height / 100;
  const weightInKilos = weight / 1000;
  return weightInKilos / (heightInMeters * heightInMeters);
}

export const getPlayersAverageBMI = (players) => {
  const playersBMI = players.map((player) => calculateBMIOfAPlayer(player.data));
  const totalBMI = playersBMI.reduce((acc, value) => acc + value, 0);
  return Math.round(totalBMI / playersBMI.length * 100) / 100;
}

export const getPlayersHeightMedian = (players) => {
  const playersHeight = players.map((player) => player.data.height)
    .sort((heightA, heightB) => heightA - heightB);

  if (playersHeight.length % 2 === 1) {
    return playersHeight[Math.floor(playersHeight.length / 2)];
  }
    const firstHalf = playersHeight[playersHeight.length / 2 - 1];
    const secondHalf = playersHeight[playersHeight.length / 2];
    return((firstHalf + secondHalf) / 2);
}
