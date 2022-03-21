import { BadRequestException } from '@nestjs/common';

/**
 * This object represents an incoming update.
 * At most one of the optional parameters can be present in any given update.
 *
 * @see https://core.telegram.org/bots/api#update
 */
export interface Update {
  /**
   * The update's unique identifier. Update identifiers start from a certain positive number and increase sequentially.
   * This ID becomes especially handy if you're using Webhooks, since it allows you to ignore repeated updates or to
   * restore the correct update sequence, should they get out of order. If there are no new updates for at least a week,
   * then identifier of the next update will be chosen randomly instead of sequentially.
   */
  update_id: number;

  /**
   * New incoming message of any kind — text, photo, sticker, etc.
   */
  message?: TelegramMessage;

  /**
   * New version of a message that is known to the bot and was edited
   */
  edited_message?: TelegramMessage;

  /**
   * New incoming channel post of any kind — text, photo, sticker, etc.
   */
  channel_post?: any;
  // channel_post?: ChannelPost;

  /**
   * New version of a channel post that is known to the bot and was edited
   */
  edited_channel_post?: any;
  // edited_channel_post?: EditedChannelPost;

  /**
   * New incoming inline query
   */
  inline_query?: any;
  // inline_query?: InlineQuery;

  /**
   * The result of an inline query that was chosen by a user and sent to their chat partner. Please see our
   * documentation on the feedback collecting for details on how to enable these updates for your bot.
   */
  chosen_inline_result?: any;
  // chosen_inline_result?: ChosenInlineResult;

  /**
   * New incoming callback query
   */
  callback_query?: TelegramCallbackQuery;

  /**
   * New incoming shipping query. Only for invoices with flexible price
   */
  shipping_query?: any;
  // shipping_query?: ShoppingQuery;

  /**
   * New incoming pre-checkout query. Contains full information about checkout
   */
  pre_checkout_query?: any;
  // pre_checkout_query?: PreCheckoutQuery;

  /**
   * New poll state. Bots receive only updates about stopped polls and polls, which are sent by the bot
   */
  poll?: TelegramPoll;

  /**
   * A user changed their answer in a non-anonymous poll.
   * Bots receive new votes only in polls that were sent by the bot itself.
   */
  poll_answer?: any;
  // poll_answer?: PollAnswer;

  /**
   * The bot's chat member status was updated in a chat. For private chats, this update is received only when the bot is
   * blocked or unblocked by the user.
   */
  my_chat_member?: any;
  // my_chat_member?: ChatMemberUpdated;

  /**
   * A chat member's status was updated in a chat. The bot must be an administrator in the chat and must explicitly
   * specify “chat_member” in the list of allowed_updates to receive these updates.
   */
  chat_member?: any;
  // chat_member?: ChatMemberUpdated;

  /**
   * A request to join the chat has been sent.
   * The bot must have the can_invite_users administrator right in the chat to receive these updates.
   */
  chat_join_request?: any;
  // chat_join_request?: ChatJoinRequest;
}

/**
 * This object represents a Telegram user or bot.
 */
export interface TelegramUser {
  /**
   * Unique identifier for this bot to use
   */
  id: number;
  /**
   * true, if this user is a bot
   */
  is_bot: boolean;
  /**
   * User's or bot's first name
   */
  first_name: string;
  /**
   * _Optional._ User's or bot's last name
   */
  last_name?: string;
  /**
   * _Optional._ User's or bot's username
   */
  username?: string;
  /**
   * _Optional._ [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) of the user's language
   */
  language_code?: string;
}

/**
 * This object represents a Telegram chat.
 */
export interface TelegramChat {
  /**
   * Unique identifier for this chat.
   * This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it.
   * But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier.
   */
  id: number;
  /**
   * Type of chat, can be either “private”, “group”, “supergroup” or “channel”
   */
  type: string;
  /**
   * _Optional._ Title, for supergroups, channels and group chats
   */
  title?: string;
  /**
   * _Optional._ Username, for private chats, supergroups and channels if available
   */
  username?: string;
  /**
   * _Optional._ First name of the other party in a private chat
   */
  first_name?: string;
  /**
   * _Optional._ Last name of the other party in a private chat
   */
  last_name?: string;
  /**
   * _Optional._ True if a group has ‘All Members Are Admins’ enabled.
   */
  all_members_are_administrators?: boolean;
  /**
   * _Optional._ Chat photo. Returned only in [getChat](https://core.telegram.org/bots/api#getchat)
   */
  photo?: TelegramChatPhoto;
  /**
   * _Optional._ Description, for supergroups and channel chats.
   * Returned only in [getChat](https://core.telegram.org/bots/api#getchat)
   */
  description?: string;
  /**
   * _Optional._ Chat invite link, for supergroups and channel chats.
   * Each administrator in a chat generates their own invite links,
   * so the bot must first generate the link using [exportChatInviteLink](https://core.telegram.org/bots/api#exportchatinvitelink).
   * Returned only in [getChat](https://core.telegram.org/bots/api#getchat).
   */
  invite_link?: string;
  /**
   * _Optional._ Pinned message, for groups, supergroups and channels.
   * Returned only in [getChat](https://core.telegram.org/bots/api#getchat).
   */
  pinned_message?: TelegramMessage;
  /**
   * _Optional._ For supergroups, name of group sticker set. Returned only in [getChat](https://core.telegram.org/bots/api#getchat).
   */
  sticker_set_name?: string;
  /**
   * _Optional._ True, if the bot can change the group sticker set. Returned only in [getChat](https://core.telegram.org/bots/api#getchat).
   */
  can_set_sticker_set?: boolean;
}

export interface TelegramMessage {
  /**
   * Unique message identifier inside this chat
   */
  message_id: number;
  /**
   * _Optional._ Sender, empty for messages sent to channels
   */
  from?: TelegramUser;
  /**
   * Date the message was sent in Unix time
   */
  date: number;
  /**
   * Conversation the message belongs to
   */
  chat: TelegramChat;
  /**
   * _Optional._ For forwarded messages, sender of the original message
   */
  forward_from?: TelegramUser;
  /**
   * _Optional._ For messages forwarded from channels, information about the original channel
   */
  forward_from_chat?: TelegramChat;
  /**
   * _Optional._ For messages forwarded from channels, identifier of the original message in the channel
   */
  forward_from_message_id?: number;
  /**
   * _Optional._ For messages forwarded from channels, signature of the post author if present
   */
  forward_signature?: string;
  /**
   * _Optional._ Sender's name for messages forwarded from users who disallow adding a link to their account in forwarded messages
   */
  forward_sender_name?: string;
  /**
   * _Optional._ For forwarded messages, date the original message was sent in Unix time
   */
  forward_date?: number;
  /**
   * _Optional._ For replies, the original message. Note that the
   * Message object in this field will not contain further reply_to_message fields even if it itself is a reply.
   */
  reply_to_message?: TelegramMessage;
  /**
   * _Optional._ Date the message was last edited in Unix time
   */
  edit_date?: number;
  /**
   * _Optional._ The unique identifier of a media message group this message belongs to
   */
  media_group_id?: string;
  /**
   * _Optional._ Signature of the post author for messages in channels
   */
  author_signature?: string;
  /**
   * _Optional._ For text messages, the actual UTF-8 text of the message, 0-4096 characters.
   */
  text?: string;
  /**
   * _Optional._ For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text
   */
  entities?: TelegramMessageEntity[];
  /**
   * _Optional._ For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption
   */
  caption_entities?: TelegramMessageEntity[];
  /**
   * _Optional._ Message is an audio file, information about the file
   */
  audio?: TelegramAudio;
  /**
   * _Optional._ Message is a general file, information about the file
   */
  document?: TelegramDocument;
  /**
   * _Optional._ Message is an animation, information about the animation.
   * For backward compatibility, when this field is set, the document field will also be set
   */
  animation?: TelegramAnimation;
  /**
   * _Optional._ Message is a game, information about the game. [More about games »](https://core.telegram.org/bots/api#games)
   */
  game?: TelegramGame;
  /**
   * _Optional._ Message is a photo, available sizes of the photo
   */
  photo?: TelegramPhotoSize[];
  /**
   * _Optional._ Message is a sticker, information about the sticker
   */
  sticker?: TelegramSticker;
  /**
   * _Optional._ Message is a video, information about the video
   */
  video?: TelegramVideo;
  /**
   * _Optional._ Message is a voice message, information about the file
   */
  voice?: TelegramVoice;
  /**
   * _Optional._ Message is a [video note](https://telegram.org/blog/video-messages-and-telescope), information about the video message
   */
  video_note?: TelegramVideoNote;
  /**
   * _Optional._ Caption for the animation, audio, document, photo, video or voice, 0-1024 characters
   */
  caption?: string;
  /**
   * _Optional._ Message is a shared contact, information about the contact
   */
  contact?: TelegramContact;
  /**
   * _Optional._ Message is a shared location, information about the location
   */
  location?: TelegramLocation;
  /**
   * _Optional._ Message is a venue, information about the venue
   */
  venue?: TelegramVenue;
  /**
   * _Optional._ Message is a native poll, information about the pol
   */
  poll?: TelegramPoll;
  /**
   * _Optional._ New members that were added to the group
   * or supergroup and information about them (the bot itself may be one of these members)
   */
  new_chat_members?: TelegramUser[];
  /**
   * _Optional._ A member was removed from the group, information about them (this member may be the bot itself)
   */
  left_chat_member?: TelegramUser;
  /**
   * _Optional._ A chat title was changed to this value
   */
  new_chat_title?: string;
  /**
   * _Optional._ A chat photo was change to this value
   */
  new_chat_photo?: TelegramPhotoSize[];
  /**
   * _Optional._ Service message: the chat photo was deleted
   */
  delete_chat_photo?: true;
  /**
   * _Optional._ Service message: the group has been created
   */
  group_chat_deleted?: true;
  /**
   * _Optional._ Service message: the supergroup has been created.
   * This field can‘t be received in a message coming through updates, because bot can’t be a member of a supergroup when it is created.
   * It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup.
   */
  supergroup_chat_deleted?: true;
  /**
   * _Optional._ Service message: the channel has been created.
   * This field can‘t be received in a message coming through updates, because bot can’t be a member of a channel when it is created.
   * It can only be found in reply_to_message if someone replies to a very first message in a channel.
   */
  channel_chat_created?: true;
  /**
   * _Optional._ The group has been migrated to a supergroup with the specified identifier.
   * This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it.
   * But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier.
   */
  migrate_to_chat_id?: number;
  /**
   * _Optional._ The supergroup has been migrated from a group with the specified identifier.
   * This number may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it.
   * But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier.
   */
  migrate_from_chat_id?: number;
  /**
   * _Optional._ Specified message was pinned.
   * Note that the Message object in this field will not contain further reply_to_message fields even if it is itself a reply.
   */
  pinned_message?: TelegramMessage;
  /**
   * _Optional._ Message is an invoice for a [payment](https://core.telegram.org/bots/api#payments),
   * information about the invoice.
   * [More about payments »](https://core.telegram.org/bots/api#payments)
   */
  invoice?: TelegramInvoice;
  /**
   * _Optional._ Message is a service message about a successful payment, information about the payment.
   * [More about payments »](https://core.telegram.org/bots/api#payments)
   */
  successful_payment?: TelegramSuccessfulPayment;
  /**
   * _Optional._ The domain name of the website on which the user has logged in.
   * [More about  Login »](https://core.telegram.org/widgets/login)
   */
  connected_website?: string;
  /**
   * _Optional._  Passport data
   */
  passport_data?: TelegramPassportData;
  /**
   * Optional. Inline keyboard attached to the message. `login_url` buttons are represented as ordinary `url` buttons.
   */
  reply_markup?: TelegramInlineKeyboardMarkup;
}

