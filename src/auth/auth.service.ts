import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compareSync } from 'bcrypt';
import { UserService } from 'src/user';
import { PayloadJWT } from './types/payload.type';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(user: User) {
    const payload: PayloadJWT = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  public async validateUser(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userService.findUnique({
      where: {
        email,
      },
    });

    // validating passed password with  database password
    const isPasswordValid = compareSync(password, user.password);
    
    if (!isPasswordValid) return null;

    return user;
  }
}
