import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();

app.use(cors());

app.get('/api/rss', async (req, res) => {
  try {
    const response = await fetch('https://news.google.com/rss', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    });
    const data = await response.text();
    res.send(data);
  } catch (error) {
    res.status(500).send('Error fetching RSS');
  }
});

app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});