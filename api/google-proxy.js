// File: api/google-proxy.js

export default async function handler(req, res) {
  // Fetch the hidden Google Script URL from Vercel's Environment Variables
  const GOOGLE_SCRIPT_URL = process.env.HIDDEN_SCRIPT_URL;

  try {
    // 1. IF THE WEBSITE IS ASKING FOR PRODUCTS (GET REQUEST)
    if (req.method === 'GET') {
      const googleResponse = await fetch(GOOGLE_SCRIPT_URL);
      const data = await googleResponse.json();
      return res.status(200).json(data);
    } 
    
    // 2. IF THE WEBSITE IS SENDING A PAYMENT OR LOGIN (POST REQUEST)
    else if (req.method === 'POST') {
      const googleResponse = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: new URLSearchParams(req.body),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const data = await googleResponse.json();
      return res.status(200).json(data);
    } 
    
    // Block anything else
    else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }

  } catch (error) {
    return res.status(500).json({ error: 'Failed to connect to backend' });
  }
}