/**
 * This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc.
 */
export interface TelegramMessageEntity {
  /**
   * Type of the entity.
   * Can be mention (@username), hashtag, cashtag, bot_command, url, email, phone_number, bold (bold text),
   * italic (italic text), code (monowidth string), pre (monowidth block),
   * text_link (for clickable text URLs), text_mention (for users [without usernames](https://telegram.org/blog/edit#new-mentions))
   */
  type: string;
  /**
   * Offset in UTF-16 code units to the start of the entity
   */
  offset: number;
  /**
   * Length of the entity in UTF-16 code units
   */
  length: number;
  /**
   * _Optional._ For “text_link” only, url that will be opened after user taps on the text
   */
  url?: string;
  /**
   * _Optional._ For “text_mention” only, the mentioned user
   */
  user?: TelegramUser;
}

/**
 * This object represents one size of a photo or a [file](https://core.telegram.org/bots/api#document) /
 * [sticker](https://core.telegram.org/bots/api#sticker) thumbnail.
 */
export interface TelegramPhotoSize {
  /**
   * Unique identifier for this file
   */
  file_id: string;
  /**
   * Photo width
   */
  width: number;
  /**
   * Photo height
   */
  height: number;
  /**
   * _Optional._ File size
   */
  file_size: number;
}

/**
 * This object represents an audio file to be treated as music by the  clients.
 */
export interface TelegramAudio {
  /**
   * Unique identifier for this file
   */
  file_id: string;
  /**
   * Duration of the audio in seconds as defined by sender
   */
  duration: number;
  /**
   * _Optional._ Performer of the audio as defined by sender or by audio tags
   */
  performer?: string;
  /**
   * _Optional._ Title of the audio as defined by sender or by audio tags
   */
  title?: string;
  /**
   * _Optional._ MIME type of the file as defined by sender
   */
  mime_type?: string;
  /**
   * _Optional._ File size
   */
  file_size?: number;
  /**
   * _Optional._ Thumbnail of the album cover to which the music file belongs
   */
  thumb?: TelegramPhotoSize;
}

/**
 * This object represents a general file (as opposed to [photos](https://core.telegram.org/bots/api#photosize),
 * [voice messages](https://core.telegram.org/bots/api#voice)
 * and [audio files](https://core.telegram.org/bots/api#audio)).
 */
export interface TelegramDocument {
  /**
   * Unique file identifier
   */
  file_id: string;
  /**
   * _Optional._ Document thumbnail as defined by sender
   */
  thumb?: TelegramPhotoSize;
  /**
   * _Optional._ Original filename as defined by sender
   */
  file_name?: string;
  /**
   * _Optional._ MIME type of the file as defined by sender
   */
  mime_type?: string;
  /**
   * _Optional._ File size
   */
  file_size?: number;
}

/**
 * This object represents a video file.
 */
export interface TelegramVideo {
  /**
   * Unique identifier for this file
   */
  file_id: string;
  /**
   * Video width as defined by sender
   */
  width: number;
  /**
   * Video height as defined by sender
   */
  height: number;
  /**
   * Duration of the video in seconds as defined by sender
   */
  duration: number;
  /**
   * _Optional._ Video thumbnail
   */
  thumb?: TelegramPhotoSize;
  /**
   * _Optional._ Mime type of a file as defined by sender
   */
  mime_type?: string;
  /**
   * _Optional._ File size
   */
  file_size?: number;
}

/**
 * This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound).
 */
export interface TelegramAnimation {
  /**
   * Unique file identifier
   */
  file_id: string;
  /**
   * Video width as defined by sender
   */
  width: number;
  /**
   * Video height as defined by sender
   */
  height: number;
  /**
   * Duration of the video in seconds as defined by sender
   */
  duration: number;
  /**
   * _Optional._ Animation thumbnail as defined by sender
   */
  thumb?: TelegramPhotoSize;
  /**
   * _Optional._ Original animation filename as defined by sender
   */
  file_name?: string;
  /**
   * _Optional._ MIME type of the file as defined by sender
   */
  mime_type?: string;
  /**
   * _Optional._ File size
   */
  file_size?: number;
}

/**
 * This object represents a voice note.
 */
export interface TelegramVoice {
  /**
   * Unique identifier for this file
   */
  file_id: string;
  /**
   * Duration of the audio in seconds as defined by sender
   */
  duration: number;
  /**
   * _Optional._ MIME type of the file as defined by sender
   */
  mime_type?: string;
  /**
   * _Optional._ File size
   */
  file_size?: number;
}

/**
 * This object represents a [video message](https://telegram.org/blog/video-messages-and-telescope)
 * (available in  apps as of [v.4.0](https://telegram.org/blog/video-messages-and-telescope)).
 */
export interface TelegramVideoNote {
  /**
   * Unique identifier for this file
   */
  file_id: string;
  /**
   * Video width and height (diameter of the video message) as defined by sender
   */
  length: number;
  /**
   * Duration of the video in seconds as defined by sender
   */
  duration: number;
  /**
   * _Optional._ Video thumbnail
   */
  thumb?: TelegramPhotoSize;
  /**
   * _Optional._ File size
   */
  file_size?: number;
}

/**
 * This object represents a phone contact.
 */
export interface TelegramContact {
  /**
   * Contact's phone number
   */
  phone_number: string;
  /**
   * Contact's first name
   */
  first_name: string;
  /**
   * _Optional._ Contact's last name
   */
  last_name: string;
  /**
   * _Optional._ Contact's user identifier in Telegram
   */
  user_id: number;
  /**
   * _Optional._ Additional data about the contact in the form of a [vCard](https://en.wikipedia.org/wiki/VCard)
   */
  vcard: string;
}

/**
 * This object represents a point on the map.
 */
export interface TelegramLocation {
  /**
   * Longitude as defined by sender
   */
  longitude: number;
  /**
   * Latitude as defined by sender
   */
  latitude: number;
}

/**
 * This object represents a venue.
 */
export interface TelegramVenue {
  /**
   * Venue location
   */
  location: TelegramLocation;
  /**
   * Name of the venue
   */
  title: string;
  /**
   * Address of the venue
   */
  address: string;
  /**
   * _Optional._ Foursquare identifier of the venue
   */
  foursqaure_id?: string;
  /**
   * _Optional._ Foursquare type of the venue.
   * (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.)
   */
  foursquare_type?: string;
}

/**
 * This object contains information about one answer option in a poll.
 */
export interface TelegramPollOption {
  /**
   * Option text, 1-100 characters
   */
  text: string;
  /**
   * Number of users that voted for this option
   */
  voter_count: number;
}

/**
 * This object contains information about a poll.
 */
export interface TelegramPoll {
  /**
   * Unique poll identifier
   */
  id: string;
  /**
   * Poll question, 1-255 characters
   */
  question: string;
  /**
   * List of poll options
   */
  options: TelegramPollOption[];
  /**
   * True, if the poll is closed
   */
  is_closed: boolean;
}

/**
 * This object represent a user's profile pictures.
 */
export interface TelegramUserProfilePhotos {
  /**
   * Total number of profile pictures the target user has
   */
  total_count: number;
  /**
   * Requested profile pictures (in up to 4 sizes each)
   */
  photos: TelegramPhotoSize[][];
}

/**
 * This object represents a file ready to be downloaded.
 * The file can be downloaded via the link `https://api.telegram.org/file/bot<token>/<file_path>`.
 * It is guaranteed that the link will be valid for at least 1 hour.
 * When the link expires, a new one can be requested by calling getFile.
 *
 * > Maximum file size to download is 20 MB
 */
export interface TelegramFile {
  /**
   * Unique identifier for this file
   */
  file_id: string;
  /**
   * _Optional._ File size, if known
   */
  file_size?: number;
  /**
   * _Optional._ File path. Use `https://api.telegram.org/file/bot<token>/<file_path>` to get the file.
   */
  file_path?: string;
}

/**
 * This object represents a [custom keyboard](https://core.telegram.org/bots#keyboards) with reply options
 * (see [Introduction to bots](https://core.telegram.org/bots#keyboards) for details and examples).
 */
export interface TelegramReplyKeyboardMarkup {
  /**
   * Array of button rows, each represented by an Array of [KeyboardButton](https://core.telegram.org/bots/api#keyboardbutton) objects
   */
  keyboard: TelegramKeyboardButton[][];
  /**
   * _Optional._Requests clients to resize the keyboard vertically for optimal fit
   * (e.g., make the keyboard smaller if there are just two rows of buttons).
   * Defaults to false, in which case the custom keyboard is always of the same height as the app's standard keyboard.
   */
  resize_keyboard?: boolean;
  /**
   * _Optional._ Requests clients to hide the keyboard as soon as it's been used.
   * The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat -
   * the user can press a special button in the input field to see the custom keyboard again. Defaults to false.
   */
  one_time_keyboard?: boolean;
  /**
   * _Optional._ Use this parameter if you want to show the keyboard to specific users only. Targets:
   *
   * 1) users that are @mentioned in the text of the [Message](https://core.telegram.org/bots/api#messagec) object;
   *
   * 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message.
   *
   * __Example:__ A user requests to change the bot‘s language, bot replies to the request with a keyboard to select the new language.
   * Other users in the group don’t see the keyboard.
   */
  selective?: boolean;
}

/**
 * This object represents one button of the reply keyboard.
 * For simple text buttons String can be used instead of this object to specify text of the button.
 * Optional fields are mutually exclusive.
 *
 * > __Note:__ request_contact and request_location options will only work in
 *  versions released after 9 April, 2016. Older clients will ignore them.
 */
export interface TelegramKeyboardButton {
  /**
   * Text of the button. If none of the optional fields are used, it will be sent as a message when the button is pressed
   */
  text: string;
  /**
   * _Optional._ If True, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only
   */
  request_contact?: boolean;
  /**
   * _Optional._ If True, the user's current location will be sent when the button is pressed. Available in private chats only
   */
  request_location?: boolean;
}

