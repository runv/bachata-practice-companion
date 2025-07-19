import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import uploadRouter from './routes/upload';
import videosRouter from './routes/videos';
import tagsRouter from './routes/tags';
import categoryRoutes from './routes/categories';
import { ensureCategoriesInitialized } from './models/categoryModel.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Use CORS with allowed origin from .env
const allowedOrigin = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use(cors({
  origin: allowedOrigin,
}));

// Set COEP/COOP/CORP headers for all responses
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  next();
});

// Serve static thumbnails with headers
app.use('/thumbnails', express.static(path.join(__dirname, '../storage/thumbnails'), {
  setHeaders: (res) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  }
}));

app.use('/upload', uploadRouter);
app.use('/videos', videosRouter);
app.use('/tags', tagsRouter);
app.use('/categories', categoryRoutes);

await ensureCategoriesInitialized();
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

