export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message, label, meta } = req.body;

  const r = await fetch(
    'https://api.github.com/repos/GITHUB_KULLANICI_ADI/support-messages/issues',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json'
      },
      body: JSON.stringify({
        title: 'Destek Talebi',
        body: `
Mesaj:
${message}

Cihaz:
${meta.userAgent}
        `,
        labels: [label]
      })
    }
  );

  const d = await r.json();
  res.status(200).json({ issue: d.number });
}
