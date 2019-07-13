import { Provider } from '@nestjs/common';
import { TelegramModuleOptions } from './interfaces/telegram-module-options.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

export function createTelegramProvider(
  options: TelegramModuleOptions,
): Provider[] {
  return [
    {
      provide: TELEGRAM_MODULE_OPTIONS,
      useValue: options || {},
    },
  ];
}
