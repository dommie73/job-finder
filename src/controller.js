const http = require('http');
const url = require('url');

const service = require('./service.js');

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  console.log(`Request type: ${req.method}`);

  if (pathname === '/' && req.method === 'GET') {
    console.log(`Endpoint: ${pathname}`);
    console.log(`Params:\n city: ${query.city},\n category: ${query.category}`);
    service.jobsRequest(req, res, query);
  }

  else {
    console.log(`Invalid endpoint: ${pathname}`);
    service.invalidRequest(req, res);
  }
});

module.exports = server;
