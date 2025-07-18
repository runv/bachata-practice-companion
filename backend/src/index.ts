import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import uploadRouter from './routes/upload';
import videosRouter from './routes/videos';
import tagsRouter from './routes/tags';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/upload', uploadRouter);
app.use('/videos', videosRouter);
app.use('/tags', tagsRouter);
app.use('/thumbnails', express.static(path.join(__dirname, '../storage/thumbnails')));


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

