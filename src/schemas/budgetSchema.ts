import { z } from 'zod'

const categoryEnum = z.enum(['Food', 'Rent', 'Travel', 'Groceries', 'Subscriptions', 'other'])


export const budgetSchema = z.object({
  category: categoryEnum,
  amount: z.number().positive(),
  month: z.number().int(),
  year: z.number().int().gte(2000),
});