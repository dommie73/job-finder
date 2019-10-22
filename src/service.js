const api = require('./scrapers/api');

const jobsRequest = async (req, res, query) => {
  try {
    const data = await api.getJobOffers(query);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }

  catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Oops, something went wrong :c');
  }
};

const invalidRequest = (req, res) => {
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Invalid request.');
};

module.exports = {
  jobsRequest,
  invalidRequest
};
