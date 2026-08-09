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
    const { user_id, name, email, message, type } = req.body || {};

    if (!email && type !== 'general') {
      return sendJson(res, 400, { error: 'Email is required' });
    }

    const newInquiry = {
      id: store.nextInquiryId(),
      user_id: user_id || null,
      name,
      email,
      message,
      type: type || 'general',
      created_at: new Date().toISOString(),
    };
    store.inquiries.push(newInquiry);

    console.log('New inquiry:', newInquiry);

    return sendJson(res, 200, {
      message: 'Inquiry received successfully!',
      id: newInquiry.id,
    });
  } catch (err) {
    console.error('inquire error', err);
    return sendJson(res, 500, { error: 'Internal server error' });
  }
};
