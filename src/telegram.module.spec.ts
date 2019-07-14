import { Test } from '@nestjs/testing';
import { TelegramModule } from './telegram.module';

describe('telegramModule', () => {
  describe('forRoot', () => {
    it('should be defined', async () => {
      const module = await Test.createTestingModule({
        imports: [TelegramModule.forRoot({ botKey: 'someBotToken' })],
      });
      expect(module).toBeDefined();
    });
  });
  describe('forRootAsync', () => {
    it('should be defined (factory)', async () => {
      const module = await Test.createTestingModule({
        imports: [
          TelegramModule.forRootAsync({
            useFactory: () => {
              return { botKey: 'someKey' };
            },
          }),
        ],
      });
      expect(module).toBeDefined();
    });
    it('should be defined (factory)(inject)', async () => {
      const module = await Test.createTestingModule({
        imports: [
          TelegramModule.forRootAsync({
            useFactory: (config: { [key: string]: any }) => {
              return config.botKey;
            },
            inject: [
              {
                provide: 'Config',
                useValue: { botKey: 'someKey' },
              },
            ],
          }),
        ],
      });
      expect(module).toBeDefined();
    });
    it('should be defined (useClass)', async () => {
      const module = await Test.createTestingModule({
        imports: [
          TelegramModule.forRootAsync({
            useClass: {} as any,
          }),
        ],
      });
      expect(module).toBeDefined();
    });
    it('should be defined (factory)', async () => {
      const module = await Test.createTestingModule({
        imports: [
          TelegramModule.forRootAsync({
            useExisting: {} as any,
          }),
        ],
      });
      expect(module).toBeDefined();
    });
  });
});
