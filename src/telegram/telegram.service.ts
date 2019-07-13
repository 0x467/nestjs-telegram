import { HttpService, Inject, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { TelegramModuleOptions } from './interfaces';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

@Injectable()
export class TelegramService {
  constructor(
    @Inject(TELEGRAM_MODULE_OPTIONS)
    private readonly options: TelegramModuleOptions,
    private readonly http: HttpService,
  ) {}
}
