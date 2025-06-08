import { z } from 'zod';

export const categories = [
  'Food',
  'Rent',
  'Travel',
  'Utilities',
  'Entertainment',
  'Other',
] as const;

export const transactionSchema = z.object({
  amount: z.number().positive({ message: 'Amount must be a positive number' }),
  description: z.string().min(1, { message: 'Description is required' }),
 date: z.coerce.date(),
  category: z.enum(categories, { required_error: 'Category is required' }),
});
