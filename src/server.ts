require('dotenv').config();
import express from 'express';
import { Router, Request, Response } from 'express';
import CoinsRouter from './routes/coins.route';

const app = express();

app.use('/coins', CoinsRouter);

const route = Router()

app.use(express.json())

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world' })
})

app.use(route)

app.listen(3333, () => 'server running on port 3333');