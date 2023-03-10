import type { Request } from 'express';
import type { User as PrismaUser } from '@prisma/client';

declare module 'express' {
  export interface Request {
    user: PrismaUser;
  }
}
