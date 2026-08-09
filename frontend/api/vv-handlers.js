/**
 * Vercel serverless handlers — single file bundle (no subfolder requires).
 * Used by login.js, inquire.js, and index.js
 */

const users = [];
const inquiries = [];
let lastUserId = 1;
let lastInquiryId = 1;

function sendJson(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
}

function applyCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

async function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
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

async function loginUser(body) {
  const { name, email, phone, company } = body || {};
  if (!email) {
    return { status: 400, body: { error: 'Email is required' } };
  }
  const existing = users.find((u) => u.email === email);
  if (existing) {
    return { status: 200, body: { message: 'Welcome back!', user: existing } };
  }
  const user = {
    id: lastUserId++,
    name,
    email,
    phone,
    company,
    created_at: new Date().toISOString(),
  };
  users.push(user);
  return { status: 200, body: { message: 'Registration successful', user } };
}

async function submitInquiry(body) {
  const { user_id, name, email, message, type } = body || {};
  if (!email && type !== 'general') {
    return { status: 400, body: { error: 'Email is required' } };
  }
  const inquiry = {
    id: lastInquiryId++,
    user_id: user_id || null,
    name,
    email,
    message,
    type: type || 'general',
    created_at: new Date().toISOString(),
  };
  inquiries.push(inquiry);
  console.log('New inquiry:', inquiry);
  return { status: 200, body: { message: 'Inquiry received successfully!', id: inquiry.id } };
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

module.exports = {
  createPostHandler,
  createGetHandler,
  loginUser,
  submitInquiry,
};
