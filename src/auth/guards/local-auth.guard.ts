import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// Using explicit local guards class to avoid magic strings
export class LocalAuthGuard extends AuthGuard('local') {}
