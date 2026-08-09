export const config = { runtime: 'edge' };

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const inquiries = [];
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
    const { user_id, name, email, message, type } = body || {};

    if (!email && type !== 'general') {
      return Response.json({ error: 'Email is required' }, { status: 400, headers: corsHeaders });
    }

    const inquiry = {
      id: nextId++,
      user_id: user_id || null,
      name,
      email,
      message,
      type: type || 'general',
      created_at: new Date().toISOString(),
    };
    inquiries.push(inquiry);
    console.log('New inquiry:', inquiry);

    return Response.json(
      { message: 'Inquiry received successfully!', id: inquiry.id },
      { headers: corsHeaders }
    );
  } catch (err) {
    console.error('inquire edge error', err);
    return Response.json({ error: 'Internal server error' }, { status: 500, headers: corsHeaders });
  }
}