/**
 * Upon receiving a message with this object,  clients will remove the current custom keyboard and display the
 * default letter-keyboard. By default, custom keyboards are displayed until a new keyboard is sent by a bot.
 * An exception is made for one-time keyboards that are hidden immediately after the user presses a button
 * (see [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup)).
 */
export interface TelegramReplyKeyboardRemove {
  /**
   * Requests clients to remove the custom keyboard (user will not be able to summon
   * this keyboard; if you want to hide the keyboard from sight but keep it accessible, use _one_time_keyboard_ in
   * [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup))
   */
  remove_keyboard: true;
  /**
   * _Optional._ Use this parameter if you want to remove the keyboard for specific users only. Targets:
   *
   * 1) users that are @mentioned in the text of the [Message](https://core.telegram.org/bots/api#message) object;
   *
   * 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message.
   *
   * __Example:__ A user votes in a poll, bot returns confirmation message in reply to the vote and removes the
   * keyboard for that user, while still showing the keyboard with poll options to users who haven't voted yet.
   */
  selective?: boolean;
}

/**
 * This object represents an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)
 * that appears right next to the message it belongs to.
 *
 * > **Note:** This will only work in  versions released after 9 April, 2016. Older clients will display _unsupported message_.
 */
export interface TelegramInlineKeyboardMarkup {
  /**
   * Array of button rows, each represented by an Array of
   * [InlineKeyboardButton](https://core.telegram.org/bots/api#inlinekeyboardbutton) objects
   */
  inline_keyboard: TelegramInlineKeyboardButton[][];
}

/**This object represents one button of an inline keyboard.
 * You must use exactly one of the optional fields.
 */
export interface TelegramInlineKeyboardButton {
  /**
   * Label text on the button
   */
  text: string;
  /**
   * _Optional._ HTTP or tg:// url to be opened when button is pressed
   */
  url?: string;
  /**
   * _Optional._ An HTTP URL used to automatically authorize the user.
   * Can be used as a replacement for the [ Login Widget](https://core.telegram.org/widgets/login).
   */
  login_url?: TelegramLoginUrl;
  /**
   * _Optional._ Data to be sent in a [callback query](https://core.telegram.org/bots/api#callbackquery) to
   * the bot when button is pressed, 1-64 bytes
   */
  callback_data?: string;
  /**
   * _Optional._ If set, pressing the button will prompt the user to select one of their chats, open that chat and insert
   * the bot‘s username and the specified inline query in the input field.
   * Can be empty, in which case just the bot’s username will be inserted.
   *
   * **Note:** This offers an easy way for users to start using your bot in
   * inline mode when they are currently in a private chat with it.
   * Especially useful when combined with switch_pm… actions – in this case
   * the user will be automatically returned to the chat they switched from, skipping the chat selection screen.
   */
  switch_inline_query?: string;
  /**
   * _Optional._ If set, pressing the button will insert the bot‘s username and the
   * specified inline query in the current chat's input field. Can be empty, in which case only the bot’s username will be inserted.
   *
   * This offers a quick way for the user to open your bot in inline mode in the same chat –
   * good for selecting something from multiple options.
   */
  switch_inline_query_current_chat?: string;
  /**
   * _Optional._ Description of the game that will be launched when the user presses the button.
   *
   * **NOTE:** This type of button **must** always be the first button in the first row.
   */
  callback_game?: TelegramCallbackGame;
  /**
   * _Optional._ Specify True, to send a [Pay button](https://core.telegram.org/bots/api#payments).
   *
   * **NOTE:** This type of button **must** always be the first button in the first row.
   */
  pay?: boolean;
}

/**
 * This object represents a parameter of the inline keyboard button used to automatically authorize a user. Serves as a great
 * replacement for the [ Login Widget](https://core.telegram.org/widgets/login)
 * when the user is coming from . All the user needs to do is tap/click a button and confirm that they want to log in:
 *
 *  apps support these buttons as of [version 5.7.](https://telegram.org/blog/privacy-discussions-web-bots#meet-seamless-web-bots)
 *
 * > Sample bot: [@discussbot](https://t.me/discussbot)
 */
export interface TelegramLoginUrl {
  /**
   * An HTTP URL to be opened with user authorization data added to the query string when the button is pressed.
   * If the user refuses to provide authorization data, the original URL without information about the user will be opened.
   * The data added is the same as described in
   * [Receiving authorization data.](https://core.telegram.org/widgets/login#receiving-authorization-data)
   *
   * **NOTE:** You **must** always check the hash of the received data to verify the
   * authentication and the integrity of the data as described in
   * [Checking authorization.](https://core.telegram.org/widgets/login#checking-authorization)
   */
  url: string;
  /**
   * _Optional._ New text of the button in forwarded messages.
   */
  forward_text?: string;
  /**
   * _Optional._ Username of a bot, which will be used for user authorization. See
   * [Setting up a bot](https://core.telegram.org/widgets/login#setting-up-a-bot)
   * for more details. If not specified, the current bot's username will be assumed.
   * The url's domain must be the same as the domain linked with the bot.
   * See [Linking your domain to the bot](https://core.telegram.org/widgets/login#linking-your-domain-to-the-bot) for more details.
   */
  bot_username?: string;
  /**
   * _Optional._ Pass True to request the permission for your bot to send messages to the user.
   */
  request_write_access?: boolean;
}

/**
 * This object represents an incoming callback query from a callback button in an
 * [inline keyboard.](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)
 * If the button that originated the query was attached to a message sent by the bot, the field message will be present.
 * If the button was attached to a message sent via the bot (in [inline mode](https://core.telegram.org/bots/api#inline-mode)),
 * the field inline_message_id will be present. Exactly one of the fields data or game_short_name will be present.
 *
 * > **NOTE:** After the user presses a callback button,
 *  clients will display a progress bar until you call
 * [answerCallbackQuery](https://core.telegram.org/bots/api#answercallbackquery).
 * It is, therefore, necessary to react by calling
 * [answerCallbackQuery](https://core.telegram.org/bots/api#answercallbackquery)
 * even if no notification to the user is needed (e.g., without specifying any of the optional parameters).
 */
export interface TelegramCallbackQuery {
  /**
   * Unique identifier for this query
   */
  id: string;
  /**
   * Sender
   */
  from: TelegramUser;
  /**
   * _Optional._ Message with the callback button that originated the query.
   * Note that message content and message date will not be available if the message is too old
   */
  message?: TelegramMessage;
  /**
   * _Optional._ Identifier of the message sent via the bot in inline mode, that originated the query.
   */
  inline_message_id?: string;
  /**
   * Global identifier, uniquely corresponding to the chat to which the
   * message with the callback button was sent. Useful for high scores in [games](https://core.telegram.org/bots/api#games).
   */
  chat_instance: string;
  /**
   * _Optional._ Data associated with the callback button. Be aware that a bad client can send arbitrary data in this field.
   */
  data?: string;
  /**
   * _Optional._ Short name of a [Game](https://core.telegram.org/bots/api#games)
   * to be returned, serves as the unique identifier for the game
   */
  game_short_name?: string;
}

/**
 * Upon receiving a message with this object,  clients will display a reply interface to the user
 * (act as if the user has selected the bot‘s message and tapped ’Reply').
 * This can be extremely useful if you want to create user-friendly step-by-step interfaces
 * without having to sacrifice [privacy mode](https://core.telegram.org/bots#privacy-mode).
 *
 * > **Example:** A [poll bot](https://t.me/PollBot) for groups runs in privacy mode
 * (only receives commands, replies to its messages and mentions).
 * There could be two ways to create a new poll:
 *
 * * Explain the user how to send a command with parameters (e.g. /newpoll question answer1 answer2).
 * May be appealing for hardcore users but lacks modern day polish.
 * *Guide the user through a step-by-step process. ‘Please send me your question’,
 * ‘Cool, now let’s add the first answer option‘, ’Great. Keep adding answer options, then send /done when you‘re ready’.
 *
 * The last option is definitely more attractive. And if you use [ForceReply](https://core.telegram.org/bots/api#forcereply)
 * in your bot‘s questions, it will receive
 * the user’s answers even if it only receives replies, commands and mentions — without any extra work for the user.
 */
export interface TelegramForceReply {
  /**
   * Shows reply interface to the user, as if they manually selected the bot‘s message and tapped ’Reply'
   */
  force_reply: true;
  /**
   * _Optional._ Use this parameter if you want to force reply from specific users only. Targets:
   *
   * 1) users that are @mentioned in the text of the [Message](https://core.telegram.org/bots/api#message) object;
   *
   * 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message.
   */
  selective?: boolean;
}

/**
 * This object represents a chat photo.
 */
export interface TelegramChatPhoto {
  /**
   * Unique file identifier of small (160x160) chat photo. This file_id can be used only for photo download.
   */
  small_file_id: string;
  /**
   * Unique file identifier of big (640x640) chat photo. This file_id can be used only for photo download.
   */
  big_file_id: string;
}

/**
 * This object contains information about one member of a chat.
 */
export interface TelegramChatMember {
  /**
   * Information about the user
   */
  user: TelegramUser;
  /**
   * The member's status in the chat. Can be “creator”, “administrator”, “member”, “restricted”, “left” or “kicked”
   */
  status: string;
  /**
   * _Optional._ Restricted and kicked only. Date when restrictions will be lifted for this user, unix time
   */
  until_date?: number;
  /**
   * _Optional._ Administrators only. True, if the bot is allowed to edit administrator privileges of that user
   */
  can_be_edited?: boolean;
  /**
   * _Optional._ Administrators only. True, if the administrator can change the chat title, photo and other settings
   */
  can_change_info?: boolean;
  /**
   * _Optional._ Administrators only. True, if the administrator can post in the channel, channels only
   */
  can_post_messages?: boolean;
  /**
   * _Optional._ Administrators only. True, if the administrator can edit messages of other users and can pin messages, channels only
   */
  can_edit_messages?: boolean;
  /**
   * _Optional._ Administrators only. True, if the administrator can delete messages of other users
   */
  can_delete_messages?: boolean;
  /**
   * _Optional._ Administrators only. True, if the administrator can invite new users to the chat
   */
  can_invite_users?: boolean;
  /**
   * _Optional._ Administrators only. True, if the administrator can restrict, ban or unban chat members
   */
  can_restrict_members?: boolean;
  /**
   * _Optional._ Administrators only. True, if the administrator can pin messages, groups and supergroups only
   */
  can_pin_messages?: boolean;
  /**
   * _Optional._ Administrators only. True, if the administrator can add new administrators with a subset of his own privileges or
   * demote administrators that he has promoted, directly or indirectly (promoted by administrators that were appointed by the user)
   */
  can_promote_members?: boolean;
  /**
   * _Optional._ Restricted only. True, if the user is a member of the chat at the moment of the request
   */
  is_member?: boolean;
  /**
   * _Optional._ Restricted only. True, if the user can send text messages, contacts, locations and venues
   */
  can_send_messages?: boolean;
  /**
   * _Optional._ Restricted only. True, if the user can send audios, documents,
   * photos, videos, video notes and voice notes, implies can_send_messages
   */
  can_send_media_messages?: boolean;
  /**
   * _Optional._ Restricted only. True, if the user can send animations, games,
   * stickers and use inline bots, implies can_send_media_messages
   */
  can_send_other_messages?: boolean;
  /**
   * _Optional._ Restricted only. True, if user may add web page previews to his messages, implies can_send_media_messages
   */
  can_add_web_page_previews?: boolean;
}

