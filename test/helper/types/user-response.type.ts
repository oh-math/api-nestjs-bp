import { Address } from "@prisma/client";

export type UserResponseReturned = {
    body: {
      id?: number;
      name: string;
      email: string;
      password: string;
      address?: Address;
    };
  }
  