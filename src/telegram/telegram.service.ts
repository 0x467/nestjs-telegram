import {
  HttpService,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TelegramModuleOptions } from './interfaces/telegram-module-options.interface';
import {
  TelegramAPIOptions,
  TelegramException,
  TelegramFile,
  TelegramMessage,
  TelegramResponse,
  TelegramUser,
  TelegramUserProfilePhotos,
  TelegramChat,
  TelegramChatMember,
  TelegramServiceResponse,
  TelegramPoll,
} from './interfaces/telegramTypes.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

@Injectable()
export class TelegramService implements OnModuleInit {
  private url: string;
  private usePromise: boolean;
  private logger = new Logger(TelegramService.name);

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
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<T> {
    const callout$ = this.http
      .post<TelegramResponse<T>>(this.url + url, data)
      .pipe(
        map((res) => {
          if (!res.data.ok) {
            throw new TelegramException(
              res.data.description,
              res.data.error_code.toString(),
            );
          }
          return res.data.result;
        }),
        catchError((error: Error) => {
          throw new TelegramException(error.message);
        }),
      );
    if (options.promise || this.usePromise) {
      return callout$.toPromise();
    }
    return callout$;
  }

  getMe(options?: TelegramAPIOptions): TelegramServiceResponse<TelegramUser> {
    return this.doCall<TelegramUser>(this.getMe.name, {}, options);
  }

  sendMessage(
    data: TelegramSendMessageParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(this.sendMessage.name, data, options);
  }

  forwardMessage(
    data: TelegramForwardMessageParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(
      this.forwardMessage.name,
      data,
      options,
    );
  }

  sendPhoto(
    data: TelegramSendPhotoParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(this.sendPhoto.name, data, options);
  }

  sendAudio(
    data: TelegramSendAudioParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(this.sendAudio.name, data, options);
  }

  sendDocument(
    data: TelegramSendDocumentParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(this.sendDocument.name, data, options);
  }

  sendVideo(
    data: TelegramSendVideoParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(this.sendVideo.name, data, options);
  }

  sendAnimation(
    data: TelegramSendAnimationParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(this.sendAnimation.name, data, options);
  }

  sendVoice(
    data: TelegramSendVoiceParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(this.sendVoice.name, data, options);
  }

  sendVideoNote(
    data: TelegramSendVideoNoteParas,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(this.sendVideoNote.name, data, options);
  }

