import { z } from 'zod'

export const categories = [
  'Food', 'Rent', ' Subscriptions', 'Groceries', 'Travel', 'other'
] as const;

export const transactionSchema = z.object({
  amount: z.number().positive({ message: 'Amount must be a positive number' }),
  descripition: z.string().min(1, { message: 'Des ription is required' }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format'
  }),
  category: z.enum(categories, {
    required_error: 'Category is required'
  })
})


