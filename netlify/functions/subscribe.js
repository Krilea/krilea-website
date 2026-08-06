const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'method-not-allowed' }, { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'invalid-json' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const consent = body.consent === true;

  if (!EMAIL_RE.test(email) || !consent) {
    return Response.json({ error: 'invalid-input' }, { status: 400 });
  }

  const apiKey = process.env.MAILERLITE_API_KEY;
  const groupId = process.env.MAILERLITE_GROUP_ID;

  if (!apiKey) {
    console.error('MAILERLITE_API_KEY is not configured');
    return Response.json({ error: 'not-configured' }, { status: 500 });
  }

  try {
    const payload = {
      email,
      ...(groupId ? { groups: [groupId] } : {}),
    };

    const mlRes = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!mlRes.ok) {
      const detail = await mlRes.text();
      console.error('MailerLite error', mlRes.status, detail);
      return Response.json({ error: 'mailerlite-error' }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('subscribe function failed', err);
    return Response.json({ error: 'server-error' }, { status: 500 });
  }
};
