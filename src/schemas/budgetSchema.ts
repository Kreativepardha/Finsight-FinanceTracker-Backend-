import { z } from 'zod'

const categoryEnum = z.enum(['Food', 'Rent', 'Travel', 'Groceries', 'Subscriptions', 'other'])

const baseBudgetSchema = z.object({
  category: categoryEnum,
  amount: z.number().positive(),
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(2000)
})

export const budgetSchema = {
  create: baseBudgetSchema,
  update: baseBudgetSchema.partial(),
  query: z.object({
    month: z.number().int().min(1).max(12).optional(),
    year: z.number().int().min(2000).optional(),
  }),
}
