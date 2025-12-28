const { parse } = require('url');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Allow', 'POST');
    res.end('Method Not Allowed');
    return;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');

  try {
    const body = raw ? JSON.parse(raw) : {};
    console.log('Client log:', body);
  } catch (error) {
    console.error('Client log parse error:', error.message);
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ ok: true }));
};
