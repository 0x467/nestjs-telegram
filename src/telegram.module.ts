import { DynamicModule, Module, Provider } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import {
  TelegramModuleAsyncOptions,
  TelegramModuleOptions,
  TelegramOptionsFactory,
} from './interfaces/telegram-module-options.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';
import { createTelegramProvider } from './telegram.provider';
import { TelegramService } from './telegram.service';

@Module({
  imports: [HttpModule],
  providers: [TelegramService],
  exports: [TelegramService],
})
export class TelegramModule {
  static forRoot(options: TelegramModuleOptions): DynamicModule {
    return {
      module: TelegramModule,
      providers: createTelegramProvider(options),
    };
  }

  static forRootAsync(options: TelegramModuleAsyncOptions): DynamicModule {
    return {
      module: TelegramModule,
      imports: options.imports || [],
      providers: this.createAsyncProvider(options),
    };
  }

  private static createAsyncProvider(
    options: TelegramModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: TelegramModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: TELEGRAM_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: TELEGRAM_MODULE_OPTIONS,
      useFactory: async (optionsFactory: TelegramOptionsFactory) =>
        await optionsFactory.createTelegramOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
