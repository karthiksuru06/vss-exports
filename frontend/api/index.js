const { sendJson, applyCors } = require('./_http');

module.exports = (req, res) => {
  applyCors(req, res);
  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }
  return sendJson(res, 200, { message: 'VV Marine API is running' });
};
