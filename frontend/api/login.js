const { createPostHandler, loginUser } = require('./vv-handlers');

module.exports = createPostHandler(loginUser);
