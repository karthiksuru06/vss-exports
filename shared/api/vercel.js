const { sendJson, applyCors } = require('./http');
const { loginUser, submitInquiry } = require('./handlers');

function createPostHandler(handler) {
  return async (req, res) => {
    applyCors(res);

    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      return res.end();
    }

    if (req.method !== 'POST') {
      return sendJson(res, 405, { error: 'Method not allowed' });
    }

    try {
      const result = await handler(req.body || {});
      return sendJson(res, result.status, result.body);
    } catch (err) {
      console.error('API error:', err);
      return sendJson(res, 500, { error: 'Internal server error' });
    }
  };
}

function createGetHandler(message) {
  return (req, res) => {
    applyCors(res);
    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      return res.end();
    }
    return sendJson(res, 200, { message });
  };
}

module.exports = { createPostHandler, createGetHandler, sendJson, applyCors };
