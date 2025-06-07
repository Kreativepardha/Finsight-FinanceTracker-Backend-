import express from 'express'
import 'dotenv/config'
import { env } from './config/env.ts';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
// import { error}
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger.ts';




const app = express();
app.use(helmet())
app.use(cors({ origin: '*' }))

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})




app.use(limiter)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))


app.use('/api/transactions', transactionRoutes);
app.use('/api/budget', budgetRoutes);

export default app;
