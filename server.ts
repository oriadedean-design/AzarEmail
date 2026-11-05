import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const distPath = path.join(__dirname, 'dist');
  const publicPath = path.join(__dirname, 'public');
  const isProduction =
    process.env.NODE_ENV === 'production' ||
    (fs.existsSync(path.join(distPath, 'index.html')) &&
      !process.env.VITE_DEV_SERVER);

  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'AzarFaith Email Studio',
      version: '02.2026',
    });
  });

  if (process.env.NODE_ENV !== 'production' && !isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else if (process.env.NODE_ENV === 'production') {
    app.use(express.static(distPath));
    app.use(express.static(publicPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AzarFaith Email Studio server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
