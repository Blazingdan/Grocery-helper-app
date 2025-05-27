// pages/api/users/login.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Dummy user check
    if (email === 'Blazingdan@gmail.com' && password === 'Blaze@123') {
      return res.status(200).json({ token: 'dummy-token-123' });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
