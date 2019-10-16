const http = require('http');
const url = require('url');

const service = require('./service.js');

const server = http.createServer((req, res) => {
  const requestURL = url.parse(req.url, true);

  console.log(`Request type: ${req.method}`);

  if (requestURL.pathname === '/' && req.method === 'GET') {
    console.log(`Endpoint: ${requestURL.pathname}`);
    service.jobsRequest(req, res);
  }

  else {
    console.log(`Invalid endpoint: ${requestURL.pathname}`);
    service.invalidRequest(req, res);
  }
});

module.exports = server;