/**
 * Contains information about why a request was unsuccessful.
 */
export interface TelegramResponseParameters {
  /**
   * _Optional._ The group has been migrated to a supergroup with the specified identifier.
   * This number may be greater than 32 bits and some programming languages may
   * have difficulty/silent defects in interpreting it. But it is smaller than
   * 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier.
   */
  migrate_to_chat_id?: number;
  /**
   * _Optional._ In case of exceeding flood control, the number of seconds left to wait before the request can be repeated
   */
  retry_after?: number;
}

/**
 * This object represents the content of a media message to be sent. It should be one of
 * * InputMediaAnimation
 * * InputMediaDocument
 * * InputMediaAudio
 * * InputMediaPhoto
 * * InputMediaVideo
 */
export interface TelegramInputMedia {
  /**
   * Type of the result, must be audio, photo, video, animation, or document
   */
  type: string;
  /**
   * File to send. Pass a file_id to send a file that exists on the  servers (recommended),
   * pass an HTTP URL for  to get a file from the Internet, or pass “attach://<file_attach_name>”
   * to upload a new one using multipart/form-data under <file_attach_name> name.
   * [More info on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   */
  media: Buffer | string;
  /**
   * _Optional._ Caption of the photo to be sent, 0-1024 characters
   */
  caption?: string;
  /**
   * _Optional._ Send [Markdown](https://core.telegram.org/bots/api#markdown-style) or
   * [HTML](https://core.telegram.org/bots/api#html-style),
   * if you want  apps to show
   * [bold, italic, fixed-width text or inline URLs](https://core.telegram.org/bots/api#formatting-options) in the media caption.
   */
  parse_mode?: string;
}

/**
 * Represents a photo to be sent.
 */
export interface TelegramInputMediaPhoto extends TelegramInputMedia {
  /**
   * Type of the result, must be photo
   */
  type: string;
}

/**
 * Represents a video to be sent.
 */
export interface TelegramInputMediaVideo extends TelegramInputMedia {
  /**
   * Type of the result, must be video
   */
  type: string;
  /**
   * _Optional._ Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
   * The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail‘s width and height should not exceed 320.
   * Ignored if the file is not uploaded using multipart/form-data.
   * Thumbnails can’t be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>”
   * if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
   * [More info on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   */
  thumb?: Buffer | string;
  /**
   * _Optional._ Video width
   */
  width?: number;
  /**
   * _Optional._ Video height
   */
  height?: number;
  /**
   * _Optional._ Video duration
   */
  duration?: number;
  /**
   * _Optional._ Pass True, if the uploaded video is suitable for streaming
   */
  supports_streaming?: boolean;
}

/**
 * Represents an animation file (GIF or H.264/MPEG-4 AVC video without sound) to be sent.
 */
export interface TelegramInputMediaAnimation extends TelegramInputMedia {
  /**
   * Type of the result, must be animation
   */
  type: 'animation';
  /**
   * _Optional._ Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
   * The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail‘s width and height should not exceed 320.
   * Ignored if the file is not uploaded using multipart/form-data.
   * Thumbnails can’t be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>”
   * if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
   * [More info on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   */
  thumb?: Buffer | string;
  /**
   * _Optional._ Animation width
   */
  width?: number;
  /**
   * _Optional._ Animation height
   */
  height?: number;
  /**
   * _Optional._ Animation duration
   */
  duration?: number;
}

/**
 * Represents an audio file to be treated as music to be sent.
 */
export interface TelegramInputMediaAudio extends TelegramInputMedia {
  /**
   * Type of the result, must be audio
   */
  type: 'audio';
  /**
   * _Optional._ Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
   * The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail‘s width and height should not exceed 320.
   * Ignored if the file is not uploaded using multipart/form-data.
   * Thumbnails can’t be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>”
   * if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
   * [More info on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   */
  thumb?: Buffer | string;
  /**
   * _Optional._ Duration of the audio in seconds
   */
  duration?: number;
  /**
   * _Optional._ Performer of the audio
   */
  performer?: string;
  /**
   * _Optional._ Title of the audio
   */
  title?: string;
}

/**
 * Represents a general file to be sent.
 */
export interface TelegramInputMediaDocument extends TelegramInputMedia {
  /**
   * Type of the result, must be document
   */
  type: 'document';
  /**
   * _Optional._ Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side.
   * The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail‘s width and height should not exceed 320.
   * Ignored if the file is not uploaded using multipart/form-data.
   * Thumbnails can’t be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>”
   * if the thumbnail was uploaded using multipart/form-data under <file_attach_name>.
   * [More info on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   */
  thumb?: Buffer | string;
}

/*************************************
 *
 * T E L E G R A M   S T I C K E R S
 *
 *************************************/

/**
 * This object represents a sticker.
 */
export interface TelegramSticker {
  /**
   * Unique identifier for this file
   */
  file_id: string;
  /**
   * Sticker width
   */
  width: number;
  /**
   * Sticker height
   */
  height: number;
  /**
   * _Optional._ Sticker thumbnail in the .webp or .jpg format
   */
  thumb?: TelegramPhotoSize;
  /**
   * _Optional._ Emoji associated with the sticker
   */
  emoji?: string;
  /**
   * _Optional._ Name of the sticker set to which the sticker belongs
   */
  set_name?: string;
  /**
   * _Optional._ For mask stickers, the position where the mask should be placed
   */
  mask_position?: TelegramMaskPosition;
  /**
   * _Optional._ File size
   */
  file_size?: number;
}

/**
 * This object represents a sticker set.
 */
export interface TelegramStickerSet {
  /**
   * Sticker set name
   */
  name: string;
  /**
   * Sticker set title
   */
  title: string;
  /**
   * True, if the sticker set contains masks
   */
  contains_masks: boolean;
  /**
   * List of all set stickers
   */
  stickers: TelegramSticker[];
}

/**
 * This object describes the position on faces where a mask should be placed by default.
 */
export interface TelegramMaskPosition {
  /**
   * The part of the face relative to which the mask should be placed. One of “forehead”, “eyes”, “mouth”, or “chin”.
   */
  point: 'forehead' | 'eyes' | 'mouth' | 'chin';
  /**
   * Shift by X-axis measured in widths of the mask scaled to the face size, from left to right.
   * For example, choosing -1.0 will place mask just to the left of the default mask position.
   */
  x_shift: number;
  /**
   * Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom.
   * For example, 1.0 will place the mask just below the default mask position.
   */
  y_shift: number;
  /**
   * Mask scaling coefficient. For example, 2.0 means double size.
   */
  scale: number;
}

/*************************************
 *
 * T E L E G R A M   P A Y M E N T S
 *
 *************************************/

/**
 * This object represents a portion of the price for goods or services.
 */
export interface TelegramLabeledPrice {
  /**
   * Portion label
   */
  label: string;
  /**
   * Price of the product in the smallest units of the
   * [currency](https://core.telegram.org/bots/payments#supported-currencies)   * (integer, not float/double).
   * For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in
   * [currencies.json](https://core.telegram.org/bots/payments/currencies.json_),
   * it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
   */
  amount: number;
}

/**
 * This object contains basic information about an invoice.
 */
export interface TelegramInvoice {
  /**
   * Product name
   */
  title: string;
  /**
   * Product description
   */
  description: string;
  /**
   * Unique bot deep-linking parameter that can be used to generate this invoice
   */
  start_parameter: string;
  /**
   * Three-letter ISO 4217 [currency](https://core.telegram.org/bots/payments#supported-currencies) code
   */
  currency: string;
  /**
   * Price of the product in the smallest units of the
   * [currency](https://core.telegram.org/bots/payments#supported-currencies)   * (integer, not float/double).
   * For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in
   * [currencies.json](https://core.telegram.org/bots/payments/currencies.json_),
   * it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
   */
  total_amount: number;
}

/**
 * This object represents a shipping address.
 */
export interface TelegramShippingAddress {
  /**
   * ISO 3166-1 alpha-2 country code
   */
  country_code: string;
  /**
   * State, if applicable
   */
  state: string;
  /**
   * City
   */
  city: string;
  /**
   * First line for the address
   */
  street_line1: string;
  /**
   * Second line for the address
   */
  street_line2: string;
  /**
   * Address postal code
   */
  post_code: string;
}

/**
 * This object represents information about an order.
 */
export interface TelegramOrderInfo {
  /**
   * _Optional._ User name
   */
  name?: string;
  /**
   * _Optional._ User's phone number
   */
  phone_number?: string;
  /**
   * _Optional._ User email
   */
  email?: string;
  /**
   * _Optional._ User shipping address
   */
  shipping_address?: TelegramShippingAddress;
}

/**
 * This object represents one shipping option
 */
export interface TelegramShippingOption {
  /**
   * Shipping option identifier
   */
  id: string;
  /**
   * Option title
   */
  title: string;
  /**
   * List of price portions
   */
  prices: TelegramLabeledPrice[];
}

/**
 * This object contains basic information about a successful payment
 */
export interface TelegramSuccessfulPayment {
  /**
   * Three-letter ISO 4217 [currency](https://core.telegram.org/bots/payments#supported-currencies) code
   */
  currency: string;
  /**
   * Price of the product in the smallest units of the
   * [currency](https://core.telegram.org/bots/payments#supported-currencies)   * (integer, not float/double).
   * For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in
   * [currencies.json](https://core.telegram.org/bots/payments/currencies.json_),
   * it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
   */
  total_amount: number;
  /**
   * Bot specified invoice payload
   */
  invoice_payload: string;
  /**
   * _Optional._ Identifier of the shipping option chosen by the user
   */
  shipping_option_id?: string;
  /**
   * _Optional._ Order info provided by the user
   */
  order_info?: TelegramOrderInfo;
  /**
   *  payment identifier
   */
  telegram_payment_charge_id: string;
  /**
   * Provider payment identifier
   */
  provider_payment_charge_id: string;
}

/**
 * This object contains information about an incoming pre-checkout query
 */
export interface TelegramPreCheckoutQuery {
  /**
   * Unique query identifier
   */
  id: string;
  /**
   * User who sent the query
   */
  from: TelegramUser;
  /**
   * Three-letter ISO 4217 [currency](https://core.telegram.org/bots/payments#supported-currencies) code
   */
  currency: string;
  /**
   * Price of the product in the smallest units of the
   * [currency](https://core.telegram.org/bots/payments#supported-currencies)   * (integer, not float/double).
   * For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in
   * [currencies.json](https://core.telegram.org/bots/payments/currencies.json_),
   * it shows the number of digits past the decimal point for each currency (2 for the majority of currencies).
   */
  total_amount: number;
  /**
   * Bot specified invoice payload
   */
  invoice_payload: string;
  /**
   * _Optional._ Identifier of the shipping option chosen by the user
   */
  shipping_option_id?: string;
  /**
   * _Optional._ Order info provided by the user
   */
  order_info?: TelegramOrderInfo;
}

