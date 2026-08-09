const { createPostHandler, submitInquiry } = require('./vv-handlers');

module.exports = createPostHandler(submitInquiry);
