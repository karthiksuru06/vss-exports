async function loginUser(store, { name, email, phone, company } = {}) {
  if (!email) {
    return { status: 400, body: { error: 'Email is required' } };
  }

  const existingUser = await store.findUserByEmail(email);
  if (existingUser) {
    return { status: 200, body: { message: 'Welcome back!', user: existingUser } };
  }

  const newUser = await store.createUser({ name, email, phone, company });
  return {
    status: 200,
    body: { message: 'Registration successful', user: newUser },
  };
}

async function submitInquiry(store, { user_id, name, email, message, type } = {}) {
  if (!email && type !== 'general') {
    return { status: 400, body: { error: 'Email is required' } };
  }

  const inquiry = await store.createInquiry({
    user_id,
    name,
    email,
    message,
    type,
  });

  return {
    status: 200,
    body: { message: 'Inquiry received successfully!', id: inquiry.id },
  };
}

module.exports = { loginUser, submitInquiry };
