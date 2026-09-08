import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Enable CORS and allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

// Explicit Blueprint & PDF routes
app.get('/blueprint', (req, res) => {
  res.sendFile(path.join(__dirname, 'blueprint.html'));
});

app.get('/blueprint.pdf', (req, res) => {
  res.download(path.join(__dirname, 'OneSpace-Visual-Blueprint-2026.pdf'), 'OneSpace-Visual-Blueprint-2026.pdf');
});

// Color-review branch only: load the isolated Aya palette override without
// touching the large application file or any data/behavior code.
function sendIndexWithAyaColors(res) {
  const indexPath = path.join(__dirname, 'index.html');
  fs.readFile(indexPath, 'utf8', (err, html) => {
    if (err) {
      res.status(500).send('Unable to load OneSpace');
      return;
    }

    const stylesheet = '<link rel="stylesheet" href="/aya-colors.css">';
    const output = html.includes(stylesheet)
      ? html
      : html.replace('</head>', `  ${stylesheet}\n</head>`);

    res.type('html').send(output);
  });
}

app.get(['/', '/index.html'], (req, res) => {
  sendIndexWithAyaColors(res);
});

// Serve static assets from root
app.use(express.static(__dirname, { index: false }));

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  sendIndexWithAyaColors(res);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`OneSpace server listening on http://0.0.0.0:${PORT}`);
});
