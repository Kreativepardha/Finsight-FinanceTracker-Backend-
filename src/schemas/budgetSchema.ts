import { z } from 'zod'
import { categories } from './transactionSchema'




export const budgetSchema = z.({
  category: z.enum(categories),
  amount: z.number().positive(),
  month: z.number().int().min(1).max(12),
  year: z.number().int().gte(2000)
})
