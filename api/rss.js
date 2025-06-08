const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send('Missing URL parameter');
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    });
    const data = await response.text();
    res.setHeader('Content-Type', 'application/xml');
    res.send(data);
  } catch (error) {
    res.status(500).send('Error fetching RSS feed');
  }
};