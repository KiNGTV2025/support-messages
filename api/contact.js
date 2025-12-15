export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { message } = req.body;

  const r = await fetch(
    "https://api.github.com/repos/KiNGTV2025/support-messages/issues",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json"
      },
      body: JSON.stringify({
        title: "Yeni Mesaj",
        body: message
      })
    }
  );

  const d = await r.json();
  return res.status(200).json({ issue: d.number });
}
