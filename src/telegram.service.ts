import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { TelegramModuleOptions } from './interfaces';
import * as Telegram from './interfaces/telegramTypes.interface';
import { TELEGRAM_MODULE_OPTIONS } from './telegram.constants';

@Injectable()
export class TelegramService implements OnModuleInit {
  private url: string;

  constructor(
    @Inject(TELEGRAM_MODULE_OPTIONS)
    private readonly options: TelegramModuleOptions,
    private readonly http: HttpService,
  ) {}

  onModuleInit() {
    this.url = `https://api.telegram.org/bot${this.options.botKey}/`;
  }

  private doCall<T>(
    url: string,
    data?: any,
    axiosOptions?: AxiosRequestConfig,
  ): Observable<T> {
    return this.http
      .post<Telegram.TelegramResponse<T>>(this.url + url, data, axiosOptions)
      .pipe(
        map((res: any) => {
          if (!res.data.ok) {
            throw new Telegram.TelegramException(
              res.data.description,
              res.data.error_code.toString(),
            );
          }
          return res.data.result;
        }),
        catchError((error: Error) => {
          throw new Telegram.TelegramException(error.message);
        }),
      );
  }

  /**
   * Use this method to receive incoming updates using long polling.
   */
  getUpdates(data: Telegram.GetUpdatesParams): Observable<Telegram.Update[]> {
    return this.doCall<Telegram.Update[]>(this.getUpdates.name, data);
  }

  /**
   * A simple method for testing your bot's auth token. Requires no parameters.
   * Returns basic information about the bot in form of a User object.
   */
  getMe(): Observable<Telegram.TelegramUser> {
    return this.doCall<Telegram.TelegramUser>(this.getMe.name, {});
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
    data: Telegram.TelegramSendMessageParams,
  ): Observable<Telegram.TelegramMessage> {
    return this.doCall<Telegram.TelegramMessage>(this.sendMessage.name, data);
  }

  /**
   * Use this method to forward messages of any kind. On success, the sent Message is returned.
   */
  forwardMessage(
    data: Telegram.TelegramForwardMessageParams,
  ): Observable<Telegram.TelegramMessage> {
    return this.doCall<Telegram.TelegramMessage>(
      this.forwardMessage.name,
      data,
    );
  }

  /**
   * Use this method to send photos. On success, the sent Message is returned.
   */
  sendPhoto(
    data: Telegram.TelegramSendPhotoParams,
  ): Observable<Telegram.TelegramMessage> {
    return this.doCall<Telegram.TelegramMessage>(this.sendPhoto.name, data, {
      headers: {
        'Content-Type':
          typeof data.photo === 'object'
            ? 'multipart/form-data'
            : 'application/json',
      },
    });
  }

  /**
   * Use this method to send audio files, if you want Telegram clients to display them in the music player.
   * Your audio must be in the .mp3 format. On success, the sent Message is returned.
   * Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future.
   *
   * For sending voice messages, use the sendVoice method instead.
   */
  sendAudio(
    data: Telegram.TelegramSendAudioParams,
  ): Observable<Telegram.TelegramMessage> {
    return this.doCall<Telegram.TelegramMessage>(this.sendAudio.name, data, {
      headers: {
        'Content-Type':
          typeof data.audio === 'object' || typeof data.thumb === 'object'
            ? 'multipart/form-data'
            : 'application/json',
      },
    });
  }

  /**
   * Use this method to send general files. On success, the sent Message is returned.
   * Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future.
   */
  sendDocument(
    data: Telegram.TelegramSendDocumentParams,
  ): Observable<Telegram.TelegramMessage> {
    return this.doCall<Telegram.TelegramMessage>(this.sendDocument.name, data, {
      headers: {
        'Content-Type':
          typeof data.document === 'object' || typeof data.thumb === 'object'
            ? 'multipart/form-data'
            : 'application/json',
      },
    });
  }

  /**
   * Use this method to send video files, Telegram clients support mp4 videos (other formats may be sent as Document).
   * On success, the sent Message is returned.
   * Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future.
   */
  sendVideo(
    data: Telegram.TelegramSendVideoParams,
  ): Observable<Telegram.TelegramMessage> {
    return this.doCall<Telegram.TelegramMessage>(this.sendVideo.name, data, {
      headers: {
        'Content-Type':
          typeof data.video === 'object' || typeof data.thumb === 'object'
            ? 'multipart/form-data'
            : 'application/json',
      },
    });
  }

