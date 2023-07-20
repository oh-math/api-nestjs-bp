import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit {
  constructor(public readonly client: PrismaClient) {}
  async onModuleInit() {
    await this.client.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.client.$on('beforeExit', async () => {
      await app.close();
    });
  }
}