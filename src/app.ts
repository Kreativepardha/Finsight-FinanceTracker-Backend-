import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './config/swagger'
import transactionRoutes from './routes/transactionRoute'
import budgetRoutes from './routes/budgetRoute'
import { env } from './config/env'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(cors({ origin: '*' }))

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(limiter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/transactions', transactionRoutes)
app.use('/api/budgets', budgetRoutes)


app.use(errorHandler)

export default app
