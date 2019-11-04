const { arrayToObject } = require('../utils');

const categories = require('./categories');
const cities = require('./cities');

const defaultQueries = {
  cities: {
    all: 'all',
    remote: 'remote',
    ...arrayToObject(cities)
  },
  categories: {
    all: 'all',
    ...arrayToObject(categories)
  }
};

module.exports = defaultQueries;