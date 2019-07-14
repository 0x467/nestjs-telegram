import { HttpService, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { AxiosRequestConfig } from 'axios';
import { catchError, map } from 'rxjs/operators';
import { TelegramModuleOptions } from './interfaces/telegram-module-options.interface';
import * as Telegram from './interfaces/telegramTypes.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

@Injectable()
export class TelegramService implements OnModuleInit {
  private url: string;
  private usePromise: boolean;

  constructor(
    @Inject(TELEGRAM_MODULE_OPTIONS)
    private readonly options: TelegramModuleOptions,
    private readonly http: HttpService,
  ) {}

  onModuleInit() {
    this.url = `https://api.telegram.org/bot${this.options.botKey}/`;
    this.usePromise = this.options.promise || false;
  }

  private doCall<T>(
    url: string,
    data?: any,
    options?: Telegram.APIOptions,
    axiosOptions?: AxiosRequestConfig,
  ): Telegram.ServiceResponse<T> {
    const callout$ = this.http
      .post<Telegram.Response<T>>(this.url + url, data, axiosOptions)
      .pipe(
        map((res) => {
          if (!res.data.ok) {
            throw new Telegram.Exception(
              res.data.description,
              res.data.error_code.toString(),
            );
          }
          return res.data.result;
        }),
        catchError((error: Error) => {
          throw new Telegram.Exception(error.message);
        }),
      );
    if (options.promise || this.usePromise) {
      return callout$.toPromise();
    }
    return callout$;
  }

  /**
   * A simple method for testing your bot's auth token. Requires no parameters.
   * Returns basic information about the bot in form of a User object.
   */
  getMe(
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.User> {
    return this.doCall<Telegram.User>(this.getMe.name, {}, options);
  }

  /**
   * Use this method to send text messages. On success, the sent Message is returned.
   *
   * ### Formatting options
   * The Bot API supports basic formatting for messages. You can use bold and italic text, as well as inline links and pre-formatted
   * code in your bots' messages.
   *  clients will render them accordingly. You can use either markdown-style or HTML-style formatting.
   *
   * Note that clients will display an alert to the user before opening an inline link
   * (‘Open this link?’ together with the full URL).
   *
   * Links tg://user?id=<user_id> can be used to mention a user by their id without using a username. Please note:
   *
   * These links will work only if they are used inside an inline link. For example, they will not work,
   * when used in an inline keyboard button or in a message text.
   * These mentions are only guaranteed to work if the user has contacted the bot in the past,
   * has sent a callback query to the bot via inline button or is a member in the group where he was mentioned.
   *
   *
   *
   * Markdown style
   * To use this mode, pass Markdown in the parse_mode field when using sendMessage. Use the following syntax in your message:
   *
   * \*bold text\*
   *
   * \_italic text\_
   *
   * \[inline URL\]\(http://www.example.com/\)
   *
   * \[inline mention of a user\]\(tg://user?id=123456789\)
   *
   * \`inline fixed-width code\`
   *
   * \`\`\`block_language
   * pre-formatted fixed-width code block
   * \`\`\`
   *
   *
   *
   * HTML style
   * To use this mode, pass HTML in the parse_mode field when using sendMessage. The following tags are currently supported:
   *
   * <b>bold</b>, <strong>bold</strong>
   *
   * <i>italic</i>, <em>italic</em>
   *
   * <a href="http://www.example.com/">inline URL</a>
   *
   * <a href="tg://user?id=123456789">inline mention of a user</a>
   *
   * <code>inline fixed-width code</code>
   *
   * <pre>pre-formatted fixed-width code block</pre>
   *
   * Please note:
   * Only the tags mentioned above are currently supported.
   * Tags must not be nested.
   * All <, > and & symbols that are not a part of a tag or an HTML entity must be replaced with the
   * corresponding HTML entities (< with &lt;, > with &gt; and & with &amp;).
   * All numerical HTML entities are supported.
   * The API currently supports only the following named HTML entities: &lt;, &gt;, &amp; and &quot;.
   */
  sendMessage(
    data: Telegram.SendMessageParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(this.sendMessage.name, data, options);
  }

  forwardMessage(
    data: Telegram.ForwardMessageParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(
      this.forwardMessage.name,
      data,
      options,
    );
  }

  sendPhoto(
    data: Telegram.SendPhotoParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(this.sendPhoto.name, data, options, {
      headers: {
        'Content-Type':
          typeof data.photo === 'object'
            ? 'multipart/form-data'
            : 'application/json',
      },
    });
  }

  sendAudio(
    data: Telegram.SendAudioParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(this.sendAudio.name, data, options, {
      headers: {
        'Content-Type':
          typeof data.audio === 'object' || typeof data.thumb === 'object'
            ? 'multipart/form-data'
            : 'application/json',
      },
    });
  }

  sendDocument(
    data: Telegram.SendDocumentParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(
      this.sendDocument.name,
      data,
      options,
      {
        headers: {
          'Content-Type':
            typeof data.document === 'object' || typeof data.thumb === 'object'
              ? 'multipart/form-data'
              : 'application/json',
        },
      },
    );
  }

  sendVideo(
    data: Telegram.SendVideoParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(this.sendVideo.name, data, options, {
      headers: {
        'Content-Type':
          typeof data.video === 'object' || typeof data.thumb === 'object'
            ? 'multipart/form-data'
            : 'application/json',
      },
    });
  }

  sendAnimation(
    data: Telegram.SendAnimationParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(
      this.sendAnimation.name,
      data,
      options,
      {
        headers: {
          'Content-Type':
            typeof data.animation === 'object' || typeof data.thumb === 'object'
              ? 'multipart/form-data'
              : 'application/json',
        },
      },
    );
  }

  sendVoice(
    data: Telegram.SendVoiceParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(this.sendVoice.name, data, options, {
      headers: {
        'Content-Type':
          typeof data.voice === 'object' || typeof data.thumb === 'object'
            ? 'multipart/form-data'
            : 'application/json',
      },
    });
  }

  sendVideoNote(
    data: Telegram.SendVideoNoteParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(
      this.sendVideoNote.name,
      data,
      options,
      {
        headers: {
          'Content-Type':
            typeof data.video_note === 'object' ||
            typeof data.thumb === 'object'
              ? 'multipart/form-data'
              : 'application/json',
        },
      },
    );
  }

  sendMediaGroup(
    data: Telegram.SendMediaGroupParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message[]> {
    return this.doCall<Telegram.Message[]>(
      this.sendMediaGroup.name,
      data,
      options,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }

  sendLocation(
    data: Telegram.SendLocationParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(this.sendLocation.name, data, options);
  }

  editMessageLiveLocation(
    data: Telegram.EditMessageLiveLocationParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(
      this.editMessageLiveLocation.name,
      data,
      options,
    );
  }

  stopMessageLiveLocation(
    data: Telegram.StopMessageLiveLocationParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(
      this.stopMessageLiveLocation.name,
      data,
      options,
    );
  }

  sendVenue(
    data: Telegram.SendVenueParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(this.sendVenue.name, data, options);
  }

  sendContact(
    data: Telegram.SendContactParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(this.sendContact.name, data, options);
  }

  sendPoll(
    data: Telegram.SendPollParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(this.sendPoll.name, data, options);
  }

  sendChatAction(
    data: Telegram.SendChatActionParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.sendChatAction.name, data, options);
  }

  getUserProfilePhotos(
    data: Telegram.GetUserProfilePhotosParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.UserProfilePhotos> {
    return this.doCall<Telegram.UserProfilePhotos>(
      this.getUserProfilePhotos.name,
      data,
      options,
    );
  }

  getFile(
    data: Telegram.GetFileParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.File> {
    return this.doCall<Telegram.File>(this.getFile.name, data, options);
  }

  kickChatMember(
    data: Telegram.KickChatMemberParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.kickChatMember.name, data, options);
  }

  unbanChatMember(
    data: Telegram.UnbanChatMemberParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.unbanChatMember.name, data, options);
  }

  restrictChatMember(
    data: Telegram.RestrictChatMemberParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.restrictChatMember.name, data, options);
  }

  promoteChatMember(
    data: Telegram.PromoteChatMemberParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.promoteChatMember.name, data, options);
  }

  exportChatInviteLink(
    data: Telegram.ExportChatInviteLinkParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<string> {
    return this.doCall<string>(this.exportChatInviteLink.name, data, options);
  }

  setChatPhoto(
    data: Telegram.SetChatPhotoParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.setChatPhoto.name, data, options, {
      headers: {
        'Content-Type':
          typeof data.photo === 'object'
            ? 'multipart/form-data'
            : 'application/json',
      },
    });
  }

  deleteChatPhoto(
    data: Telegram.DeleteChatPhotoParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.deleteChatPhoto.name, data, options);
  }

  setChatTitle(
    data: Telegram.SetChatTitleParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.setChatTitle.name, data, options);
  }

  setChatDescription(
    data: Telegram.SetChatDescriptionParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.setChatDescription.name, data, options);
  }

  pinChatMessage(
    data: Telegram.PinChatMessageParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.pinChatMessage.name, data, options);
  }

  unpinChatMessage(
    data: Telegram.UnpinChatMessageParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.unpinChatMessage.name, data, options);
  }

  leaveChat(
    data: Telegram.LeaveChatParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.leaveChat.name, data, options);
  }

  getChat(
    data: Telegram.GetChatParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Chat> {
    return this.doCall<Telegram.Chat>(this.getChat.name, data, options);
  }

  getChatAdministrators(
    data: Telegram.GetChatAdministratorsParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.ChatMember[]> {
    return this.doCall<Telegram.ChatMember[]>(
      this.getChatAdministrators.name,
      data,
      options,
    );
  }

  getChatMembersCount(
    data: Telegram.GetChatMembersCountParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<number> {
    return this.doCall<number>(this.getChatMembersCount.name, data, options);
  }

  getChatMember(
    data: Telegram.GetChatMemberParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.ChatMember> {
    return this.doCall<Telegram.ChatMember>(
      this.getChatMember.name,
      data,
      options,
    );
  }

  setChatStickerSet(
    data: Telegram.SetChatStickerSetParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.setChatStickerSet.name, data, options);
  }

  deleteChatStickerSet(
    data: Telegram.ChatDeleteStickerSetParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.deleteChatStickerSet.name, data, options);
  }

  answerCallbackQuery(
    data: Telegram.AnswerCallbackQueryParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.answerCallbackQuery.name, data, options);
  }

  editMessageText(
    data: Telegram.EditMessageTextParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(
      this.editMessageText.name,
      data,
      options,
    );
  }

  editMessageCaption(
    data: Telegram.EditMessageCaptionParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(
      this.editMessageCaption.name,
      data,
      options,
    );
  }

  editMessageMedia(
    data: Telegram.EditMessageMediaParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(
      this.editMessageMedia.name,
      data,
      options,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }

  editMessageReplyMarkup(
    data: Telegram.EditMessageReplyMarkupParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(
      this.editMessageReplyMarkup.name,
      data,
      options,
    );
  }

  stopPoll(
    data: Telegram.StopPollParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Poll> {
    return this.doCall<Telegram.Poll>(
      this.editMessageReplyMarkup.name,
      data,
      options,
    );
  }

  deleteMessage(
    data: Telegram.DeleteMessageParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.deleteMessage.name, data, options);
  }

  sendSticker(
    data: Telegram.SendStickerParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(this.sendSticker.name, data, options, {
      headers: {
        'Content-Type':
          typeof data.sticker === 'object'
            ? 'multipart/form-data'
            : 'application/json',
      },
    });
  }

  getStickerSet(
    data: Telegram.GetStickerSetParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.StickerSet> {
    return this.doCall<Telegram.StickerSet>(
      this.getStickerSet.name,
      data,
      options,
    );
  }

  uploadStickerFile(
    data: Telegram.UploadStickerFileParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.File> {
    return this.doCall<Telegram.File>(
      this.uploadStickerFile.name,
      data,
      options,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }

  createNewStickerSet(
    data: Telegram.CreateNewStickerSetParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.createNewStickerSet.name, data, options, {
      headers: {
        'Content-Type':
          typeof data.png_sticker === 'object'
            ? 'multipart/form-data'
            : 'application/json',
      },
    });
  }

  addStickerToSet(
    data: Telegram.AddStickerToSetParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.addStickerToSet.name, data, options, {
      headers: {
        'Content-Type':
          typeof data.png_sticker === 'object'
            ? 'multipart/form-data'
            : 'application/json',
      },
    });
  }

  setStickerPositionInSet(
    data: Telegram.SetStickerPositionInSetParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.setStickerPositionInSet.name, data, options);
  }

  deleteStickerFromSet(
    data: Telegram.DeleteStickerFromSetParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.deleteStickerFromSet.name, data, options);
  }

  sendInvoice(
    data: Telegram.SendInvoiceParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(this.sendInvoice.name, data, options);
  }

  answerShippingQuery(
    data: Telegram.AnswerShippingQueryParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.answerShippingQuery.name, data, options);
  }

  answerPreCheckoutQuery(
    data: Telegram.AnswerPreCheckoutQueryParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<true> {
    return this.doCall<true>(this.answerPreCheckoutQuery.name, data, options);
  }

  sendGame(
    data: Telegram.SendGameParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message> {
    return this.doCall<Telegram.Message>(this.sendGame.name, data, options);
  }

  setGameScore(
    data: Telegram.SetGameScoreParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.Message | true> {
    return this.doCall<Telegram.Message | true>(
      this.setGameScore.name,
      data,
      options,
    );
  }

  getGameHighScore(
    data: Telegram.GetGameHighScoreParams,
    options?: Telegram.APIOptions,
  ): Telegram.ServiceResponse<Telegram.GameHighScore[]> {
    return this.doCall<Telegram.GameHighScore[]>(
      this.getGameHighScore.name,
      data,
      options,
    );
  }
}
