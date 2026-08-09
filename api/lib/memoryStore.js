/** In-memory store for Vercel serverless (per instance, not durable). */
const users = [];
const inquiries = [];
let lastUserId = 1;
let lastInquiryId = 1;

const memoryStore = {
  async findUserByEmail(email) {
    return users.find((u) => u.email === email) || null;
  },

  async createUser({ name, email, phone, company }) {
    const user = {
      id: lastUserId++,
      name,
      email,
      phone,
      company,
      created_at: new Date().toISOString(),
    };
    users.push(user);
    return user;
  },

  async createInquiry({ user_id, name, email, message, type }) {
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
    return inquiry;
  },
};

module.exports = memoryStore;
