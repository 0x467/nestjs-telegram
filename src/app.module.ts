import { Module } from '@nestjs/common';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [TelegramModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
