export const config = { runtime: 'edge' };

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/** Per-isolate memory (serverless); not durable across all instances. */
const usersByEmail = new Map();
let nextId = 1;

export default async function handler(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405, headers: corsHeaders });
  }

  try {
    const body = await request.json();
    const { name, email, phone, company } = body || {};

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400, headers: corsHeaders });
    }

    const existing = usersByEmail.get(email);
    if (existing) {
      return Response.json({ message: 'Welcome back!', user: existing }, { headers: corsHeaders });
    }

    const user = {
      id: nextId++,
      name,
      email,
      phone,
      company,
      created_at: new Date().toISOString(),
    };
    usersByEmail.set(email, user);

    return Response.json({ message: 'Registration successful', user }, { headers: corsHeaders });
  } catch (err) {
    console.error('login edge error', err);
    return Response.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}
