import express, { Request, Response } from 'express';
import 'dotenv/config';
import itemsRouter from './routes/items';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the backend!' });
});

app.use('/api/items', itemsRouter);

app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT} [${process.env.NODE_ENV || 'development'}]`);
});