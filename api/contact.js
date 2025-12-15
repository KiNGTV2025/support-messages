export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { message, label, meta } = req.body;

  const response = await fetch(
    'https://api.github.com/repos/KiNGTV2025/support-messages/issues',
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
${meta?.userAgent || 'bilinmiyor'}
        `,
        labels: [label || 'support']
      })
    }
  );

  const data = await response.json();
  return res.status(200).json({ issue: data.number });
}
