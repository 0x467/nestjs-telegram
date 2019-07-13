import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [
    TelegramModule.registerAsync({
      useFactory: () => ({
        botKey: '837268094:AAF-F0s7aN_yTI4ChiLdYrkhwxpDmoJ4E68',
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
