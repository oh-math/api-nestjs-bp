import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const createPrismaExtended = (prisma: PrismaClient) =>
  prisma.$extends({
    model: {
      user: {
        async findByIdOrEmail(input: string) {
          const parsedInput = parseInt(input);
          return prisma.user.findFirst({
            where: {
              OR: [
                { id: !isNaN(parsedInput) ? parsedInput : undefined },
                { email: input },
              ],
            },
          });
        },
      },
    },
  });

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private extendedClient: ReturnType<typeof createPrismaExtended>;

  constructor(readonly client: PrismaClient) {}
  
  async onModuleInit() {
    await this.client.$connect();
    Logger.log('## DB connection established');
  }

  get extended() {
    if (!this.extendedClient) {
      this.extendedClient = createPrismaExtended(this.client);
    }

    return this.extendedClient;
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
