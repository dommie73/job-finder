const api = require('./scrapers/api');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, GET'
};

const jobsRequest = async (req, res, query) => {
  try {
    const data = await api.getJobOffers(query);

    res.writeHead(200, { ...headers, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  }

  catch (error) {
    res.writeHead(500, { ...headers, 'Content-Type': 'text/plain' });
    res.end('Oops, something went wrong :c');
  }
};

const cors = (req, res) => {
  res.writeHead(204, headers);
  res.end();
};

const invalidRequest = (req, res) => {
  res.writeHead(404, { ...headers, 'Content-Type': 'text/plain' });
  res.end('Invalid request.');
};

module.exports = {
  jobsRequest,
  invalidRequest,
  cors
};
