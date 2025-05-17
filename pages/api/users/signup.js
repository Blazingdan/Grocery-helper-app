export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    if (email && password && name) {
      // Just a dummy token for demo
      return res.status(200).json({ token: 'dummy-signup-token-456' });
    }
    return res.status(400).json({ error: 'Missing fields' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
