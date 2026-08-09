const memoryStore = require('../shared/api/memoryStore');
const { submitInquiry } = require('../shared/api/handlers');
const { createPostHandler } = require('../shared/api/vercel');

module.exports = createPostHandler((body) => submitInquiry(memoryStore, body));
