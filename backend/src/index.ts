import express from 'express';
import cors from 'cors';
import uploadRouter from './routes/upload';
import videosRouter from './routes/videos';
import tagsRouter from './routes/tags';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/upload', uploadRouter);
app.use('/videos', videosRouter);
app.use('/tags', tagsRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

