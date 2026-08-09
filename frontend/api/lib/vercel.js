const { sendJson, applyCors } = require('./http');

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body;
  }
  if (typeof req.body === 'string' && req.body.length) {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      if (!data) return resolve({});
      try {
        resolve(JSON.parse(data));
      } catch {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

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
      const body = await readJsonBody(req);
      const result = await handler(body);
      return sendJson(res, result.status, result.body);
    } catch (err) {
      console.error('API error:', err);
      return sendJson(res, 500, { error: 'Internal server error' });
    }
  };
}

function createGetHandler(message) {
  return async (req, res) => {
    applyCors(res);
    if (req.method === 'OPTIONS') {
      res.statusCode = 200;
      return res.end();
    }
    return sendJson(res, 200, { message });
  };
}

module.exports = { createPostHandler, createGetHandler, sendJson, applyCors };
