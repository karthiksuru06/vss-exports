const store = require('./_store');
const { sendJson, applyCors } = require('./_http');

module.exports = async (req, res) => {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, company } = req.body || {};

    if (!email) {
      return sendJson(res, 400, { error: 'Email is required' });
    }

    const existingUser = store.users.find((u) => u.email === email);
    if (existingUser) {
      return sendJson(res, 200, { message: 'Welcome back!', user: existingUser });
    }

    const newUser = {
      id: store.nextUserId(),
      name,
      email,
      phone,
      company,
      created_at: new Date().toISOString(),
    };
    store.users.push(newUser);

    return sendJson(res, 200, {
      message: 'Registration successful',
      user: newUser,
    });
  } catch (err) {
    console.error('login error', err);
    return sendJson(res, 500, { error: 'Internal server error' });
  }
};
