// api/send.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "No content provided" });

  const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content })
  });

  if (response.ok) {
    res.status(200).json({ success: true });
  } else {
    res.status(500).json({ error: "Failed to send to Discord" });
  }
}

