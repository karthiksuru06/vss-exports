const memoryStore = require('../shared/api/memoryStore');
const { loginUser } = require('../shared/api/handlers');
const { createPostHandler } = require('../shared/api/vercel');

module.exports = createPostHandler((body) => loginUser(memoryStore, body));
