const memoryStore = require('./lib/memoryStore');
const { submitInquiry } = require('./lib/handlers');
const { createPostHandler } = require('./lib/vercel');

module.exports = createPostHandler((body) => submitInquiry(memoryStore, body));