/*************************************
 *
 * T E L E G R A M   P A S S P O R T
 *
 *************************************/

/**
 * Containts information about  Passport data shared with the bot by the user
 */
export interface TelegramPassportData {
  /**
   * Array with information about documents and other  Passport elements that was shared with the bot
   */
  data: TelegramEncryptedPassportElement[];
  /**
   * Encrypted credentials required to decrypt the data
   */
  credentials: TelegramEncryptedCredentials;
}

/**
 * This object represents a file uploaded to  Passport.
 * Currently all  Passport files are in JPEG format when decrypted and don't exceed 10MB.
 */
export interface TelegramPassportFile {
  /**
   * Unique identifier for this file
   */
  file_id: string;
  /**
   * File size
   */
  file_size: number;
  /**
   * Unix time when the file was uploaded
   */
  file_date: number;
}
/**
 * Contains information about documents or other  Passport elements shared with the bot by the user.
 */
export interface TelegramEncryptedPassportElement {
  /**
   * Element type. One of “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport”,
   * “address”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration”,
   * “phone_number”, “email”.
   */
  type:
    | 'personal_details'
    | 'passport'
    | 'driver_license'
    | 'identity_card'
    | 'internal_passport'
    | 'address'
    | 'utility_bill'
    | 'bank_statement'
    | 'rental_agreement'
    | 'passport_registration'
    | 'temporary_registration'
    | 'phone_number'
    | 'email';
  /**
   * _Optional._ Base64-encoded encrypted  Passport element data provided by the user, available for “personal_details”,
   * “passport”, “driver_license”, “identity_card”, “internal_passport” and “address” types.
   * Can be decrypted and verified using the accompanying [EncryptedCredentials.](https://core.telegram.org/bots/api#encryptedcredentials)
   */
  data?: string;
  /**
   * _Optional._ User's verified phone number, available only for “phone_number” type
   */
  phone_number?: string;
  /**
   * _Optional._ User's verified email address, available only for “email” type
   */
  email?: string;
  /**
   * _Optional._ Array of encrypted files with documents provided by the user, available for “utility_bill”,
   * “bank_statement”, “rental_agreement”, “passport_registration” and “temporary_registration”
   * types. Files can be decrypted and verified using the accompanying
   * [EncryptedCredentials.](https://core.telegram.org/bots/api#encryptedcredentials)
   */
  files?: TelegramPassportFile[];
  /**
   * _Optional._ Encrypted file with the front side of the document, provided by the user. Available for “passport”,
   * “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the
   * accompanying [EncryptedCredentials.](https://core.telegram.org/bots/api#encryptedcredentials)
   */
  front_side?: TelegramPassportFile;
  /**
   * _Optional._ Encrypted file with the reverse side of the document, provided by the user. Available for “driver_license”
   * and “identity_card”. The file can be decrypted and verified using the accompanying
   * [EncryptedCredentials.](https://core.telegram.org/bots/api#encryptedcredentials)
   */
  reverse_side?: TelegramPassportFile;
  /**
   * _Optional._ Encrypted file with the selfie of the user holding a document, provided by the user; available for “passport”,
   * “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the accompanying
   * [EncryptedCredentials.](https://core.telegram.org/bots/api#encryptedcredentials)
   */
  selfie?: TelegramPassportFile;
  /**
   * _Optional._ Array of encrypted files with translated versions of documents provided by the user. Available if requested for “passport”,
   * “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”,
   * “rental_agreement”, “passport_registration” and “temporary_registration” types. Files can be decrypted and verified
   * using the accompanying [EncryptedCredentials.](https://core.telegram.org/bots/api#encryptedcredentials)
   */
  translation?: TelegramPassportFile[];
  /**
   * Base64-encoded element hash for using in
   * [PassportElementErrorUnspecified](https://core.telegram.org/bots/api#passportelementerrorunspecified)
   */
  hash: string;
}

/**
 * Contains data required for decrypting and authenticating
 * [EncryptedPassportElement](https://core.telegram.org/bots/api#encryptedpassportelement).
 * See the [ Passport Documentation](https://core.telegram.org/passport#receiving-information)
 * for a complete description of the data decryption and authentication processes.
 */
export interface TelegramEncryptedCredentials {
  /**
   * Base64-encoded encrypted JSON-serialized data with unique user's payload, data hashes and secrets required for
   * [EncryptedPassportElement](https://core.telegram.org/bots/api#encryptedpassportelement) decryption and authentication
   */
  data: string;
  /**
   * Base64-encoded data hash for data authentication
   */
  hash: string;
  /**
   * Base64-encoded secret, encrypted with the bot's public RSA key, required for data decryption
   */
  secret: string;
}

/*************************************
 *
 * T E L E G R A M   G A M E S
 *
 *************************************/

/**
 * This object represents a game. Use BotFather to create and edit games, their short names will act as unique identifiers.
 */
export interface TelegramGame {
  /**
   * Title of the game
   */
  title: string;
  /**
   * Description of the game
   */
  description: string;
  /**
   * Photo that will be displayed in the game message in chats
   */
  photo: TelegramPhotoSize[];
  /**
   * _Optional._ Brief description of the game or high scores included in the game message. Can be automatically
   * edited to include current high scores for the game when the bot calls
   * [setGameScore](https://core.telegram.org/bots/api#setgamescore), or manually edited using
   * [editMessageText](https://core.telegram.org/bots/api#editmessagetext). 0-4096 characters.
   */
  text?: string;
  /**
   * _Optional._ Special entities that appear in text, such as usernames, URLs, bot commands, etc.
   */
  text_entities?: TelegramMessageEntity[];
  /**
   * _Optional._ Animation that will be displayed in the game message in chats. Upload via [BotFather](https://t.me/botfather)
   */
  animation?: TelegramAnimation;
}

/**
 * A placeholder, currently holds no information. Use BotFather to set up your game.
 */
// tslint:disable-next-line
export interface TelegramCallbackGame {}

/**
 * This object represents one row of the high scores table for a game.
 */
export interface TelegramGameHighScore {
  /**
   * Position in high score table for the game
   */
  position: number;
  /**
   * User who set the high score
   */
  user: TelegramUser;
  /**
   * What the score was
   */
  score: number;
}

/********************************************
 *
 * T E L E G R A M   R E T U R N   T Y P E S
 *
 ********************************************/

/**
 * Response object sent from . If "ok" is true, the API callout was successful,
 * otherwise the error_code, and description will have information about what happened
 */
export interface TelegramResponse<T> {
  ok: boolean;
  result?: T;
  error_code?: number;
  description?: string;
}

export class TelegramException extends BadRequestException {
  constructor(message?: string | object | any, error?: string) {
    super(message, error);
  }
}

/**
 *
 * T E L E G R A M   P A R A M E T E R S
 *
 */

interface TelegramChatId {
  /**
   * Unique identifier for the target group or username of the target supergroup or channel (in the format `@channelusername`)
   */
  chat_id: number | string;
}

/**
 * @see https://core.telegram.org/bots/api#getupdates
 */
export interface GetUpdatesParams {
  /**
   * Identifier of the first update to be returned. Must be greater by one than the highest among the identifiers of
   * previously received updates. By default, updates starting with the earliest unconfirmed update are returned. An
   * update is considered confirmed as soon as getUpdates is called with an offset higher than its update_id. The
   * negative offset can be specified to retrieve updates starting from -offset update from the end of the updates
   * queue. All previous updates will forgotten.
   */
  offset?: number;

  /**
   * Limits the number of updates to be retrieved. Values between 1-100 are accepted. Defaults to 100.
   */
  limit?: number;

  /**
   * Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling. Should be positive, short polling
   * should be used for testing purposes only.
   */
  timeout?: number;

  /**
   * A JSON-serialized list of the update types you want your bot to receive. For example, specify
   * [“message”, “edited_channel_post”, “callback_query”] to only receive updates of these types. See Update for a
   * complete list of available update types. Specify an empty list to receive all update types except chat_member
   * (default). If not specified, the previous setting will be used.
   *
   * Please note that this parameter doesn't affect updates created before the call to the getUpdates, so unwanted
   * updates may be received for a short period of time.
   */
  allowed_updates?: string[];
}

