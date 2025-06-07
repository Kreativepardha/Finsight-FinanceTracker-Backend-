import { z } from 'zod';
import * as dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().optional(),
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().url().optional()
})


export const env = envSchema.parse(process.env);

