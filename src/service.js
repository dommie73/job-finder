const api = require('./api.js');

const jobsRequest = async (req, res) => {
  try {
    const data = await api.getJobOffers();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  }

  catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Oops, something went wrong :c');
  }
};

const invalidRequest = (req, res) => {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Invalid request.');
};

module.exports = {
  jobsRequest,
  invalidRequest
};
