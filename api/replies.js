export default async function handler(req, res) {
  const { issue } = req.query;

  if (!issue) {
    return res.status(400).json({ error: "issue gerekli" });
  }

  const r = await fetch(
    `https://api.github.com/repos/KiNGTV2025/support-messages/issues/${issue}/comments`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json"
      }
    }
  );

  const data = await r.json();
  res.status(200).json(data);
}
