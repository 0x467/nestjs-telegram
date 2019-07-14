import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import {
  TelegramChat,
  TelegramChatMember,
  TelegramException,
  TelegramFile,
  TelegramGameHighScore,
  TelegramMessage,
  TelegramPoll,
  TelegramResponse,
  TelegramSendMessageParams,
  TelegramStickerSet,
  TelegramUser,
  TelegramUserProfilePhotos,
} from './interfaces/telegramTypes.interface';
import { TelegramService } from './telegram.service';

const postMock = jest.fn();

const multiPartHeader = { headers: { 'Content-Type': 'multipart/form-data' } };

const telegramObserver = <T>(
  done: () => void,
  expectedData: T,
  calledTimes: number,
  calledWith?: any,
) => ({
  next(nextValue: T) {
    expect(nextValue).toEqual(expectedData);
    expect(postMock).toHaveBeenCalledTimes(calledTimes);
    if (calledWith) {
      expect(postMock.mock.calls[0][2]).toEqual(calledWith);
    }
  },
  error(error: Error) {
    throw error;
  },
  complete() {
    done();
  },
});

const axiosRes = <T>(response: TelegramResponse<T>) => ({
  data: response,
});

const telegramRes = <T>(response: T) => ({
  ok: true,
  result: response,
});

const httpMock = {
  post: postMock,
};

const sendMessageParams: TelegramSendMessageParams = {
  chat_id: 8754,
  text: 'This is a test',
};

const chat: TelegramChat = {
  id: 8754,
  type: 'group',
};

const message: TelegramMessage = {
  message_id: 4587,
  chat,
  date: 45778965,
};

const user: TelegramUser = {
  id: 45872,
  is_bot: true,
  first_name: 'Test_bot',
};

