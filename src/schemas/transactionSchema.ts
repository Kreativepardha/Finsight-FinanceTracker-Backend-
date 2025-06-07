import { z } from 'zod'

const categoryEnum = z.enum(['Food', 'Rent', 'Travel', 'Groceries', 'Subscriptions', 'other']);

const baseTransactionSchema = z.object({
  amount: z.number().positive(),
  description: z.string().min(1),
  date: z.string().transform((str) => new Date(str)),
  category: categoryEnum,
});

export const transactionSchema = {
  create: baseTransactionSchema,
  update: baseTransactionSchema.partial(),
  query: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    category: categoryEnum.optional(),
  }),
};