  sendMediaGroup(
    data: TelegramSendMediaGroupParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage[]> {
    return this.doCall<TelegramMessage[]>(
      this.sendMediaGroup.name,
      data,
      options,
    );
  }

  sendLocation(
    data: TelegramSendLocationParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(this.sendLocation.name, data, options);
  }

  editMessageLiveLocation(
    data: TelegramEditMessageLiveLocationParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(
      this.editMessageLiveLocation.name,
      data,
      options,
    );
  }

  stopMessageLiveLocation(
    data: TelegramStopMessageLiveLocationParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(
      this.stopMessageLiveLocation.name,
      data,
      options,
    );
  }

  sendVenue(
    data: TelegramSendVanueParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(this.sendVenue.name, data, options);
  }

  sendContact(
    data: TelegramSendContactParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(this.sendContact.name, data, options);
  }

  sendPoll(
    data: TelegramSendPollParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(this.sendPoll.name, data, options);
  }

  sendChatAction(
    data: TelegramSendChatActionParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<true> {
    return this.doCall<true>(this.sendChatAction.name, data, options);
  }

  getUserProfilePhotos(
    data: TelegramGetUserProfilePhotosParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramUserProfilePhotos> {
    return this.doCall<TelegramUserProfilePhotos>(
      this.getUserProfilePhotos.name,
      data,
      options,
    );
  }

  getFile(
    data: TelegramGetFileParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramFile> {
    return this.doCall<TelegramFile>(this.getFile.name, data, options);
  }

  kickChatMember(
    data: TelegramKickChatMemberParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<true> {
    return this.doCall<true>(this.kickChatMember.name, data, options);
  }

  unbanChatMember(
    data: TelegramUnbanChatMemberParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<true> {
    return this.doCall<true>(this.unbanChatMember.name, data, options);
  }

  restrictChatMember(
    data: TelegramRestrictChatMemberParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<true> {
    return this.doCall<true>(this.restrictChatMember.name, data, options);
  }

  promoteChatMember(
    data: TelegramPromoteChatMemberParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<true> {
    return this.doCall<true>(this.promoteChatMember.name, data, options);
  }

  exportChatInviteLink(
    data: TelegramExportChatInviteLinkParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<string> {
    return this.doCall<string>(this.exportChatInviteLink.name, data, options);
  }

  setChatPhoto(
    data: TelegramSetChatPhotoParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<true> {
    return this.doCall<true>(this.setChatPhoto.name, data, options);
  }

  deleteChatPhoto(
    data: TelegramDeleteChatPhotoParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<true> {
    return this.doCall<true>(this.deleteChatPhoto.name, data, options);
  }

  setChatTitle(
    data: TelegramSetChatTitleParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<true> {
    return this.doCall<true>(this.setChatTitle.name, data, options);
  }

  setChatDescription(
    data: TelegramSetChatDescriptionParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<true> {
    return this.doCall<true>(this.setChatDescription.name, data, options);
  }

  pinChatMessage(
    data: TelegramPinChatMessageParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<true> {
    return this.doCall<true>(this.pinChatMessage.name, data, options);
  }

  unpinChatMessage(
    data: TelegramUnpinChatMessageParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<true> {
    return this.doCall<true>(this.unpinChatMessage.name, data, options);
  }

  leaveChat(
    data: TelegramLeaveChatParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<true> {
    return this.doCall<true>(this.leaveChat.name, data, options);
  }

  getChat(
    data: TelegramGetChatParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramChat> {
    return this.doCall<TelegramChat>(this.getChat.name, data, options);
  }

  getChatAdministrators(
    data: TelegramGetChatAdministratorsParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramChatMember[]> {
    return this.doCall<TelegramChatMember[]>(
      this.getChatAdministrators.name,
      data,
      options,
    );
  }

  getChatMembersCount(
    data: TelegramGetChatMembersCountParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<number> {
    return this.doCall<number>(this.getChatMembersCount.name, data, options);
  }

  getChatMember(
    data: TelegramGetChatMemberParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramChatMember> {
    return this.doCall<TelegramChatMember>(
      this.getChatMember.name,
      data,
      options,
    );
  }

  setChatStickerSet(
    data: TelegramSetChatStickerSetParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<true> {
    return this.doCall<true>(this.setChatStickerSet.name, data, options);
  }

  deleteChatStickerSet(
    data: TelegramDeleteStickerSetParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<true> {
    return this.doCall<true>(this.deleteChatStickerSet.name, data, options);
  }

  answerCallbackQuery(
    data: TelegramAnswerCallbackQueryParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<true> {
    return this.doCall<true>(this.answerCallbackQuery.name, data, options);
  }

  editMessageText(
    data: TelegramEditMessageText,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(
      this.editMessageText.name,
      data,
      options,
    );
  }

  editMessageCaption(
    data: TelegramEditMessageCaptionParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(
      this.editMessageCaption.name,
      data,
      options,
    );
  }

  editMessageMedia(
    data: TelegramEditMessageMediaParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(
      this.editMessageMedia.name,
      data,
      options,
    );
  }

  editMessageReplyMarkup(
    data: TelegramEditMessageReplyMarkupParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramMessage> {
    return this.doCall<TelegramMessage>(
      this.editMessageReplyMarkup.name,
      data,
      options,
    );
  }

  stopPoll(
    data: TelegramStopPollParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<TelegramPoll> {
    return this.doCall<TelegramPoll>(
      this.editMessageReplyMarkup.name,
      data,
      options,
    );
  }

  deleteMessage(
    data: TelegramDeleteMessageParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<true> {
    return this.doCall<true>(this.deleteMessage.name, data, options);
  }

  sendSticker(
    data: TelegramSendStickerParams,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<T> {
    return this.doCall<T>(this.sendSticker.name, data, options);
  }

  getStickerSet(
    data: any,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<T> {
    return this.doCall<T>(this.getStickerSet.name, data, options);
  }

  uploadStickerSet(
    data: any,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<T> {
    return this.doCall<T>(this.uploadStickerSet.name, data, options);
  }

  createNewStickerSet(
    data: any,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<T> {
    return this.doCall<T>(this.createNewStickerSet.name, data, options);
  }

  addStickerToSet(
    data: any,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<T> {
    return this.doCall<T>(this.addStickerToSet.name, data, options);
  }

  setStickerPositionInSet(
    data: any,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<T> {
    return this.doCall<T>(this.setStickerPositionInSet.name, data, options);
  }

  deleteStickerFromSet(
    data: any,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<T> {
    return this.doCall<T>(this.deleteStickerFromSet.name, data, options);
  }

  sendInvoice(
    data: any,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<T> {
    return this.doCall<T>(this.sendInvoice.name, data, options);
  }

  answerShippingQuery(
    data: any,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<T> {
    return this.doCall<T>(this.answerShippingQuery.name, data, options);
  }

  answerPreCheckoutQuery(
    data: any,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<T> {
    return this.doCall<T>(this.answerPreCheckoutQuery.name, data, options);
  }

  sendGame(
    data: any,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<T> {
    return this.doCall<T>(this.sendGame.name, data, options);
  }

  setGameScore(
    data: any,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<T> {
    return this.doCall<T>(this.setGameScore.name, data, options);
  }

  getGameHighScore(
    data: any,
    options?: TelegramAPIOptions,
  ): TelegramServiceResponse<T> {
    return this.doCall<T>(this.getGameHighScore.name, data, options);
  }
}
