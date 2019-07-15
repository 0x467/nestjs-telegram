<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a><img src="https://cdn.pixabay.com/photo/2016/12/21/17/11/signe-1923369_960_720.png" alt="plus" width="100"> <a href="https://telegram.org" target="blank"><img src="https://telegram.org/img/t_logo.png" width ="140" alt="Telegram Logo"/></a>
</p>
  
  <h1 align="center">A <a href="http://nestjs.com" target="blank">NestJS</a> service wrapper for <a href="https://telegram.org" target="blank">Telegram</a> bots!
  </h1>
  <p align="center">
  <a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/code_style-prettier-purple.svg?style=flat"/></a>
  <a href="http://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-brightgreen.svg"/></a>
  <a href="https://travis-ci.org/jmcdo29/nestjs-telegram"><img src="https://travis-ci.org/jmcdo29/nestjs-telegram.svg?branch=master"/></a>
  <a href="https://coveralls.io/github/jmcdo29/nestjs-telegram?branch=master"><img src="https://coveralls.io/repos/github/jmcdo29/nestjs-telegram/badge.svg?branch=master"/></a>
  <a href="https://github.com/facebook/jest"><img src="https://img.shields.io/badge/tested_with-jest-99424f.svg"/></a>
  <a href="https://dependabot.com"><img src="https://api.dependabot.com/badges/status?host=github&repo=jmcdo29/nestjs-telegram"/></a>
  <a href="https://snyk.io/test/github/jmcdo29/nestjs-telegram?targetFile=package.json"><img src="https://snyk.io/test/github/jmcdo29/nestjs-telegram/badge.svg?targetFile=package.json"/></a>
</p>
<p align="center">
</p>

## Description

[Telegram](https://telegram.org) API wrapper for the Telegram Bots API made to work with the [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
$ npm install nestjs-telegram
```

## Using the Module

```typescript
// Inside of your module imports
@Module({
  imports: [TelegramModule.forRoot({
    botKey: 'YourBotApiToken'
  })]
})

// Or async
@Module({
  imports: [
    TelegramModule.forRootAsync({
      useFactory: async (configService: ConfigService) => {
        return { 
          botKey: configService.get('Telegram_API_Key')
        };
      inject: [ConfigService]
    })
  ],
})
```

In your service class you can inject the service like so and then use it in any function as you would any other service
```typescript
@Injectable()
export class MyService {

  constructor(private readonly telegram: TelegramService) {}

  testBot(): Observable<Telegram.User> {
    return this.telegram.getMe();
  }
}
```

Currently, the service only returns `Observables` as the `HttpModule` does. If you want to use `Promises` just call `.toPromise()` on the function.

## Support

If any bugs are found in the API wrapper, please open an issue on GitHub, or a Pull Request if you want to fix it yourself! Please be as explicit as possible and provide a minimum reproducing repository if at all possible, as it helps track down what went wrong.

## Documentation

All documentation for this wrapper comes from the [Telegram Bot API documentation](https://core.telegram.org/bots/api), if there are any typos, please let me know or open a PR to fix it.

## Todo

* Implement Telegram Passport methods
* Implement Telegram Inline mode options

## Stay in touch

- Author - [Jay McDoniel](https://github.com/jmcdo29)

## License

Nestjs-telegram is [MIT licensed](LICENSE).
