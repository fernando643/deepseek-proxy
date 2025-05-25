export default async function handler(req, res) {
  const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
  const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
  };

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Proxy error", detail: error.message });
  }
}