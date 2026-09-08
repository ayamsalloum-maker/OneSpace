import express from 'express';
import path from 'path';
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

// Serve static assets from root
app.use(express.static(__dirname));

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`OneSpace server listening on http://0.0.0.0:${PORT}`);
});