describe('TelegramService', () => {
  let module: TestingModule;
  let service: TelegramService;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        {
          provide: TelegramService,
          useFactory: () => {
            return new TelegramService(
              { botKey: 'someBotKey' },
              httpMock as any,
            );
          },
        },
      ],
    }).compile();

    service = module.get<TelegramService>(TelegramService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('module initialization', () => {
    beforeEach(() => {
      module.init();
    });

    it('should still be defined', () => {
      expect(service).toBeDefined();
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('doPoll handle error', () => {
    it('should resolve if there is an error', (done) => {
      postMock.mockReturnValueOnce(
        of(
          axiosRes({ ok: false, error_code: 400, description: 'Bad request' }),
        ),
      );
      service.getMe().subscribe({
        next(nextValue) {
          throw new Error('Test should have gone to fail observer');
        },
        error(error: Error) {
          expect(error.toString()).toEqual(
            new TelegramException('Bad request', '400').toString(),
          );
          done();
        },
        complete() {
          done();
        },
      });
    });
  });
  describe('getMe', () => {
    it('should return the bot user', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(user))));
      service.getMe().subscribe(telegramObserver(done, user, 1));
    });
  });
  describe('sendMessage', () => {
    it('should get the response for sendMessage', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
      service
        .sendMessage(sendMessageParams)
        .subscribe(telegramObserver(done, message, 1));
    });
  });
  describe('forwardMessage', () => {
    it('should get the response for forwardMessage', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
      service
        .forwardMessage({
          from_chat_id: 7854,
          chat_id: 5698,
          message_id: 5,
        })
        .subscribe(telegramObserver(done, message, 1));
    });
  });
  describe('sendMedia', () => {
    describe('sendPhoto', () => {
      it('should get the response for sendPhoto (multipart)', (done) => {
        postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
        service
          .sendPhoto({
            chat_id: 8754,
            photo: Buffer.alloc('string'.length, 'string'),
          })
          .subscribe(telegramObserver(done, message, 1, multiPartHeader));
      });
      it('should get the response for sendPhoto (string)', (done) => {
        postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
        service
          .sendPhoto({
            chat_id: 8754,
            photo: 'string url of photo',
          })
          .subscribe(telegramObserver(done, message, 1));
      });
    });
    describe('sendAudio', () => {
      it('should get the response for sendAudio (multipart)', (done) => {
        postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
        service
          .sendAudio({
            chat_id: 8754,
            audio: Buffer.alloc(10),
          })
          .subscribe(telegramObserver(done, message, 1, multiPartHeader));
      });
      it('should get the response for sendAudio (string)', (done) => {
        postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
        service
          .sendAudio({
            chat_id: 8754,
            audio: Buffer.alloc(10).toString(),
          })
          .subscribe(telegramObserver(done, message, 1));
      });
    });
    describe('sendDocument', () => {
      it('should get the response for sendDocument (multipart)', (done) => {
        postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
        service
          .sendDocument({
            chat_id: 8754,
            document: Buffer.alloc(10),
          })
          .subscribe(telegramObserver(done, message, 1, multiPartHeader));
      });
      it('should get the response for sendDocument (string)', (done) => {
        postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
        service
          .sendDocument({
            chat_id: 8754,
            document: Buffer.alloc(10).toString(),
          })
          .subscribe(telegramObserver(done, message, 1));
      });
    });
    describe('sendVideo', () => {
      it('should get the response for sendVideo (multipart)', (done) => {
        postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
        service
          .sendVideo({
            chat_id: 8754,
            video: Buffer.alloc(10),
          })
          .subscribe(telegramObserver(done, message, 1, multiPartHeader));
      });
      it('should get the response for sendVideo (string)', (done) => {
        postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
        service
          .sendVideo({
            chat_id: 8754,
            video: Buffer.alloc(10).toString(),
          })
          .subscribe(telegramObserver(done, message, 1));
      });
    });
    describe('sendAnimation', () => {
      it('should get the response for sendAnimation (multipart)', (done) => {
        postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
        service
          .sendAnimation({
            chat_id: 8754,
            animation: Buffer.alloc(10),
          })
          .subscribe(telegramObserver(done, message, 1, multiPartHeader));
      });
      it('should get the response for sendAnimation (string)', (done) => {
        postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
        service
          .sendAnimation({
            chat_id: 8754,
            animation: Buffer.alloc(10).toString(),
          })
          .subscribe(telegramObserver(done, message, 1));
      });
    });
    describe('sendVoice', () => {
      it('should get the response for sendVoice (multipart)', (done) => {
        postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
        service
          .sendVoice({
            chat_id: 8754,
            voice: Buffer.alloc(10),
            video_note: Buffer.alloc(10),
          })
          .subscribe(telegramObserver(done, message, 1, multiPartHeader));
      });
      it('should get the response for sendVoice (multipart)', (done) => {
        postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
        service
          .sendVoice({
            chat_id: 8754,
            voice: Buffer.alloc(10).toString(),
            video_note: Buffer.alloc(10).toString(),
          })
          .subscribe(telegramObserver(done, message, 1));
      });
    });
    describe('sendVideoNote', () => {
      it('should get the response for sendVideoNote (multipart)', (done) => {
        postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
        service
          .sendVideoNote({
            chat_id: 8754,
            video_note: Buffer.alloc(10),
          })
          .subscribe(telegramObserver(done, message, 1, multiPartHeader));
      });
      it('should get the response for sendVideoNote (string)', (done) => {
        postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
        service
          .sendVideoNote({
            chat_id: 8754,
            video_note: Buffer.alloc(10).toString(),
          })
          .subscribe(telegramObserver(done, message, 1));
      });
    });
    describe('sendMediaGroup', () => {
      it('should get the response for sendMediaGroup (multipart)', (done) => {
        postMock.mockReturnValueOnce(of(axiosRes(telegramRes([message]))));
        service
          .sendMediaGroup({
            chat_id: 8754,
            media: [
              {
                type: 'photo',
                media: Buffer.alloc(10),
              },
            ],
          })
          .subscribe(telegramObserver(done, [message], 1, multiPartHeader));
      });
    });
  });
  describe('sendLocation', () => {
    it('should get the response for sendLocation', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
      service
        .sendLocation({
          chat_id: 8754,
          latitude: 87878,
          longitude: 9875,
        })
        .subscribe(telegramObserver(done, message, 1));
    });
  });
  describe('editMessageLiveLocation', () => {
    it('should get the response for editMessageLiveLocation(message)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
      service
        .editMessageLiveLocation({
          chat_id: 7854,
          latitude: 54545,
          longitude: 54545,
        })
        .subscribe(telegramObserver(done, message, 1));
    });
    it('should get the response for editMessageLiveLocation(true)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .editMessageLiveLocation({
          chat_id: 7854,
          latitude: 54545,
          longitude: 54545,
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('stopMessageLiveLocation', () => {
    it('should get the response for stopMessageLiveLocation(message)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
      service
        .stopMessageLiveLocation({
          chat_id: 7854,
        })
        .subscribe(telegramObserver(done, message, 1));
    });
    it('should get the response for stopMessageLiveLocation(true)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .stopMessageLiveLocation({
          chat_id: 7854,
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('sendVenue', () => {
    it('should get the response for sendVenue', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
      service
        .sendVenue({
          chat_id: 8754,
          latitude: 545454,
          longitude: 54587,
          title: 'some venue',
          address: 'the address',
        })
        .subscribe(telegramObserver(done, message, 1));
    });
  });
  describe('sendContact', () => {
    it('should get the response for sendContact', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
      service
        .sendContact({
          chat_id: 8754,
          first_name: 'firstName',
          last_name: 'lastName',
          phone_number: '9876543210',
          vcard: 'vcard data',
        })
        .subscribe(telegramObserver(done, message, 1));
    });
  });
  describe('sendPoll', () => {
    it('should get the response for sendPoll', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
      service
        .sendPoll({
          chat_id: 8754,
          question: 'A question for you?',
          options: ['answer 1', 'answer 2'],
        })
        .subscribe(telegramObserver(done, message, 1));
    });
  });
  describe('sendChatAction', () => {
    it('should get the response for senChatAction', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .sendChatAction({
          chat_id: 8754,
          action: 'some action',
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('getUserProfilePhotos', () => {
    it('should get the response for getUserProfilePictures', (done) => {
      const userPhotos: TelegramUserProfilePhotos = {
        total_count: 5,
        photos: [[]],
      };
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(userPhotos))));
      service
        .getUserProfilePhotos({
          user_id: 87542,
          offset: 0,
        })
        .subscribe(telegramObserver(done, userPhotos, 1));
    });
  });
  describe('getFile', () => {
    it('should get the response for getFile', (done) => {
      const file: TelegramFile = {
        file_id: 'file id',
      };
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(file))));
      service
        .getFile({
          file_id: 'file id',
        })
        .subscribe(telegramObserver(done, file, 1));
    });
  });
  describe('kickChatMember', () => {
    it('should get the response for kickChatMember', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .kickChatMember({
          user_id: 8754,
          chat_id: 'chat id',
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('unbanChatMember', () => {
    it('should get the response for unbanChatMember', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .unbanChatMember({
          chat_id: 8754,
          user_id: 9865,
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('restrictChatMember', () => {
    it('should get the response for restrictChatMember', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .restrictChatMember({
          chat_id: 8754,
          user_id: 9865,
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('promoteChatMember', () => {
    it('should get the response for promoteChatMember', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .promoteChatMember({
          chat_id: 8754,
          user_id: 9865,
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('exportChatInviteLink', () => {
    it('should get the response for exportChatInviteLink', (done) => {
      postMock.mockReturnValueOnce(
        of(axiosRes(telegramRes('some invite link'))),
      );
      service
        .exportChatInviteLink({
          chat_id: 8754,
        })
        .subscribe(telegramObserver(done, 'some invite link', 1));
    });
  });
  describe('setChatPhoto', () => {
    it('should get the response for setChatPhoto (multipart)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .setChatPhoto({
          chat_id: 8754,
          photo: Buffer.alloc(10),
        })
        .subscribe(telegramObserver(done, true, 1, multiPartHeader));
    });
  });
  describe('deleteChatPhot', () => {
    it('should get the response for deleteChatPhoto', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .deleteChatPhoto({
          chat_id: 8754,
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('setChatTitle', () => {
    it('should get the response for setChatTitle', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .setChatTitle({
          chat_id: 8754,
          title: 'the chat title',
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('setChatDescription', () => {
    it('should get the response for setChatDescription', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .setChatDescription({
          chat_id: 8754,
          description: 'the chat description',
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('pinChatMessage', () => {
    it('should get the response for pinChatMessage', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .pinChatMessage({
          chat_id: 8754,
          message_id: 5,
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('unpinChatMessage', () => {
    it('should get the response for unpinChatMessage', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .unpinChatMessage({
          chat_id: 8754,
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('leaveChat', () => {
    it('should get the response for leaveChat', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .leaveChat({
          chat_id: 8754,
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('getChat', () => {
    it('should get the response for getChat', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(chat))));
      service
        .getChat({
          chat_id: 5421,
        })
        .subscribe(telegramObserver(done, chat, 1));
    });
  });
  describe('getChatAdministrators', () => {
    it('should get the response for getChatAdministrators', (done) => {
      const chatAdmins: TelegramChatMember[] = [
        {
          user,
          status: 'creator',
        },
      ];
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(chatAdmins))));
      service
        .getChatAdministrators({
          chat_id: 8754,
        })
        .subscribe(telegramObserver(done, chatAdmins, 1));
    });
  });
  describe('getChatMembersCount', () => {
    it('should get the response of getChatMembersCount', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(5))));
      service
        .getChatMembersCount({
          chat_id: 854,
        })
        .subscribe(telegramObserver(done, 5, 1));
    });
  });
  describe('getChatMember', () => {
    it('should get the response for getChatMember', (done) => {
      const chatMember: TelegramChatMember = {
        user,
        status: 'member',
      };
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(chatMember))));
      service
        .getChatMember({
          chat_id: 8754,
          user_id: 6532,
        })
        .subscribe(telegramObserver(done, chatMember, 1));
    });
  });
  describe('setChatStickerSet', () => {
    it('should get the response of setChatStickerSet', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .setChatStickerSet({
          chat_id: 8754,
          sticker_set_name: 'name of set',
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('deleteChatStickerSet', () => {
    it('should get the response for deleteChatStickerSet', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .deleteChatStickerSet({
          chat_id: 8754,
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('answerCallbackQuery', () => {
    it('should get the response for answerCallbackQuery', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .answerCallbackQuery({
          callback_query_id: 'callback query id',
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('editMessageText', () => {
    it('should get the response for editMessageText(message)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
      service
        .editMessageText({
          message_id: 5465,
          text: 'new message text',
        })
        .subscribe(telegramObserver(done, message, 1));
    });
    it('should get the response for editMessageText(true)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .editMessageText({
          message_id: 5465,
          text: 'new message text',
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('editMessageCaption', () => {
    it('should get the response of editMessageCaption(message)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
      service
        .editMessageCaption({
          message_id: 98754,
          reply_markup: {
            inline_keyboard: [[]],
          },
        })
        .subscribe(telegramObserver(done, message, 1));
    });
    it('should get the response of editMessageCaption(true)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .editMessageCaption({
          message_id: 98754,
          reply_markup: {
            inline_keyboard: [[]],
          },
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('editMessageMedia', () => {
    it('should get the response for editMessageMedia(message)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
      service
        .editMessageMedia({
          message_id: 54321,
          media: {
            type: 'photo',
            media: Buffer.alloc(10),
          },
        })
        .subscribe(telegramObserver(done, message, 1));
    });
    it('should get the response for editMessageMedia(true)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .editMessageMedia({
          message_id: 54321,
          media: {
            type: 'photo',
            media: Buffer.alloc(10),
          },
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('editMessageReplyMarkup', () => {
    it('should get the response for editMessageReplyMarkup(message)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
      service
        .editMessageReplyMarkup({
          message_id: 54321,
        })
        .subscribe(telegramObserver(done, message, 1));
    });
    it('should get the response for editMessageReplyMarkup(true)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .editMessageReplyMarkup({
          message_id: 54321,
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('stopPoll', () => {
    it('should get the response for stopPoll', (done) => {
      const poll: TelegramPoll = {
        id: 'pollId',
        question: 'The question',
        options: [
          { text: 'option 1', voter_count: 2 },
          { text: 'options 2', voter_count: 5 },
        ],
        is_closed: false,
      };
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(poll))));
      service
        .stopPoll({
          chat_id: 8754,
          message_id: 32165,
        })
        .subscribe(telegramObserver(done, poll, 1));
    });
  });
  describe('deleteMessage', () => {
    it('should get the response for delete message', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .deleteMessage({
          chat_id: 8754,
          message_id: 54213,
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('sendSticker', () => {
    it('should get the response for sendSticker(multipart)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
      service
        .sendSticker({
          chat_id: 8754,
          sticker: Buffer.alloc(10),
        })
        .subscribe(telegramObserver(done, message, 1, multiPartHeader));
    });
    it('should get the response for sendSticker(string)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
      service
        .sendSticker({
          chat_id: 8754,
          sticker: Buffer.alloc(10).toString(),
        })
        .subscribe(telegramObserver(done, message, 1));
    });
  });
  describe('getStickerSet', () => {
    it('should get the response for getStickerSet', (done) => {
      const stickerSet: TelegramStickerSet = {
        name: 'stickers!',
        contains_masks: false,
        title: 'Stickers!',
        stickers: [],
      };
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(stickerSet))));
      service
        .getStickerSet({
          name: 'stickers!',
        })
        .subscribe(telegramObserver(done, stickerSet, 1));
    });
  });
  describe('uploadStickerFile', () => {
    it('should get the response for uploadStickerFile', (done) => {
      const file: TelegramFile = {
        file_id: 'id of the file',
      };
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(file))));
      service
        .uploadStickerFile({
          png_sticker: Buffer.alloc(10),
          user_id: 98765,
        })
        .subscribe(telegramObserver(done, file, 1));
    });
  });
  describe('createNewStickerSet', () => {
    it('should get the response for createNewStickerSet(multipart)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .createNewStickerSet({
          name: 'newStickerSet',
          title: 'newStickerSet',
          user_id: 8754,
          png_sticker: Buffer.alloc(10),
          emojis: '',
        })
        .subscribe(telegramObserver(done, true, 1, multiPartHeader));
    });
    it('should get the response for createNewStickerSet(string)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .createNewStickerSet({
          name: 'newStickerSet',
          title: 'newStickerSet',
          user_id: 8754,
          png_sticker: Buffer.alloc(10).toString(),
          emojis: '',
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('addStickerToSet', () => {
    it('should get the response for addStickerToSet(multipart)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .addStickerToSet({
          name: 'newStickerSet',
          user_id: 8754,
          png_sticker: Buffer.alloc(10),
          emojis: '',
        })
        .subscribe(telegramObserver(done, true, 1, multiPartHeader));
    });
    it('should get the response for addStickerToSet(string)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .addStickerToSet({
          name: 'newStickerSet',
          user_id: 8754,
          png_sticker: Buffer.alloc(10).toString(),
          emojis: '',
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('setStickerPositionInSet', () => {
    it('should get the response for setStickerPositionInSet', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .setStickerPositionInSet({
          position: 5,
          sticker: 'theSticker',
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('deleteStickerFromSet', () => {
    it('should get the response for deleteStickerFromSet', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .deleteStickerFromSet({
          sticker: 'theSticker',
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('sendInvoice', () => {
    it('should get the response for sendInvoice', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
      service
        .sendInvoice({
          chat_id: 5432,
          title: 'Invoice title',
          payload: 'the payload',
          description: 'The description',
          provider_token: 'tokens!',
          start_parameter: 'some start param',
          currency: 'USD',
          prices: [],
        })
        .subscribe(telegramObserver(done, message, 1));
    });
  });
  describe('answerShippingQuery', () => {
    it('should return the response for answerShippingQuery', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .answerShippingQuery({
          shipping_query_id: 'callback id',
          ok: true,
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('answerPreCheckoutQuery', () => {
    it('should return the response for answerPreCheckoutQuery', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .answerPreCheckoutQuery({
          pre_checkout_query_id: 'callback id',
          ok: true,
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('sendGame', () => {
    it('should get the response for sendGame', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
      service
        .sendGame({
          chat_id: 9865,
          game_short_name: 'short name',
        })
        .subscribe(telegramObserver(done, message, 1));
    });
  });
  describe('setGameScore', () => {
    it('should get the response for sendGame(message)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(message))));
      service
        .setGameScore({
          chat_id: 9865,
          score: 98989898,
          user_id: 5421,
        })
        .subscribe(telegramObserver(done, message, 1));
    });
    it('should get the response for sendGame(true)', (done) => {
      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(true))));
      service
        .setGameScore({
          chat_id: 9865,
          score: 98989898,
          user_id: 5421,
        })
        .subscribe(telegramObserver(done, true, 1));
    });
  });
  describe('getGameHighScore', () => {
    it('should get the response for getGameHighScore', (done) => {
      const gameScores: TelegramGameHighScore[] = [
        {
          score: 875421,
          user,
          position: 1,
        },
      ];

      postMock.mockReturnValueOnce(of(axiosRes(telegramRes(gameScores))));
      service
        .getGameHighScore({
          chat_id: 8754,
          user_id: 5421,
        })
        .subscribe(telegramObserver(done, gameScores, 1));
    });
  });
});
