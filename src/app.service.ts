import { Injectable } from '@nestjs/common';
import { TelegramService } from './telegram';

@Injectable()
export class AppService {
  constructor(private readonly telegram: TelegramService) {}

  getMe() {
    return this.telegram.getMe({ promise: true });
  }
}
