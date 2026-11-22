export default async function handler(req: any, res: any) {
  try {
    const text = (req.query && req.query.text) || 'Hallo';
    const cleanText = String(text).trim().slice(0, 500);
    const targetUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=de&client=tw-ob&q=${encodeURIComponent(cleanText)}`;

    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      res.status(response.status).send('Error fetching German TTS audio');
      return;
    }

    const arrayBuf = await response.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(Buffer.from(arrayBuf));
  } catch (err: any) {
    res.status(500).send(err.message || 'Server error');
  }
}