export interface TelegramSendMessageParams extends TelegramChatId {
  /**
   * Text of the message to be sent
   */
  text: string;
  /**
   * Send [Markdown](https://core.telegram.org/bots/api#markdown-style) or
   * [HTML](https://core.telegram.org/bots/api#html-style), if you want  apps to show
   * [bold, italic, fixed-width text or inline URLs](https://core.telegram.org/bots/api#formatting-options) in your bot's message.
   */
  parse_mode?: 'markdown' | 'html';
  /**
   * Disables link previews for links in this message
   */
  disable_web_page_preview?: boolean;
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * Additional interface options. A JSON-serialized object for an
   * [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)
   * , [custom reply keyboard](https://core.telegram.org/bots#keyboards)
   * , instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?:
    | TelegramInlineKeyboardMarkup
    | TelegramReplyKeyboardMarkup
    | TelegramReplyKeyboardRemove
    | TelegramForceReply;
}

export interface TelegramForwardMessageParams extends TelegramChatId {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  from_chat_id: number | string;
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * Message identifier in the chat specified in from_chat_id
   */
  message_id: number;
}

export interface TelegramSendPhotoParams extends TelegramChatId {
  /**
   * Photo to send. Pass a file_id as String to send a photo that exists on the  servers
   * (recommended), pass an HTTP URL as a String for  to get a photo from the Internet, or upload a new photo using
   * multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   */
  photo: Buffer | string;
  /**
   * Photo caption (may also be used when resending photos by file_id), 0-1024 characters
   */
  caption?: string;
  /**
   * Send [Markdown](https://core.telegram.org/bots/api#markdown-style) or
   * [HTML](https://core.telegram.org/bots/api#html-style), if you want  apps to show
   * [bold, italic, fixed-width text or inline URLs](https://core.telegram.org/bots/api#formatting-options) in your bot's message.
   */
  parse_mode?: string;
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * Additional interface options. A JSON-serialized object for an
   * [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)
   * , [custom reply keyboard](https://core.telegram.org/bots#keyboards)
   * , instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?:
    | TelegramInlineKeyboardMarkup
    | TelegramReplyKeyboardMarkup
    | TelegramReplyKeyboardRemove
    | TelegramForceReply;
}

export interface TelegramSendAudioParams extends TelegramChatId {
  /**
   * Audio file to send. Pass a file_id as String to send an audio file that exists on the  servers (recommended),
   * pass an HTTP URL as a String for  to get an audio file from the Internet,
   * or upload a new one using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   */
  audio: Buffer | string;
  /**
   * Audio caption, 0-1024 characters
   */
  caption?: string;
  /**
   * Send [Markdown](https://core.telegram.org/bots/api#markdown-style) or
   * [HTML](https://core.telegram.org/bots/api#html-style), if you want  apps to show
   * [bold, italic, fixed-width text or inline URLs](https://core.telegram.org/bots/api#formatting-options) in your bot's message.
   */
  parse_mode?: string;
  /**
   * Duration of the audio in seconds
   */
  duration?: number;
  /**
   * Performer
   */
  performer?: string;
  /**
   * Track name
   */
  title?: string;
  /**
   * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in
   * JPEG format and less than 200 kB in size. A thumbnail‘s width and height should not exceed 320. Ignored if the file is not
   * uploaded using multipart/form-data. Thumbnails can’t be reused and can be only uploaded as a new file, so you can pass
   * “attach://<file_attach_name>” if the thumbnail was uploaded using
   * multipart/form-data under <file_attach_name>. [More info on Sending Files »](https://)core.telegram.org/bots/api#sending-files)
   */
  thumb?: Buffer | string;
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * Additional interface options. A JSON-serialized object for an
   * [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)
   * , [custom reply keyboard](https://core.telegram.org/bots#keyboards)
   * , instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?:
    | TelegramInlineKeyboardMarkup
    | TelegramReplyKeyboardMarkup
    | TelegramReplyKeyboardRemove
    | TelegramForceReply;
}

export interface TelegramSendDocumentParams extends TelegramChatId {
  /**
   * File to send. Pass a file_id as String to send a file that exists on the  servers (recommended),
   * pass an HTTP URL as a String for  to get a file from the Internet,
   * or upload a new one using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   */
  document: Buffer | string;
  /**
   * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in
   * JPEG format and less than 200 kB in size. A thumbnail‘s width and height should not exceed 320. Ignored if the file is not
   * uploaded using multipart/form-data. Thumbnails can’t be reused and can be only uploaded as a new file, so you can pass
   * “attach://<file_attach_name>” if the thumbnail was uploaded using
   * multipart/form-data under <file_attach_name>. [More info on Sending Files »](https://)core.telegram.org/bots/api#sending-files)
   */
  thumb?: Buffer | string;
  /**
   * Document caption (may also be used when resending documents by file_id), 0-1024 characters
   */
  caption?: string;
  /**
   * Send [Markdown](https://core.telegram.org/bots/api#markdown-style) or
   * [HTML](https://core.telegram.org/bots/api#html-style), if you want  apps to show
   * [bold, italic, fixed-width text or inline URLs](https://core.telegram.org/bots/api#formatting-options) in your bot's message.
   */
  parse_mode?: string;
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * Additional interface options. A JSON-serialized object for an
   * [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)
   * , [custom reply keyboard](https://core.telegram.org/bots#keyboards)
   * , instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?:
    | TelegramInlineKeyboardMarkup
    | TelegramReplyKeyboardMarkup
    | TelegramReplyKeyboardRemove
    | TelegramForceReply;
}

export interface TelegramSendVideoParams extends TelegramChatId {
  /**
   * Video to send. Pass a file_id as String to send a video that exists on the  servers (recommended),
   * pass an HTTP URL as a String for  to get a video from the Internet,
   * or upload a new video using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   */
  video: Buffer | string;
  /**
   * Duration of sent video in seconds
   */
  duration?: number;
  /**
   * Video width
   */
  width?: number;
  /**
   * Video height
   */
  height?: number;
  /**
   * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in
   * JPEG format and less than 200 kB in size. A thumbnail‘s width and height should not exceed 320. Ignored if the file is not
   * uploaded using multipart/form-data. Thumbnails can’t be reused and can be only uploaded as a new file, so you can pass
   * “attach://<file_attach_name>” if the thumbnail was uploaded using
   * multipart/form-data under <file_attach_name>. [More info on Sending Files »](https://)core.telegram.org/bots/api#sending-files)
   */
  thumb?: Buffer | string;
  /**
   * Video caption (may also be used when resending videos by file_id), 0-1024 characters
   */
  caption?: string;
  /**
   * Send [Markdown](https://core.telegram.org/bots/api#markdown-style) or
   * [HTML](https://core.telegram.org/bots/api#html-style), if you want  apps to show
   * [bold, italic, fixed-width text or inline URLs](https://core.telegram.org/bots/api#formatting-options) in your bot's message.
   */
  parse_mode?: string;
  /**
   * Pass True, if the uploaded video is suitable for streaming
   */
  supports_streaming?: boolean;
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * Additional interface options. A JSON-serialized object for an
   * [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)
   * , [custom reply keyboard](https://core.telegram.org/bots#keyboards)
   * , instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?:
    | TelegramInlineKeyboardMarkup
    | TelegramReplyKeyboardMarkup
    | TelegramReplyKeyboardRemove
    | TelegramForceReply;
}

export interface TelegramSendVideoNoteParams extends TelegramChatId {
  /**
   * Video note to send. Pass a file_id as String to send a video note that exists on the  servers (recommended),
   * pass an HTTP URL as a String for  to get a video from the Internet,
   * or upload a new video using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   */
  video_note: Buffer | string;
  /**
   * Duration of sent video in seconds
   */
  duration?: number;
  /**
   * Video width
   */
  width?: number;
  /**
   * Video height
   */
  height?: number;
  /**
   * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in
   * JPEG format and less than 200 kB in size. A thumbnail‘s width and height should not exceed 320. Ignored if the file is not
   * uploaded using multipart/form-data. Thumbnails can’t be reused and can be only uploaded as a new file, so you can pass
   * “attach://<file_attach_name>” if the thumbnail was uploaded using
   * multipart/form-data under <file_attach_name>. [More info on Sending Files »](https://)core.telegram.org/bots/api#sending-files)
   */
  thumb?: Buffer | string;
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * Additional interface options. A JSON-serialized object for an
   * [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)
   * , [custom reply keyboard](https://core.telegram.org/bots#keyboards)
   * , instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?:
    | TelegramInlineKeyboardMarkup
    | TelegramReplyKeyboardMarkup
    | TelegramReplyKeyboardRemove
    | TelegramForceReply;
}

export interface TelegramSendAnimationParams extends TelegramChatId {
  /**
   * Animation to send. Pass a file_id as String to send a animation that exists on the  servers (recommended),
   * pass an HTTP URL as a String for  to get a animation from the Internet,
   * or upload a new animation using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   */
  animation: Buffer | string;
  /**
   * Duration of sent video in seconds
   */
  duration?: number;
  /**
   * Video width
   */
  width?: number;
  /**
   * Video height
   */
  height?: number;
  /**
   * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in
   * JPEG format and less than 200 kB in size. A thumbnail‘s width and height should not exceed 320. Ignored if the file is not
   * uploaded using multipart/form-data. Thumbnails can’t be reused and can be only uploaded as a new file, so you can pass
   * “attach://<file_attach_name>” if the thumbnail was uploaded using
   * multipart/form-data under <file_attach_name>. [More info on Sending Files »](https://)core.telegram.org/bots/api#sending-files)
   */
  thumb?: Buffer | string;
  /**
   * Video caption (may also be used when resending videos by file_id), 0-1024 characters
   */
  caption?: string;
  /**
   * Send [Markdown](https://core.telegram.org/bots/api#markdown-style) or
   * [HTML](https://core.telegram.org/bots/api#html-style), if you want  apps to show
   * [bold, italic, fixed-width text or inline URLs](https://core.telegram.org/bots/api#formatting-options) in your bot's message.
   */
  parse_mode?: string;
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * Additional interface options. A JSON-serialized object for an
   * [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)
   * , [custom reply keyboard](https://core.telegram.org/bots#keyboards)
   * , instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?:
    | TelegramInlineKeyboardMarkup
    | TelegramReplyKeyboardMarkup
    | TelegramReplyKeyboardRemove
    | TelegramForceReply;
}

export interface TelegramSendVoiceParams extends TelegramChatId {
  /**
   * Audio file to send. Pass a file_id as String to send a file that exists on the  servers (recommended),
   * pass an HTTP URL as a String for  to get a file from the Internet,
   * or upload a new file using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   */
  voice: Buffer | string;
  /**
   * Duration of sent video in seconds
   */
  duration?: number;
  /**
   * Video width
   */
  width?: number;
  /**
   * Video height
   */
  height?: number;
  /**
   * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in
   * JPEG format and less than 200 kB in size. A thumbnail‘s width and height should not exceed 320. Ignored if the file is not
   * uploaded using multipart/form-data. Thumbnails can’t be reused and can be only uploaded as a new file, so you can pass
   * “attach://<file_attach_name>” if the thumbnail was uploaded using
   * multipart/form-data under <file_attach_name>. [More info on Sending Files »](https://)core.telegram.org/bots/api#sending-files)
   */
  thumb?: Buffer | string;
  /**
   * Video caption (may also be used when resending videos by file_id), 0-1024 characters
   */
  caption?: string;
  /**
   * Send [Markdown](https://core.telegram.org/bots/api#markdown-style) or
   * [HTML](https://core.telegram.org/bots/api#html-style), if you want  apps to show
   * [bold, italic, fixed-width text or inline URLs](https://core.telegram.org/bots/api#formatting-options) in your bot's message.
   */
  parse_mode?: string;
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * Additional interface options. A JSON-serialized object for an
   * [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)
   * , [custom reply keyboard](https://core.telegram.org/bots#keyboards)
   * , instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?:
    | TelegramInlineKeyboardMarkup
    | TelegramReplyKeyboardMarkup
    | TelegramReplyKeyboardRemove
    | TelegramForceReply;
}

export interface TelegramSendVoiceParams extends TelegramChatId {
  /**
   * Video note to send. Pass a file_id as String to send a video note that exists on the  servers (recommended),
   * pass an HTTP URL as a String for  to get a file from the Internet,
   * or upload a new video using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   */
  video_note: Buffer | string;
  /**
   * Duration of sent video in seconds
   */
  duration?: number;
  /**
   * Video width and height, i.e. diameter of the video message
   */
  length?: number;
  /**
   * Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in
   * JPEG format and less than 200 kB in size. A thumbnail‘s width and height should not exceed 320. Ignored if the file is not
   * uploaded using multipart/form-data. Thumbnails can’t be reused and can be only uploaded as a new file, so you can pass
   * “attach://<file_attach_name>” if the thumbnail was uploaded using
   * multipart/form-data under <file_attach_name>. [More info on Sending Files »](https://)core.telegram.org/bots/api#sending-files)
   */
  thumb?: Buffer | string;
  /**
   * Send [Markdown](https://core.telegram.org/bots/api#markdown-style) or
   * [HTML](https://core.telegram.org/bots/api#html-style), if you want  apps to show
   * [bold, italic, fixed-width text or inline URLs](https://core.telegram.org/bots/api#formatting-options) in your bot's message.
   */
  parse_mode?: string;
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * Additional interface options. A JSON-serialized object for an
   * [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)
   * , [custom reply keyboard](https://core.telegram.org/bots#keyboards)
   * , instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?:
    | TelegramInlineKeyboardMarkup
    | TelegramReplyKeyboardMarkup
    | TelegramReplyKeyboardRemove
    | TelegramForceReply;
}

export interface TelegramSendMediaGroupParams extends TelegramChatId {
  /**
   * A JSON-serialized array describing photos and videos to be sent, must include 2–10 items
   */
  media: TelegramInputMediaPhoto[] | TelegramInputMediaVideo[];
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * If the messages are a reply, ID of the original message
   */
  reply_to_message_id?: number;
}

export interface TelegramSendLocationParams extends TelegramChatId {
  /**
   * Latitude of the location
   */
  latitude: number;
  /**
   * Longitude of the location
   */
  longitude: number;
  live_period?: number;
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * If the messages are a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * Additional interface options. A JSON-serialized object for an
   * [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)
   * , [custom reply keyboard](https://core.telegram.org/bots#keyboards)
   * , instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?:
    | TelegramInlineKeyboardMarkup
    | TelegramReplyKeyboardMarkup
    | TelegramReplyKeyboardRemove
    | TelegramForceReply;
}

export interface TelegramEditMessageLiveLocationParams {
  /**
   * Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target
   * channel (in the format `@channelusername`)
   */
  chat_id?: number | string;
  /**
   * Required if inline_message_id is not specified. Identifier of the message to edit
   */
  message_id?: number;
  /**
   * Required if chat_id and message_id are not specified. Identifier of the inline message
   */
  inline_message_id?: string;
  /**
   * Latitude of new location
   */
  latitude: number;
  /**
   * Longitude of new location
   */
  longitude: number;
  /**
   * A JSON-serialized object for a new [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   */
  reply_markup?: TelegramInlineKeyboardMarkup;
}

export interface TelegramStopMessageLiveLocationParams {
  /**
   * Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target
   * channel (in the format `@channelusername`)
   */
  chat_id?: number | string;
  /**
   * Required if inline_message_id is not specified. Identifier of the message to edit
   */
  message_id?: number;
  /**
   * Required if chat_id and message_id are not specified. Identifier of the inline message
   */
  inline_message_id?: string;
  /**
   * A JSON-serialized object for a new [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   */
  reply_markup?: TelegramInlineKeyboardMarkup;
}

export interface TelegramSendVenueParams extends TelegramChatId {
  /**
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id: number | string;
  /**
   * Latitude of the venue
   */
  latitude: number;
  /**
   * Longitude of the venue
   */
  longitude: number;
  /**
   * Name of the venue
   */
  title: string;
  /**
   * Address of the venue
   */
  address: string;
  /**
   * Foursquare identifier of the venue
   */
  foursquare_id?: string;
  /**
   * Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.)
   */
  foursquare_type?: string;
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * If the messages are a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * Additional interface options. A JSON-serialized object for an
   * [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)
   * , [custom reply keyboard](https://core.telegram.org/bots#keyboards)
   * , instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?:
    | TelegramInlineKeyboardMarkup
    | TelegramReplyKeyboardMarkup
    | TelegramReplyKeyboardRemove
    | TelegramForceReply;
}

export interface TelegramSendContactParams extends TelegramChatId {
  /**
   * Contact's phone number
   */
  phone_number: string;
  /**
   * Contact's first name
   */
  first_name: string;
  /**
   * Contact's last name
   */
  last_name?: string;
  /**
   * Additional data about the contact in the form of a [vCard](https://en.wikipedia.org/wiki/VCard), 0-2048 bytes
   */
  vcard?: string;
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * If the messages are a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * Additional interface options. A JSON-serialized object for an
   * [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)
   * , [custom reply keyboard](https://core.telegram.org/bots#keyboards)
   * , instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?:
    | TelegramInlineKeyboardMarkup
    | TelegramReplyKeyboardMarkup
    | TelegramReplyKeyboardRemove
    | TelegramForceReply;
}

export interface TelegramSendPollParams extends TelegramChatId {
  /**
   * Poll question, 1-255 characters
   */
  question: string;
  /**
   * List of answer options, 2-10 strings 1-100 characters each
   */
  options: string[];
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * If the messages are a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * Additional interface options. A JSON-serialized object for an
   * [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)
   * , [custom reply keyboard](https://core.telegram.org/bots#keyboards)
   * , instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?:
    | TelegramInlineKeyboardMarkup
    | TelegramReplyKeyboardMarkup
    | TelegramReplyKeyboardRemove
    | TelegramForceReply;
}

export interface TelegramSendChatActionParams extends TelegramChatId {
  /**
   * Type of action to broadcast. Choose one, depending on what the user is about to receive: typing for
   * [text messages](https://core.telegram.org/bots/api#sendmessage),
   * upload_photo for [photos](https://core.telegram.org/bots/api#sendphoto),
   * record_video or upload_video for [videos](https://core.telegram.org/bots/api#sendvideo),
   * record_audio or upload_audio for [audio files](https://core.telegram.org/bots/api#sendaudio),
   * upload_document for [general files](https://core.telegram.org/bots/api#senddocument),
   * find_location for [location data](https://core.telegram.org/bots/api#sendlocation),
   * record_video_note or upload_video_note for [video notes](https://core.telegram.org/bots/api#sendvideonote).
   */
  action: string;
}

export interface TelegramGetUserProfilePhotosParams {
  /**
   * Unique identifier of the target user
   */
  user_id: number;
  /**
   * Sequential number of the first photo to be returned. By default, all photos are returned.
   */
  offset?: number;
  /**
   * Limits the number of photos to be retrieved. Values between 1—100 are accepted. Defaults to 100.
   */
  limit?: number;
}

export interface TelegramGetFileParams {
  /**
   * File identifier to get info about
   */
  file_id: string;
}

export interface TelegramKickChatMemberParams
  extends TelegramUnbanChatMemberParams {
  /**
   * Date when the user will be unbanned, unix time. If user is banned for more than 366 days or
   * less than 30 seconds from the current time they are considered to be banned forever
   */
  until_date?: number;
}

export interface TelegramUnbanChatMemberParams extends TelegramChatId {
  /**
   * Unique identifier of the target user
   */
  user_id: number;
}

export interface TelegramRestrictChatMemberParams
  extends TelegramKickChatMemberParams {
  /**
   * Pass True, if the user can send text messages, contacts, locations and venues
   */
  can_send_messages?: boolean;
  /**
   * Pass True, if the user can send audios, documents, photos, videos, video notes and voice notes, implies can_send_messages
   */
  can_send_media_messages?: boolean;
  /**
   * Pass True, if the user can send animations, games, stickers and use inline bots, implies can_send_media_messages
   */
  can_send_other_messages?: boolean;
  /**
   * Pass True, if the user may add web page previews to their messages, implies can_send_media_messages
   */
  can_add_web_page_previews?: boolean;
}

export interface TelegramPromoteChatMemberParams
  extends TelegramUnbanChatMemberParams {
  /**
   * Pass True, if the administrator can change chat title, photo and other settings
   */
  can_change_info?: boolean;
  /**
   * Pass True, if the administrator can create channel posts, channels only
   */
  can_post_messages?: boolean;
  /**
   * Pass True, if the administrator can edit messages of other users and can pin messages, channels only
   */
  can_delete_message?: boolean;
  /**
   * Pass True, if the administrator can delete messages of other users
   */
  can_edit_messages?: boolean;
  /**
   * Pass True, if the administrator can invite new users to the chat
   */
  can_invite_users?: boolean;
  /**
   * Pass True, if the administrator can restrict, ban or unban chat members
   */
  can_restrict_members?: boolean;
  /**
   * Pass True, if the administrator can pin messages, supergroups only
   */
  can_pin_messages?: boolean;
  /**
   * Pass True, if the administrator can add new administrators with a subset of his own privileges or demote administrators
   * that he has promoted, directly or indirectly (promoted by administrators that were appointed by him)
   */
  can_promote_members?: boolean;
}

export interface TelegramExportChatInviteLinkParams extends TelegramChatId {}

export interface TelegramSetChatPhotoParams extends TelegramChatId {
  /**
   * New chat photo, uploaded using multipart/form-data
   */
  photo: Buffer;
}

export interface TelegramDeleteChatPhotoParams extends TelegramChatId {}

export interface TelegramSetChatTitleParams extends TelegramChatId {
  /***
   * New chat title, 1-255 characters
   */
  title: string;
}

export interface TelegramSetChatDescriptionParams extends TelegramChatId {
  /**
   * New chat description, 0-255 characters
   */
  description?: string;
}

export interface TelegramPinChatMessageParams extends TelegramChatId {
  /**
   * Identifier of a message to pin
   */
  message_id: number;
  /**
   * Pass True, if it is not necessary to send a notification to all chat members about the new pinned message.
   * Notifications are always disabled in channels.
   */
  disable_notifications?: boolean;
}

export interface TelegramUnpinChatMessageParams extends TelegramChatId {
  /**
   * Identifier of a message to pin
   */
  message_id: number;
}

export interface TelegramLeaveChatParams extends TelegramChatId {}

export interface TelegramGetChatParams extends TelegramChatId {}

export interface TelegramGetChatAdministratorsParams extends TelegramChatId {}

export interface TelegramGetChatMembersCountParams extends TelegramChatId {}

export interface TelegramGetChatMemberParams extends TelegramChatId {
  /**
   * Unique identifier of the target user
   */
  user_id: number;
}

export interface TelegramSetChatStickerSetParams extends TelegramChatId {
  /**
   * Name of the sticker set to be set as the group sticker set
   */
  sticker_set_name: string;
}

export interface TelegramChatDeleteStickerSetParams extends TelegramChatId {}

export interface TelegramAnswerCallbackQueryParams {
  /**
   * Unique identifier for the query to be answered
   */
  callback_query_id: string;
  /**
   * Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters
   */
  text?: string;
  /**
   * If true, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to false.
   */
  show_alert?: boolean;
  /**
   * URL that will be opened by the user's client. If you have created a [Game](https://core.telegram.org/bots/api#game) and accepted
   * the conditions via [@Botfather](https://t.me/botfather),
   * specify the URL that opens your game – note that this will only work if the query comes from a
   * [callback_game](https://core.telegram.org/bots/api#inlinekeyboardbutton) button.
   *
   * Otherwise, you may use links like `t.me/your_bot?start=XXXX` that open your bot with a parameter.
   */
  show_url?: string;
  /**
   * The maximum amount of time in seconds that the result of the callback query may be cached client-side.
   *  apps will support caching starting in version 3.14. Defaults to 0.
   */
  cache_time?: number;
}

interface TelegramEditMessageId {
  /**
   * Required if inline_message_id is not specified.
   * Unique identifier for the target chat or username of the target channel (in the format `@channelusername`)
   */
  chat_id?: number | string;
  /**
   * Required if inline_message_id is not specified. Identifier of the message to edit
   */
  message_id?: number;
  /**
   * Required if chat_id and message_id are not specified. Identifier of the inline message
   */
  inline_message_id?: string;
}

export interface TelegramEditMessageTextParams extends TelegramEditMessageId {
  /**
   * 	New text of the message
   */
  text: string;
  /**
   * Send[Markdown](https://core.telegram.org/bots/api#markdown-style) or [HTML](https://core.telegram.org/bots/api#html-style),
   * if you want  apps to show
   * [bold, italic, fixed-width text or inline URLs](https://core.telegram.org/bots/api#formatting-options) in your bot's message.
   */
  parse_mode?: string;
  /**
   * Disables link previews for links in this message
   */
  disable_web_page_view?: boolean;
  /**
   * A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   */
  reply_markup?: TelegramInlineKeyboardMarkup;
}

export interface TelegramEditMessageCaptionParams
  extends TelegramEditMessageId {
  /**
   * New caption of the message
   */
  caption?: string;
  /**
   * Send[Markdown](https://core.telegram.org/bots/api#markdown-style) or [HTML](https://core.telegram.org/bots/api#html-style),
   * if you want  apps to show
   * [bold, italic, fixed-width text or inline URLs](https://core.telegram.org/bots/api#formatting-options) in your bot's message.
   */
  parse_mode?: string;
  /**
   * A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   */
  reply_markup?: TelegramInlineKeyboardMarkup;
}

export interface TelegramEditMessageMediaParams extends TelegramEditMessageId {
  /**
   * A JSON-serialized object for a new media content of the message
   */
  media: TelegramInputMedia;
  /**
   * A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   */
  reply_markup?: TelegramInlineKeyboardMarkup;
}

export interface TelegramEditMessageReplyMarkupParams
  extends TelegramEditMessageId {
  /**
   * A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   */
  reply_markup?: TelegramInlineKeyboardMarkup;
}

export interface TelegramStopPollParams extends TelegramChatId {
  /**
   * Identifier of the original message with the poll
   */
  message_id: number;
  /**
   * A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   */
  reply_markup?: TelegramInlineKeyboardMarkup;
}

export interface TelegramDeleteMessageParams extends TelegramChatId {
  /**
   * Identifier of the message to delete
   */
  message_id: number;
}

export interface TelegramSendStickerParams extends TelegramChatId {
  /**
   * Sticker to send. Pass a file_id as String to send a file that exists on the  servers (recommended),
   * pass an HTTP URL as a String for  to get a .webp file from the Internet, or upload a new one
   * using multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   */
  sticker: Buffer | string;
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * If the messages are a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * Additional interface options. A JSON-serialized object for an
   * [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating)
   * , [custom reply keyboard](https://core.telegram.org/bots#keyboards)
   * , instructions to remove reply keyboard or to force a reply from the user.
   */
  reply_markup?:
    | TelegramInlineKeyboardMarkup
    | TelegramReplyKeyboardMarkup
    | TelegramReplyKeyboardRemove
    | TelegramForceReply;
}

export interface TelegramGetStickerSetParams {
  /**
   * Name of the sticker set
   */
  name: string;
}

export interface TelegramUploadStickerFileParams {
  /**
   * User identifier of sticker file owner
   */
  user_id: number;
  /**
   * ***Png* image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px,
   * and either width or height must be exactly 512px. [More info on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   */
  png_sticker: Buffer;
}

export interface TelegramCreateNewStickerSetParams {
  /**
   * User identifier of created sticker set owner
   */
  user_id: number;
  /**
   * Short name of sticker set, to be used in `t.me/addstickers/` URLs (e.g., animals). Can contain only english letters,
   * digits and underscores. Must begin with a letter, can't contain consecutive underscores and must end in
   * “_by_<bot username>”. <bot_username> is case insensitive. 1-64 characters.
   */
  name: string;
  /**
   * Sticker set title, 1-64 characters
   */
  title: string;
  /**
   * **Png** image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px, and
   * either width or height must be exactly 512px. Pass a file_id as a String to send a file that already exists on the
   *  servers, pass an HTTP URL as a String for  to get a file from the Internet, or upload a new one using
   * multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   */
  png_sticker: Buffer | string;
  /**
   * One or more emoji corresponding to the sticker
   */
  emojis: string;
  /**
   * Pass True, if a set of mask stickers should be created
   */
  contains_masks?: boolean;
  /**
   * A JSON-serialized object for position where the mask should be placed on faces
   */
  mask_position?: TelegramMaskPosition;
}

export interface TelegramAddStickerToSetParams {
  /**
   * User identifier of sticker set owner
   */
  user_id: number;
  /**
   * Sticker set name
   */
  name: string;
  /**
   * **Png** image with the sticker, must be up to 512 kilobytes in size, dimensions must not exceed 512px, and
   * either width or height must be exactly 512px. Pass a file_id as a String to send a file that already exists on the
   *  servers, pass an HTTP URL as a String for  to get a file from the Internet, or upload a new one using
   * multipart/form-data. [More info on Sending Files »](https://core.telegram.org/bots/api#sending-files)
   */
  png_sticker: Buffer | string;
  /**
   * One or more emoji corresponding to the sticker
   */
  emojis: string;
  /**
   * A JSON-serialized object for position where the mask should be placed on faces
   */
  mask_position?: TelegramMaskPosition;
}

export interface TelegramSetStickerPositionInSetParams {
  /**
   * File identifier of the sticker
   */
  sticker: string;
  /**
   * new sticker position in the set, zero-based
   */
  position: number;
}

export interface TelegramDeleteStickerFromSetParams {
  /**
   * File identifier of the sticker
   */
  sticker: string;
}

export interface TelegramSendInvoiceParams extends TelegramChatId {
  /**
   * Product name, 1-32 characters
   */
  title: string;
  /**
   * 	Product description, 1-255 characters
   */
  description: string;
  /**
   * Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use for your internal processes.
   */
  payload: string;
  /**
   * Payments provider token, obtained via [Botfather](https://t.me/botfather)
   */
  provider_token: string;
  /**
   * Unique deep-linking parameter that can be used to generate this invoice when used as a start parameter
   */
  start_parameter: string;
  /**
   * Three-letter ISO 4217 currency code, see [more on currencies](https://core.telegram.org/bots/payments#supported-currencies)
   */
  currency: string;
  /**
   * Price breakdown, a list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.)
   */
  prices: TelegramLabeledPrice[];
  /**
   * JSON-encoded data about the invoice, which will be shared with the payment provider. A detailed description of
   * required fields should be provided by the payment provider.
   */
  provider_data?: string;
  /**
   * URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service.
   * People like it better when they see what they are paying for.
   */
  photo_url?: string;
  /**
   * Photo size
   */
  photo_size?: number;
  /**
   * Photo width
   */
  photo_width?: number;
  /**
   * Photo height
   */
  photo_height?: number;
  /**
   * Pass True, if you require the user's full name to complete the order
   */
  need_name?: boolean;
  /**
   * Pass True, if you require the user's phone number to complete the order
   */
  need_phone_number?: boolean;
  /**
   * Pass True, if you require the user's email address to complete the order
   */
  need_email?: boolean;
  /**
   * Pass True, if you require the user's shipping address to complete the order
   */
  need_shipping_address?: boolean;
  /**
   * Pass True, if user's phone number should be sent to provider
   */
  send_phone_number_to_provider?: boolean;
  /**
   * Pass True, if user's email address should be sent to provider
   */
  send_email_to_provider?: boolean;
  /**
   * Pass True, if the final price depends on the shipping method
   */
  is_flexible?: boolean;
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   * If empty, one 'Pay total price' button will be shown. If not empty, the first button must be a Pay button.
   */
  reply_markup?: TelegramInlineKeyboardMarkup;
}

export interface TelegramAnswerShippingQueryParams {
  /**
   * Unique identifier for the query to be answered
   */
  shipping_query_id: string;
  /**
   * Specify True if delivery to the specified address is possible and False if there are any problems
   * (for example, if delivery to the specified address is not possible)
   */
  ok: boolean;
  /**
   * Required if ok is True. A JSON-serialized array of available shipping options.
   */
  shipping_options?: TelegramShippingOption[];
  /**
   * Required if ok is False. Error message in human readable form that explains why it is impossible to complete
   * the order (e.g. "Sorry, delivery to your desired address is unavailable').  will display this message to the user.
   */
  error_message?: string;
}

export interface TelegramAnswerPreCheckoutQueryParams {
  /**
   * Unique identifier for the query to be answered
   */
  pre_checkout_query_id: string;
  /**
   * Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order.
   * Use False if there are any problems.
   */
  ok: boolean;
  /**
   * Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the
   * checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your
   * payment details. Please choose a different color or garment!").  will display this message to the user.
   */
  error_message?: string;
}

export interface TelegramSendGameParams extends TelegramChatId {
  /**
   * Short name of the game, serves as the unique identifier for the game. Set up your games via [Botfather](https://t.me/botfather).
   */
  game_short_name: string;
  /**
   * Sends the message [silently](https://telegram.org/blog/channels-2-0#silent-messages). Users will receive a notification with no sound.
   */
  disable_notification?: boolean;
  /**
   * If the message is a reply, ID of the original message
   */
  reply_to_message_id?: number;
  /**
   * 	A JSON-serialized object for an [inline keyboard](https://core.telegram.org/bots#inline-keyboards-and-on-the-fly-updating).
   * If empty, one ‘Play game_title’ button will be shown. If not empty, the first button must launch the game.
   */
  reply_markup?: TelegramInlineKeyboardMarkup;
}

export interface TelegramSetGameScoreParams {
  /**
   * User identifier
   */
  user_id: number;
  /**
   * New score, must be non-negative
   */
  score: number;
  /**
   * Pass True, if the high score is allowed to decrease. This can be useful when fixing mistakes or banning cheaters
   */
  force?: boolean;
  /**
   * Pass True, if the game message should not be automatically edited to include the current scoreboard
   */
  disable_edit_message?: boolean;
  /**
   * Required if inline_message_id is not specified. Unique identifier for the target chat
   */
  chat_id?: number;
  /**
   * Required if inline_message_id is not specified. Identifier of the sent message
   */
  message_id?: number;
  /**
   * Required if chat_id and message_id are not specified. Identifier of the inline message
   */
  inline_message_id?: string;
}

export interface TelegramGetGameHighScoreParams {
  /**
   * Target user id
   */
  user_id: number;
  /**
   * Required if inline_message_id is not specified. unique identifier for the target chat
   */
  chat_id?: number;
  /**
   * Required if inline_message_id is not specified. Identifier of the sent message
   */
  message_id?: number;
  /**
   * Required if chat_id and message_id are not specified. Identifier of the inline message
   */
  inline_message_id?: string;
}
