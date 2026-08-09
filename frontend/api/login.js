const memoryStore = require('./lib/memoryStore');
const { loginUser } = require('./lib/handlers');
const { createPostHandler } = require('./lib/vercel');

module.exports = createPostHandler((body) => loginUser(memoryStore, body));
