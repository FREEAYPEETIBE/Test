
const express = require('express');
const cors = require('cors');
const path = require('path');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/stream', (req, res) => {
  const streamUrl = req.query.url;
  if (!streamUrl) return res.status(400).send('Missing URL');

  const headers = {
    'User-Agent': 'Mozilla/5.0',
    'Referer': streamUrl
  };

  request({ url: streamUrl, headers }).on('error', () => {
    res.status(500).send('Error fetching stream');
  }).pipe(res);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`App + Proxy server running on port ${PORT}`);
});
