import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(join(__dirname, 'dist')));

app.get('/research/*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'research', 'index.html'));
});

app.get('/kira/*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'kira', 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`View Escape running on port ${PORT}`);
});