  /**
   * Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound).
   * On success, the sent Message is returned.
   * Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future.
   */
  sendAnimation(
    data: Telegram.TelegramSendAnimationParams,
  ): Observable<Telegram.TelegramMessage> {
    return this.doCall<Telegram.TelegramMessage>(
      this.sendAnimation.name,
      data,
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

  /**
   * Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message.
   * For this to work, your audio must be in an .ogg file encoded with OPUS (other formats may be sent as Audio or Document).
   * On success, the sent Message is returned.
   * Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future.
   */
  sendVoice(
    data: Telegram.TelegramSendVoiceParams,
  ): Observable<Telegram.TelegramMessage> {
    return this.doCall<Telegram.TelegramMessage>(this.sendVoice.name, data, {
      headers: {
        'Content-Type':
          typeof data.voice === 'object' || typeof data.thumb === 'object'
            ? 'multipart/form-data'
            : 'application/json',
      },
    });
  }

  /**
   * As of v.4.0, Telegram clients support rounded square mp4 videos of up to 1 minute long. Use this method to send video messages.
   * On success, the sent Message is returned.
   */
  sendVideoNote(
    data: Telegram.TelegramSendVideoNoteParams,
  ): Observable<Telegram.TelegramMessage> {
    return this.doCall<Telegram.TelegramMessage>(
      this.sendVideoNote.name,
      data,
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

  /**
   * Use this method to send a group of photos or videos as an album. On success, an array of the sent Messages is returned.
   */
  sendMediaGroup(
    data: Telegram.TelegramSendMediaGroupParams,
  ): Observable<Telegram.TelegramMessage[]> {
    return this.doCall<Telegram.TelegramMessage[]>(
      this.sendMediaGroup.name,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }

  /**
   * Use this method to send point on the map. On success, the sent Message is returned.
   */
  sendLocation(
    data: Telegram.TelegramSendLocationParams,
  ): Observable<Telegram.TelegramMessage> {
    return this.doCall<Telegram.TelegramMessage>(this.sendLocation.name, data);
  }

  /**
   * Use this method to edit live location messages.
   * A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation.
   * On success, if the edited message was sent by the bot, the edited Message is returned, otherwise True is returned.
   */
  editMessageLiveLocation(
    data: Telegram.TelegramEditMessageLiveLocationParams,
  ): Observable<Telegram.TelegramMessage | true> {
    return this.doCall<Telegram.TelegramMessage | true>(
      this.editMessageLiveLocation.name,
      data,
    );
  }

  /**
   * Use this method to stop updating a live location message before live_period expires.
   * On success, if the message was sent by the bot, the sent Message is returned, otherwise True is returned.
   */
  stopMessageLiveLocation(
    data: Telegram.TelegramStopMessageLiveLocationParams,
  ): Observable<Telegram.TelegramMessage | true> {
    return this.doCall<Telegram.TelegramMessage | true>(
      this.stopMessageLiveLocation.name,
      data,
    );
  }

  /**
   * Use this method to send information about a venue. On success, the sent Message is returned.
   */
  sendVenue(
    data: Telegram.TelegramSendVenueParams,
  ): Observable<Telegram.TelegramMessage> {
    return this.doCall<Telegram.TelegramMessage>(this.sendVenue.name, data);
  }

  /**
   * Use this method to send phone contacts. On success, the sent Message is returned.
   */
  sendContact(
    data: Telegram.TelegramSendContactParams,
  ): Observable<Telegram.TelegramMessage> {
    return this.doCall<Telegram.TelegramMessage>(this.sendContact.name, data);
  }

  /**
   * Use this method to send a native poll. A native poll can't be sent to a private chat. On success, the sent Message is returned.
   */
  sendPoll(
    data: Telegram.TelegramSendPollParams,
  ): Observable<Telegram.TelegramMessage> {
    return this.doCall<Telegram.TelegramMessage>(this.sendPoll.name, data);
  }

  /**
   * Use this method when you need to tell the user that something is happening on the bot's side.
   * The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status).
   * Returns True on success.
   *
   * > Example: The [ImageBot](https://t.me/imagebotc) needs some time to process a request and upload the image.
   * Instead of sending a text message along the lines of “Retrieving image, please wait…”,
   * the bot may use sendChatAction with action = upload_photo. The user will see a “sending photo” status for the bot.
   *
   * We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive.
   */
  sendChatAction(
    data: Telegram.TelegramSendChatActionParams,
  ): Observable<true> {
    return this.doCall<true>(this.sendChatAction.name, data);
  }

  /**
   * Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object.
   */
  getUserProfilePhotos(
    data: Telegram.TelegramGetUserProfilePhotosParams,
  ): Observable<Telegram.TelegramUserProfilePhotos> {
    return this.doCall<Telegram.TelegramUserProfilePhotos>(
      this.getUserProfilePhotos.name,
      data,
    );
  }

  /**
   * Use this method to get basic info about a file and prepare it for downloading.
   * For the moment, bots can download files of up to 20MB in size. On success, a File object is returned.
   * The file can then be downloaded via the link
   * `https://api.telegram.org/file/bot<token>/<file_path>`, where `<file_path>` is taken from the response.
   * It is guaranteed that the link will be valid for at least 1 hour.
   * When the link expires, a new one can be requested by calling getFile again.
   *
   * **Note**: This function may not preserve the original file name and MIME type.
   * You should save the file's MIME type and name (if available) when the File object is received.
   */
  getFile(
    data: Telegram.TelegramGetFileParams,
  ): Observable<Telegram.TelegramFile> {
    return this.doCall<Telegram.TelegramFile>(this.getFile.name, data);
  }

  /**
   * Use this method to kick a user from a group, a supergroup or a channel.
   * In the case of supergroups and channels, the user will not be able to return to the group on their own using invite links, etc.,
   * unless unbanned first. The bot must be an administrator in the chat for this to
   * work and must have the appropriate admin rights. Returns True on success.
   *
   * > **Note**: In regular groups (non-supergroups), this method will only work if the ‘All Members Are Admins’
   * setting is off in the target group. Otherwise members may only be removed by the group's creator or by the member that added them.
   */
  kickChatMember(
    data: Telegram.TelegramKickChatMemberParams,
  ): Observable<true> {
    return this.doCall<true>(this.kickChatMember.name, data);
  }

  /**
   * Use this method to unban a previously kicked user in a supergroup or channel.
   * The user will not return to the group or channel automatically, but will be able to join via link, etc.
   * The bot must be an administrator for this to work. Returns True on success.
   */
  unbanChatMember(
    data: Telegram.TelegramUnbanChatMemberParams,
  ): Observable<true> {
    return this.doCall<true>(this.unbanChatMember.name, data);
  }

  /**
   * Use this method to restrict a user in a supergroup.
   * The bot must be an administrator in the supergroup for this to work and must have the appropriate admin rights.
   * Pass True for all boolean parameters to lift restrictions from a user. Returns True on success.
   */
  restrictChatMember(
    data: Telegram.TelegramRestrictChatMemberParams,
  ): Observable<true> {
    return this.doCall<true>(this.restrictChatMember.name, data);
  }

  /**
   * Use this method to promote or demote a user in a supergroup or a channel.
   * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   * Pass False for all boolean parameters to demote a user. Returns True on success.
   */
  promoteChatMember(
    data: Telegram.TelegramPromoteChatMemberParams,
  ): Observable<true> {
    return this.doCall<true>(this.promoteChatMember.name, data);
  }

  /**
   * Use this method to generate a new invite link for a chat; any previously generated link is revoked.
   * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   * Returns the new invite link as String on success.
   *
   * > **Note:**Each administrator in a chat generates their own invite links.
   * Bots can't use invite links generated by other administrators.
   * If you want your bot to work with invite links, it will need to generate its own link using exportChatInviteLink –
   * after this the link will become available to the bot via the getChat method.
   * If your bot needs to generate a new invite link replacing its previous one, use exportChatInviteLink again.
   */
  exportChatInviteLink(
    data: Telegram.TelegramExportChatInviteLinkParams,
  ): Observable<string> {
    return this.doCall<string>(this.exportChatInviteLink.name, data);
  }

  /**
   * Use this method to set a new profile photo for the chat.
   * Photos can't be changed for private chats.
   * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   * Returns True on success.
   *
   * > **Note:** In regular groups (non-supergroups), this method will only work
   * if the ‘All Members Are Admins’ setting is off in the target group.
   */
  setChatPhoto(data: Telegram.TelegramSetChatPhotoParams): Observable<true> {
    return this.doCall<true>(this.setChatPhoto.name, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * Use this method to delete a chat photo. Photos can't be changed for private chats.
   * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
   *
   * > **Note:** In regular groups (non-supergroups), this method will only work if the
   * ‘All Members Are Admins’ setting is off in the target group.
   */
  deleteChatPhoto(
    data: Telegram.TelegramDeleteChatPhotoParams,
  ): Observable<true> {
    return this.doCall<true>(this.deleteChatPhoto.name, data);
  }

  /**
   * Use this method to change the title of a chat.
   * Titles can't be changed for private chats. The bot must be an
   * administrator in the chat for this to work and must have the appropriate admin rights. Returns True on success.
   *
   * > **Note:** In regular groups (non-supergroups), this method will only work if the
   * ‘All Members Are Admins’ setting is off in the target group.
   */
  setChatTitle(data: Telegram.TelegramSetChatTitleParams): Observable<true> {
    return this.doCall<true>(this.setChatTitle.name, data);
  }

  /**
   * Use this method to change the description of a supergroup or a channel.
   * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   * Returns True on success.
   */
  setChatDescription(
    data: Telegram.TelegramSetChatDescriptionParams,
  ): Observable<true> {
    return this.doCall<true>(this.setChatDescription.name, data);
  }

  /**
   * Use this method to pin a message in a group, a supergroup, or a channel.
   * The bot must be an administrator in the chat for this to work and must have the ‘can_pin_messages’
   * admin right in the supergroup or ‘can_edit_messages’ admin right in the channel. Returns True on success.
   */
  pinChatMessage(
    data: Telegram.TelegramPinChatMessageParams,
  ): Observable<true> {
    return this.doCall<true>(this.pinChatMessage.name, data);
  }

  /**
   * Use this method to unpin a message in a group, a supergroup, or a channel.
   * The bot must be an administrator in the chat for this to work and must have the ‘can_pin_messages’
   * admin right in the supergroup or ‘can_edit_messages’ admin right in the channel. Returns True on success.
   */
  unpinChatMessage(
    data: Telegram.TelegramUnpinChatMessageParams,
  ): Observable<true> {
    return this.doCall<true>(this.unpinChatMessage.name, data);
  }

  /**
   * Use this method for your bot to leave a group, supergroup or channel. Returns True on success.
   */
  leaveChat(data: Telegram.TelegramLeaveChatParams): Observable<true> {
    return this.doCall<true>(this.leaveChat.name, data);
  }

  /**
   * Use this method to get up to date information about the chat
   * (current name of the user for one-on-one conversations, current username of a user, group or channel, etc.).
   * Returns a Chat object on success.
   */
  getChat(
    data: Telegram.TelegramGetChatParams,
  ): Observable<Telegram.TelegramChat> {
    return this.doCall<Telegram.TelegramChat>(this.getChat.name, data);
  }

  /**
   * Use this method to get a list of administrators in a chat.
   * On success, returns an Array of ChatMember objects that contains information about all chat administrators except other bots.
   * If the chat is a group or a supergroup and no administrators were appointed, only the creator will be returned.
   */
  getChatAdministrators(
    data: Telegram.TelegramGetChatAdministratorsParams,
  ): Observable<Telegram.TelegramChatMember[]> {
    return this.doCall<Telegram.TelegramChatMember[]>(
      this.getChatAdministrators.name,
      data,
    );
  }

  /**
   * Use this method to get the number of members in a chat. Returns Int on success.
   */
  getChatMembersCount(
    data: Telegram.TelegramGetChatMembersCountParams,
  ): Observable<number> {
    return this.doCall<number>(this.getChatMembersCount.name, data);
  }

  /**
   * Use this method to get information about a member of a chat. Returns a ChatMember object on success.
   */
  getChatMember(
    data: Telegram.TelegramGetChatMemberParams,
  ): Observable<Telegram.TelegramChatMember> {
    return this.doCall<Telegram.TelegramChatMember>(
      this.getChatMember.name,
      data,
    );
  }

  /**
   * Use this method to set a new group sticker set for a supergroup.
   * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   * Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method.
   * Returns True on success.
   */
  setChatStickerSet(
    data: Telegram.TelegramSetChatStickerSetParams,
  ): Observable<true> {
    return this.doCall<true>(this.setChatStickerSet.name, data);
  }

  /**
   * Use this method to delete a group sticker set from a supergroup.
   * The bot must be an administrator in the chat for this to work and must have the appropriate admin rights.
   * Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method.
   * Returns True on success.
   */
  deleteChatStickerSet(
    data: Telegram.TelegramChatDeleteStickerSetParams,
  ): Observable<true> {
    return this.doCall<true>(this.deleteChatStickerSet.name, data);
  }

  /**
   * Use this method to send answers to callback queries sent from inline keyboards.
   * The answer will be displayed to the user as a notification at the top of the chat screen or as an alert.
   * On success, True is returned.
   *
   * > Alternatively, the user can be redirected to the specified Game URL.
   * For this option to work, you must first create a game for your bot via [@Botfather](https://t.me/botfather) and accept the terms.
   * Otherwise, you may use links like `t.me/your_bot?start=XXXX` that open your bot with a parameter.
   */
  answerCallbackQuery(
    data: Telegram.TelegramAnswerCallbackQueryParams,
  ): Observable<true> {
    return this.doCall<true>(this.answerCallbackQuery.name, data);
  }

  /**
   * Use this method to edit text and game messages.
   * On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
   */
  editMessageText(
    data: Telegram.TelegramEditMessageTextParams,
  ): Observable<Telegram.TelegramMessage | true> {
    return this.doCall<Telegram.TelegramMessage | true>(
      this.editMessageText.name,
      data,
    );
  }

  /**
   * Use this method to edit captions of messages.
   * On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
   */
  editMessageCaption(
    data: Telegram.TelegramEditMessageCaptionParams,
  ): Observable<Telegram.TelegramMessage | true> {
    return this.doCall<Telegram.TelegramMessage | true>(
      this.editMessageCaption.name,
      data,
    );
  }

  /**
   * Use this method to edit animation, audio, document, photo, or video messages.
   * If a message is a part of a message album, then it can be edited only to a
   * photo or a video. Otherwise, message type can be changed arbitrarily.
   * When inline message is edited, new file can't be uploaded.
   * Use previously uploaded file via its file_id or specify a URL.
   * On success, if the edited message was sent by the bot, the edited Message is returned, otherwise True is returned.
   */
  editMessageMedia(
    data: Telegram.TelegramEditMessageMediaParams,
  ): Observable<Telegram.TelegramMessage | true> {
    return this.doCall<Telegram.TelegramMessage | true>(
      this.editMessageMedia.name,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }

  /**
   * Use this method to edit only the reply markup of messages.
   * On success, if edited message is sent by the bot, the edited Message is returned, otherwise True is returned.
   */
  editMessageReplyMarkup(
    data: Telegram.TelegramEditMessageReplyMarkupParams,
  ): Observable<Telegram.TelegramMessage | true> {
    return this.doCall<Telegram.TelegramMessage | true>(
      this.editMessageReplyMarkup.name,
      data,
    );
  }

  /**
   * Use this method to stop a poll which was sent by the bot.
   * On success, the stopped Poll with the final results is returned.
   */
  stopPoll(
    data: Telegram.TelegramStopPollParams,
  ): Observable<Telegram.TelegramPoll> {
    return this.doCall<Telegram.TelegramPoll>(
      this.editMessageReplyMarkup.name,
      data,
    );
  }

  /**
   * Use this method to delete a message, including service messages, with the following limitations:
   *
   * - A message can only be deleted if it was sent less than 48 hours ago.
   * - Bots can delete outgoing messages in private chats, groups, and supergroups.
   * - Bots can delete incoming messages in private chats.
   * - Bots granted can_post_messages permissions can delete outgoing messages in channels.
   * - If the bot is an administrator of a group, it can delete any message there.
   * - If the bot has can_delete_messages permission in a supergroup or a channel, it can delete any message there.
   *
   * Returns True on success.
   */
  deleteMessage(data: Telegram.TelegramDeleteMessageParams): Observable<true> {
    return this.doCall<true>(this.deleteMessage.name, data);
  }

  /**
   * Use this method to send .webp stickers. On success, the sent Message is returned.
   */
  sendSticker(
    data: Telegram.TelegramSendStickerParams,
  ): Observable<Telegram.TelegramMessage> {
    return this.doCall<Telegram.TelegramMessage>(this.sendSticker.name, data, {
      headers: {
        'Content-Type':
          typeof data.sticker === 'object'
            ? 'multipart/form-data'
            : 'application/json',
      },
    });
  }

  /**
   * Use this method to get a sticker set. On success, a StickerSet object is returned.
   */
  getStickerSet(
    data: Telegram.TelegramGetStickerSetParams,
  ): Observable<Telegram.TelegramStickerSet> {
    return this.doCall<Telegram.TelegramStickerSet>(
      this.getStickerSet.name,
      data,
    );
  }

  /**
   * Use this method to upload a .png file with a sticker for later use in
   * createNewStickerSet and addStickerToSet methods (can be used multiple times). Returns the uploaded File on success.
   */
  uploadStickerFile(
    data: Telegram.TelegramUploadStickerFileParams,
  ): Observable<Telegram.TelegramFile> {
    return this.doCall<Telegram.TelegramFile>(
      this.uploadStickerFile.name,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  }

  /**
   * Use this method to create new sticker set owned by a user.
   * The bot will be able to edit the created sticker set. Returns True on success.
   */
  createNewStickerSet(
    data: Telegram.TelegramCreateNewStickerSetParams,
  ): Observable<true> {
    return this.doCall<true>(this.createNewStickerSet.name, data, {
      headers: {
        'Content-Type':
          typeof data.png_sticker === 'object'
            ? 'multipart/form-data'
            : 'application/json',
      },
    });
  }

  /**
   * Use this method to add a new sticker to a set created by the bot. Returns True on success.
   */
  addStickerToSet(
    data: Telegram.TelegramAddStickerToSetParams,
  ): Observable<true> {
    return this.doCall<true>(this.addStickerToSet.name, data, {
      headers: {
        'Content-Type':
          typeof data.png_sticker === 'object'
            ? 'multipart/form-data'
            : 'application/json',
      },
    });
  }

  /**
   * Use this method to move a sticker in a set created by the bot to a specific position . Returns True on success.
   */
  setStickerPositionInSet(
    data: Telegram.TelegramSetStickerPositionInSetParams,
  ): Observable<true> {
    return this.doCall<true>(this.setStickerPositionInSet.name, data);
  }

  /**
   * Use this method to delete a sticker from a set created by the bot. Returns True on success.
   */
  deleteStickerFromSet(
    data: Telegram.TelegramDeleteStickerFromSetParams,
  ): Observable<true> {
    return this.doCall<true>(this.deleteStickerFromSet.name, data);
  }

  /**
   * Use this method to send invoices. On success, the sent Message is returned.
   */
  sendInvoice(
    data: Telegram.TelegramSendInvoiceParams,
  ): Observable<Telegram.TelegramMessage> {
    return this.doCall<Telegram.TelegramMessage>(this.sendInvoice.name, data);
  }

  /**
   * If you sent an invoice requesting a shipping address and the parameter is_flexible was specified,
   * the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries.
   * On success, True is returned.
   */
  answerShippingQuery(
    data: Telegram.TelegramAnswerShippingQueryParams,
  ): Observable<true> {
    return this.doCall<true>(this.answerShippingQuery.name, data);
  }

  /**
   * Once the user has confirmed their payment and shipping details,
   * the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query.
   * Use this method to respond to such pre-checkout queries.
   * On success, True is returned.
   * **Note:** The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent.
   */
  answerPreCheckoutQuery(
    data: Telegram.TelegramAnswerPreCheckoutQueryParams,
  ): Observable<true> {
    return this.doCall<true>(this.answerPreCheckoutQuery.name, data);
  }

  /**
   * Use this method to send a game. On success, the sent Message is returned.
   */
  sendGame(
    data: Telegram.TelegramSendGameParams,
  ): Observable<Telegram.TelegramMessage> {
    return this.doCall<Telegram.TelegramMessage>(this.sendGame.name, data);
  }

  /**
   * Use this method to set the score of the specified user in a game.
   * On success, if the message was sent by the bot, returns the edited Message, otherwise returns True.
   * Returns an error, if the new score is not greater than the user's current score in the chat and force is False.
   */
  setGameScore(
    data: Telegram.TelegramSetGameScoreParams,
  ): Observable<Telegram.TelegramMessage | true> {
    return this.doCall<Telegram.TelegramMessage | true>(
      this.setGameScore.name,
      data,
    );
  }

  /**
   * Use this method to get data for high score tables.
   * Will return the score of the specified user and several of his neighbors in a game.
   * On success, returns an Array of GameHighScore objects.
   *
   * > This method will currently return scores for the target user, plus two of his closest neighbors on each side.
   * Will also return the top three users if the user and his neighbors are not among them.
   * Please note that this behavior is subject to change.
   */
  getGameHighScore(
    data: Telegram.TelegramGetGameHighScoreParams,
  ): Observable<Telegram.TelegramGameHighScore[]> {
    return this.doCall<Telegram.TelegramGameHighScore[]>(
      this.getGameHighScore.name,
      data,
    );
  }
}
