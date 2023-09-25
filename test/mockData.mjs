export const validData = {
  players: [
    {
      id: 52,
      country: {
        code: 'SRB',
      },
      data: {
        rank: 2,
        weight: 80000,
        height: 188,
        last: [1, 1, 1, 1, 1],
      },
    },
    {
      id: 95,
      country: {
        code: 'USA',
      },
      data: {
        rank: 52,
        weight: 74000,
        height: 185,
        last: [0, 1, 0, 0, 1],
      },
    },
    {
      id: 65,
      country: {
        code: 'SUI',
      },
      data: {
        rank: 21,
        weight: 81000,
        height: 183,
        last: [1, 1, 1, 0, 1],
      },
    },
    {
      id: 17,
      country: {
        code: 'ESP',
      },
      data: {
        rank: 1,
        weight: 85000,
        height: 185,
        last: [0, 0, 0, 0, 1],
      },
    },
  ],
};

export const validDataImpair = {
  players: [
    {
      id: 52,
      country: {
        code: 'SRB',
      },
      data: {
        rank: 2,
        weight: 80000,
        height: 188,
        last: [1, 1, 1, 1, 1],
      },
    },
    {
      id: 33,
      country: {
        code: 'SRB',
      },
      data: {
        rank: 6,
        weight: 80000,
        height: 195,
        last: [1, 1, 1, 1, 1],
      },
    },
    {
      id: 22,
      country: {
        code: 'SRB',
      },
      data: {
        rank: 4,
        weight: 80000,
        height: 158,
        last: [1, 1, 1, 1, 1],
      },
    },
    {
      id: 17,
      country: {
        code: 'ESP',
      },
      data: {
        rank: 1,
        weight: 85000,
        height: 166,
        last: [0, 0, 0, 0, 1],
      },
    },
    {
      id: 72,
      country: {
        code: 'SRB',
      },
      data: {
        rank: 12,
        weight: 80000,
        height: 167,
        last: [1, 1, 1, 1, 1],
      },
    },
  ],
};

export const validCountriesInitializedObject = {
  SRB: {
    win: 0,
    lose: 0,
    ratio: 0,
  },
  USA: {
    win: 0,
    lose: 0,
    ratio: 0,
  },
  SUI: {
    win: 0,
    lose: 0,
    ratio: 0,
  },
  ESP: {
    win: 0,
    lose: 0,
    ratio: 0,
  },
};

export const validCountriesSetResultObject = {
  SRB: {
    win: 5,
    lose: 0,
    ratio: 0,
  },
  USA: {
    win: 2,
    lose: 3,
    ratio: 0,
  },
  SUI: {
    win: 4,
    lose: 1,
    ratio: 0,
  },
  ESP: {
    win: 1,
    lose: 4,
    ratio: 0,
  },
};

export const validCountriesSetRatioObject = {
  SRB: {
    win: 5,
    lose: 0,
    ratio: 1,
  },
  USA: {
    win: 2,
    lose: 3,
    ratio: 0.4,
  },
  SUI: {
    win: 4,
    lose: 1,
    ratio: 0.8,
  },
  ESP: {
    win: 1,
    lose: 4,
    ratio: 0.2,
  },
};

export const multipleCountries = {
  players: [
    {
      country: {
        code: 'SRB',
      },
    },
    {
      country: {
        code: 'USA',
      },
    },
    {
      country: {
        code: 'SUI',
      },
    },
    {
      country: {
        code: 'SUI',
      },
    },
    {
      country: {
        code: 'ESP',
      },
    },
  ],
};

export const matchValuesMocked = {
  players: [
    {
      country: {
        code: 'USA',
      },
      data: {
        last: [0, 1, 0, 0, 0],
      },
    },
    {
      country: {
        code: 'SUI',
      },
      data: {
        last: [0, 1, 1, 0, 1],
      },
    },
    {
      country: {
        code: 'SUI',
      },
      data: {
        last: [0, 0, 1, 0, 1],
      },
    },
  ],
};

export const countriesInitializedObject = {
  USA: {
    win: 0,
    lose: 0,
    ratio: 0,
  },
  SUI: {
    win: 0,
    lose: 0,
    ratio: 0,
  },
};

export const countriesSetResultObject = {
  USA: {
    win: 1,
    lose: 4,
    ratio: 0,
  },
  SUI: {
    win: 5,
    lose: 5,
    ratio: 0,
  },
};

export const countriesSetRatioObject = {
  USA: {
    win: 1,
    lose: 4,
    ratio: 0.2,
  },
  SUI: {
    win: 5,
    lose: 5,
    ratio: 0.5,
  },
};

export const countriesArrayMock = ['SRB', 'USA', 'SUI', 'ESP'];
