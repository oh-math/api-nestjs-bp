import { config as dotEnvConfig } from 'dotenv';
import { z } from 'zod';


if (process.env.NODE_ENV === 'test') {
  dotEnvConfig({ path: '.env.test' });
} else {
  dotEnvConfig();
}

const envSchema = z.object({
  // Local
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  PORT: z.coerce.number().default(3000),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  DATABASE_URL: z.string(),
  // AWS
  S3_REGION: z.string().min(7).default('sa-east-1'),
  S3_BUCKET: z.string(),
  S3_ACCESS_KEY_ID: z.string().min(10).max(21),
  S3_SECRET_ACCESS_KEY: z.string(),
  // Auth
  JWT_SECRET_KEY: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  console.error(
    '❌ Invalid environment variables:',
    JSON.stringify(env.error.format(), null, 4),
  );
  process.exit(1);
}

export const config = env.data;
