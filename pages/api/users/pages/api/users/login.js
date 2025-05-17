export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (email === 'test@example.com' && password === 'password') {
      return res.status(200).json({ token: 'dummy-token-123' });
    }
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
