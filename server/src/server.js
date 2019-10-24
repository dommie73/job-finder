const HOSTNAME = '127.0.0.1';
const PORT = 4723;

const server = require('./controller');

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running at ${HOSTNAME}:${PORT}`);
});
