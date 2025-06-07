import express from 'express'
import 'dotenv/config'
import { env } from './config/env';
// import { error}



const app = express();

app.use(express.json())
// app.use('/api/transactions', transa)


export default app;
