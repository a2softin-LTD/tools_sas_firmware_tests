import { faker } from "@faker-js/faker";

export enum UIErrorMessages {
    WRONG_CREDENTIALS = 'Wrong login or password',
    INCORRECT_EMAIL_ADDRESS = 'Incorrect email address format.',
    REQUIRED_FIELD = 'Required field',
}

export const TIMEOUT: number = 2400;

export const PAUSE: number = 60000;

export const PAUSE_BETWEEN_REACTION_CREATION: number = 1000;

export const EMAIL_NECESSARY_NAME_PART: string = 'sastest2398';

export const USER_FULL_FIRST: string = '01 | Дмитро | snaut12@gmail.com';

export const USER_FULL_SECOND: string = '01 | Дмитро | valera123gmail.com';

export const USER_SHORT_FIRST: string = 'Дмитро | snaut12@gmail.com';

export const USER_SHORT_SECOND: string = '01 | Петро ';

export const USER_EMAIL: string = 'snaut12@gmail.com';

export const USER_PASSWORD_FIRST: string = 'asdASD123';

export const USER_PASSWORD_NOR_VALID: string = '!';

export const USER_EMAIL_SECOND: string = 'd.pinchuk@itvsystems.com.ua';

export const USER_EMAIL_THIRD: string = 'andrianaslobozheniuk+10@gmail.com';

export const USER_EMAIL_NOT_VALID: string = 'user@user';

export const USER_EMAIL_NON_REGISTERED: string = 'valera123gmail.com';

export const DEALER_EMAIL_SECOND: string = 'Test dealer role (andriana99+77@gmail.com)';

export const DEALER_EMAIL_SECOND_SHORT: string = 'andriana99+77@gmail.com';

export const DEALER_EMAIL_FIRST: string = 'Дмитро Федорів (snaut12@bigmir.net)';

export const DEALER_EMAIL_FIRST_SHORT: string = 'snaut12@bigmir.net';

export const GROUP_NAME_FIRST: string = 'Група номер один';

export const USER_NAME: string = 'Дмитро';

export const USER_NAME_FULL: string = 'Дмитро Анатольович Пінчук';

export const USER_NAME_NEW: string = 'Петро';

export const USER_NAME_OLD: string = 'Дмитро';

export const USER_NAME_MON_ADMIN_NEW: string = 'Іван';

export const USER_NAME_MON_ADMIN_OLD: string = 'Володимир';

export const USER_NAME_SER_ADMIN_NEW: string = 'Степан';

export const USER_NAME_SER_ADMIN_OLD: string = 'Дмитро';

export const USER_NAME_63_SYMBOLS: string = 'ПетроПетровичПетренкоПетровПетровичПетровичПетровПетров';

export const USER_NAME_67_SYMBOLS: string = 'ПетроПетровичПетренкоПетровПетровичПетровичПетровПетровПетровПетров';

export const USER_NAME_LATIN: string = 'John Doe';

export const USER_NAME_CYRILLIC: string = 'Андрій Давиденко';

export const USER_NAME_SPECIAL_SYMBOLS: string = '"J0hn#D0e$%';

export const USER_NAME_JAPAN: string = '山田太郎';

export const USER_NAME_ARABIC: string = 'محمد أحمد';

export const USER_NAME_TURKISH: string = 'Çağrı Güneş';

export const USER_PHONE_NEW: string = '+380508888888';

export const USER_PHONE_OLD: string = '+380507777777';

export const USER_PHONE_NEW_MS_ADMIN: string = '+380509999999';

export const USER_PHONE_OLD_MS_ADMIN: string = '+380501111111';

export const USER_PHONE_MON_ADMIN_NEW: string = '+380509999444';

export const USER_PHONE_MON_ADMIN_OLD: string = '+380501111444';

export const USER_PHONE_SER_ADMIN_NEW: string = '+380509999555';

export const USER_PHONE_SER_ADMIN_OLD: string = '+380674567890';

export const SUPER_ADMIN_NAME_NEW: string = 'Петро';

export const SUPER_ADMIN_NAME_OLD: string = '1111';

export const SUPER_ADMIN_PHONE_NEW: string = '+380508888888';

export const SUPER_ADMIN_PHONE_OLD: string = '+35896894';

export const DEALER_NAME_NEW: string = 'Дмитро';

export const EMPLOYEE_NAME: string = 'New Engineer';

export const EMPLOYEE_EMAIL: string = 'andriana99+8@gmail.com';

export const DEALER_NAME_OLD: string = 'ITV Dealer';

export const DEALER_PHONE_NEW: string = '+38050777777';

export const DEALER_PHONE_OLD: string = '+380674555555';

export const DEALER_1_NAME_NEW: string = 'Петро Петрів';

export const DEALER_1_NAME_OLD: string = 'Дмитро Федорів';

export const DEALER_1_PHONE_NEW: string = '+380509999999';

export const DEALER_1_PHONE_OLD: string = '+380674555566';

export const MANAGER_1_NAME_NEW: string = 'Петро Петр';

export const MANAGER_1_NAME_OLD: string = 'Test Manager User 28';

export const MANAGER_1_PHONE_NEW: string = '+380509998888';

export const MANAGER_1_PHONE_OLD: string = '+380674555577';

export const ENGINEER_NAME_NEW: string = 'Петренко';

export const ENGINEER_NAME_OLD: string = 'AQA_ENGINEER';

export const ENGINEER_PHONE_NEW: string = '+380509992222';

export const ENGINEER_PHONE_OLD: string = '+380674555522';

export const USER_PASSWORD_NEW: string = 'lepidoptera111278DAP!';

export const USER_PASSWORD_OLD: string = 'lepidoptera111278DAP!@#';

export const USER_LANGUAGE_FOR_EMAIL_OLD: string = 'English';

export const USER_LANGUAGE_FOR_EMAIL_NEW: string = 'French';

export const USER_LANGUAGE_SHORT_OLD: string = 'EN';

export const USER_LANGUAGE_SHORT_NEW: string = 'FR';

export const GROUP_NAME_LATIN: string = 'Emerald Valley Retreat';

export const GROUP_NAME_CYRILLIC: string = 'Сонячна Долина Карпат';

export const GROUP_NAME_SPECIAL_SYMBOLS: string = 'Misty#Peak@Mountain&Zone';

export const GROUP_NAME_JAPAN: string = '静かな森の隠れ里の秘密';

export const GROUP_NAME_ARABIC: string = 'واحة الرمال الذهبية السرية';

export const GROUP_NAME_TURKISH: string = 'Büyülü Orman Kıyısı Yeri';

export const GROUP_NAME_KOREAN: string = '비밀의 푸른 계곡 은신처';

export const GROUP_NAME_CHINESE: string = '神秘的山谷隱藏的寶藏';

export const GROUP_NAME_GREEK: string = 'Χρυσή Αετού Κορυφή';

export const COMPANY_EMAIL_NEW: string = 'dmytro@ukr.net';

export const COMPANY_SERVICE_EMAIL_OLD: string = 'asiarh45@ukr.net';

export const COMPANY_MONITORING_EMAIL_OLD: string = 'd.pinchuk+002@itvsystems.com.ua';

export const COMPANY_MONITORING_SERVICE_EMAIL_OLD: string = 'd.pinchuk+003@itvsystems.com.ua';

export const COMPANY_PHONE_NEW: string = '+380508888888';

export const COMPANY_PHONE_OLD: string = '+3805066789089';

export const COMPANY_MONITORING_PHONE_OLD: string = '+380971344443';

export const COMPANY_MONITORING_SERVICE_PHONE_OLD: string = '+380971344443';

export const COMPANY_MONITORING_SERVICE_NAME_NEW: string = 'АКВА компанія';

export const COMPANY_MONITORING_SERVICE_DESCRIPTION_NEW: string = 'нова компанія';

export const COMPANY_MONITORING_SERVICE_CONTACTS_NEW: string = 'дпинчук';

export const COMPANY_MONITORING_SERVICE_NAME_OLD: string = 'AQA_MONITORING_SERVICE_COMPANY';

export const COMPANY_MONITORING_SERVICE_DESCRIPTION_OLD: string = 'AQA TEST';

export const COMPANY_MONITORING_SERVICE_CONTACTS_OLD: string = 'dpinchuk';

export const COMPANY_SERVICE_NAME_NEW: string = 'NEW IMAGE';

export const COMPANY_SERVICE_DESCRIPTION_NEW: string = 'support@u-prox.systems';

export const COMPANY_SERVICE_CONTACTS_NEW: string = 'Lviv, Ukraine';

export const COMPANY_SERVICE_NAME_OLD: string = 'UIR_SERVICE_BEST';

export const COMPANY_SERVICE_DESCRIPTION_OLD: string = 'Обслуговуюча компанія №1463474';

export const COMPANY_SERVICE_CONTACTS_OLD: string = 'Севастополь, Україна';

export const COMPANY_MONITORING_NAME_NEW: string = 'АКВА компанія';

export const COMPANY_MONITORING_DESCRIPTION_NEW: string = 'нова компанія';

export const COMPANY_MONITORING_CONTACTS_NEW: string = 'дпинчук';

export const COMPANY_MONITORING_NAME_OLD: string = 'AQA COMPANY';

export const COMPANY_MONITORING_DESCRIPTION_OLD: string = 'AQA TEST';

export const COMPANY_MONITORING_CONTACTS_OLD: string = 'dpinchuk';

export const COMPANY_SERVICE_PHONE_OLD: string = '+380678974567';

export const COMPANY_MONITORING_SERVICE_EMAIL_FIRST: string = 'zajac@ukr.net';

export const CODE_FIRST: string = '1111';

export const CODE_SECOND: string = '123456';

export const CODE_THIRD: string = '111222'

export const CODE_FOURTH: string = '111223'

export const CODE_FIFTH: string = '1234'

export const CODE_SIXTH: string = '1235'

export const CODE_HIDE: string = '******';

export const SETTING_SHOW_IN_ADS: string = 'Shown in ADS';

export const LANGUAGE_UKRAINIAN: string = 'Ukrainian';

export const LANGUAGE_FRENCH: string = 'French';

export const LANGUAGE_ENGLISH_SHORT: string = 'EN';

export const LANGUAGE_ENGLISH: string = 'English';

export const LANGUAGE_DUTCH: string = 'Dutch';

export const LANGUAGE_FRENCH_SHORT: string = 'FR';

export const LANGUAGE_FRENCH_UKR: string = 'Французька';

export const LANGUAGE_GREEK: string = 'Greek';

export const LANGUAGE_GREEK_UKR: string = 'Грецька';

export const HUB_SERIAL_NUMBER_TRUE_FIRST: string = '00:08:9B:10:0B:EB';

export const HUB_SERIAL_NUMBER_TRUE_SECOND: string = '00:08:B7:FE:33:1C | MPX';

export const HUB_SERIAL_NUMBER_TRUE_THIRD: string = '00:08:B7:10:02:04';

export const HUB_SERIAL_NUMBER_TRUE_FOURTH: string = '00:08:B7:FF:00:04';

export const HUB_SERIAL_NUMBER_TRUE_FIFTH: string = '00:08:B7:FF:00:04';

export const HUB_SERIAL_NUMBER_TRUE_SIX: string = '00:08:B7:10:06:07';

export const HUB_SERIAL_NUMBER_TRUE_SEVENTH: string = '00:08:B7:FE:33:20';

export const HUB_SERIAL_NUMBER_TRUE_EIGHT: string = '00:08:9B:20:06:72';

export const HUB_SERIAL_NUMBER_TRUE_NINTH: string = '00:08:B7:20:01:CC';

export const HUB_SERIAL_NUMBER_FALSE_FIRST: string = '56:08:B7:10:02:44';

export const HUB_SERIAL_NUMBER_FALSE_SECOND: string = '00:08:B7:10:02:04';

export const ROLE_MONITORING_SERVICE_COMPANIES: string = 'Monitoring-service companies';

export const ROLE_MONITORING_COMPANIES: string = 'Monitoring companies';

export const ROLE_MONITORING_COMPANY: string = 'Monitoring company';

export const ROLE_SERVICE_COMPANIES: string = 'Service companies';

export const COMPANY_FIRST: string = 'AVL TEST';

export const COMPANY_SIX: string = 'UIR_SERVICE_BEST';

export const COMPANY_SEVEN: string = 'Ильяшенко';

export const COMPANY_SECOND: string = 'Сиротин';

export const COMPANY_THIRD: string = 'Handcrafted Concrete Mouse';

export const COMPANY_FOURTH: string = 'QA- company-1';

export const COMPANY_FIFTH: string = 'AQA_MONITORING_SERVICE_COMPANY';

export const ADMIN_EMAIL: string = 'user@user.com';

export const HUB_ACCOUNT_NAME: string = '331C';

export const HUB_ACCOUNT_NAME_FIRST: string = '1112';

export const HUB_ACCOUNT_NAME_SECOND: string = '3320';

export const HUB_ACCOUNT_NAME_THIRD: string = '1234';

export const HUB_ACCOUNT_NAME_FULL: string = '331c - AVL TEST ';

export const HUB_NAME_FIRST: string = 'PIN@dev';

export const HUB_NAME_SECOND: string = 'Os-au';

export const HUB_NAME_THIRD: string = 'PIN@devNew';

export const HUB_NAME_FOURTH: string = 'Test Dev for Andriana';

export const HUB_NAME_FIFTH: string = 'VVB';

export const HUB_NAME_SIX: string = 'just-do-it-once';

export const HUB_NAME_SEVENTH: string = 'MPX LE 00:7C';

export const TITLE_COMPANIES: string = 'Companies:';

export const TITLE_COMPANIES_: string = 'Companies';

export const TITLE_SPECIAL_SETTINGS: string = 'Special settings';

export const TITLE_USERS: string = 'Users';

export const TITLE_GROUPS_OF_COMPANIES: string = 'Groups of companies';

export const TITLE_GROUP_OF_COMPANIES: string = 'Group of companies';

export const COUNTRY_UKRAINE: string = 'Ukraine';

export const COUNTRY_UKRAINE_SHORT: string = 'Ukr';

export const COUNTRY_MOLDOVA: string = 'Moldova';

export const COUNTRY_MOLDOVA_SHORT: string = 'Mol';

export const COUNTRY_ALGERIA: string = 'Algeria';

export const COUNTRY_AUSTRALIA: string = 'Australia';

export const CABINET_FIRST: string = 'https://qwerty.com';

export const CABINET_SECOND: string = 'https://qwertynew.com';

export const TEXT_ENTER_THE_LINK: string = 'Enter the link to the user\'s account';

export const TEXT_DACH_CAPS: string = 'DACH';

export const TEXT_CHANGE_COMPANY_DEALER: string = 'Change company dealer';

export const TEXT_SELECT_LANGUAGE: string = 'Select the language in which you want to receive emails.';

export const TEXT_NUMBER_OF_DEVICES_IM_COMPANY: string = 'Number of devices in the company';

export const TEXT_SAVE_IN_XLS: string = 'Save in XLS';

export const TEXT_SERIAL_NUMBER_WRONG_FORMAT: string = 'Serial number in wrong format';

export const TEXT_SERIAL_NUMBER_ALREADY_ADDED: string = ' The device is already attached to another account ';

export const TITLE_UPDATE_FIRMWARE_VERSION: string = 'Update firmware version';

export const ENGINEER_EMAIL: string = 'jan.macao@gmail.com';

export const TEXT_OK: string = 'OK';

export const TEXT_ENGINEER_MODE_SECONDS_LEFT: string = 'Engineer mode seconds left:';

export const TITLE_SYSTEM: string = 'System';

export const TITLE_GROUPS: string = 'Groups';

export const TITLE_GROUPS_: string = 'Groups:';

export const TEXT_ADD_GROUP: string = 'Add group';

export const TEXT_EDIT_GROUP: string = 'Edit group';

export const TEXT_ENTER_GROUP_NAME: string = 'Enter group name';

export const TEXT_REMOVED_USER: string = 'Removed user';

export const TEXT_ADDED_NEW_USER: string = 'Added new user';

export const TEXT_SAVE_IN__XLS: string = 'Save in .XLS';

export const TEXT_DEVICE_BATTERY_STATISTICS: string = 'Device battery statistic';

export const TEXT_CHANGES_SAVED_SUCCESSFULLY: string = 'Changes saved successfully';

export const TEXT_BY_NAME: string = 'By name';

export const TEXT_BY_SERIAL_NUMBER: string = 'By serial number';

export const TEXT_BY_ACCOUNT: string = 'By account';

export const TEXT_ALL_PANELS: string = 'All panels';

export const PANEL_STATE_OUTDATED_FIRMWARE_VERSION: string = 'Outdated firmware version';

export const TITLE_ALL_PANELS: string = 'All panels';

export const BUTTON_TRANSFER_OWNERSHIP: string = 'Transfer ownership';

export const BUTTON_ADD_WIRELESS_DEVICE: string = 'Add wireless device';

export const BUTTON_DELETE_USER: string = 'Delete user';

export const BUTTON_ADD_USER: string = 'Add user';

export const TITLE_MY_PROFILE: string = 'My profile';

export const TITLE_MY_PROFILE_FRENCH: string = 'Mon profil';

export const SUPPORT_EMAIL: string = 'support@u-prox.systems';

export const SUPPORT_TEXT: string = 'You can send your question or message to the technical support service at:';

export const PASSWORD_TEXT: string = 'The password must be at least 8 characters, contain numbers and, at least, one uppercase and one lowercase letter';

export const BUTTON_RESTART_PANEL: string = 'Restart panel';

export const ROLE_MANAGER: string = 'Manager';

export const TITLE_EMPLOYEES: string = 'Employees';

export const TITLE_COMPANY_SETTINGS: string = 'Company settings';

export const TITLE_COMPANY_SETTINGS_FRENCH: string = 'Réglages société ';

export const TITLE_TECHNICAL_SUPPORT: string = 'Technical support';

export const TEXT_SHOW_CONFIGURATION: string = 'Show configuration';

export const TEXT_SEARCH_RESULT: string = 'Search result for d.pinchuk@itvsystems.com.ua';

export const TITLE_PANEL_OR_SENSOR_SERIAL: string = 'Panel or Sensor serial';

export const TEXT_SEARCH_FOR_ONE_OF_OPTIONS: string = 'Search for one of the options';

export const TEXT_TEST_DEALER_ROLE: string = 'Test dealer role (andriana99+77@gmail.com)';

export const TEXT_NO: string = 'no';

export const TEXT_ABSENT: string = 'absent';

export const SETTINGS_BLOCKED: string = 'Blocked';

export const TITLE_PANEL_FIRMWARE_VERSIONS: string = 'Panel firmware versions';

export const TITLE_CONSOLE_FIRMWARE_VERSIONS: string = 'Console application firmware versions';

export const TEXT_DELETING_VERSION: string = 'Deleting version';

export const TEXT_VERSION_CODE: string = 'Version code';

export const TEXT_VERSION_TYPE: string = 'Version type';

export const TEXT_FTP_LINK: string = 'ftp-link';

export const TEXT_FILENAME: string = 'Filename';

export const TEXT_DEVICE_TYPE: string = 'Device type';

export const TEXT_DEPLOY_PERCENTAGE: string = 'Deploy percentage';

export const TEXT_CHANNEL: string = 'Channel';

export const VERSION_CODE_FIRST: string = '2279';

export const VERSION_CODE_SECOND: string = '2.22.15';

export const VERSION_NAME_FIRST: string = '22.79';

export const TITLE_HISTORY_FOR_ALL_PANELS: string = 'History for all panels';

export const TEXT_REMOVE_USER_EMAIL: string = 'Remove user email';

export const TEXT_USER_LOGGED_IN: string = 'User logged in';

export const TEXT_DEVICE_ADJUST_NOT_ALLOWED: string = 'Device adjust not allowed for user ';


export const TEXT_USER_NO_EVENTS: string = 'No events for specified filters.';

export const TEXT_ALL_ROLES: string = 'All roles';

export const TEXT_YES: string = 'Yes';

export const TEXT_ENABLED: string = 'Enabled';

export const TEXT_DISABLED: string = 'Disabled';

export const ROLE_SYS_ADMIN_SMALL: string = 'system_admin';

export const ROLE_DEALER: string = 'dealer';

export const ROLE_SYS_ADMIN_BIG: string = 'Sysadmin';

export const ROLE_SUPPORT_ADMIN_BIG: string = 'Tech Support';

export const ROLE_SUPPORT_ADMIN_SMALL: string = 'support';

export const TEXT_BLOCK_EMPLOYEE: string = 'Block employee';

export const TEXT_EDIT_ADDITIONAL_INFO: string = 'Edit additional information';

export const TITLE_NODES: string = 'Panel Server nodes | Panels :';

export const BUTTON_DEPLOY_NEW_NODE: string = 'Deploy new node';

export const ENGINEER_NUMBER_START: string = '(1)';

export const ENGINEER_NUMBER_FINAL: string = '(2)';

export const TEXT_PANEL_INFORMATION: string = 'Panel information';

export const CITY_POLTAVA: string = 'Poltava';

export const CITY_DNIPRO: string = 'Dnipro';

export const CITY_MADRID: string = 'Madrid';

export const NUMBER_12: string = '12';

export const NUMBER_28: string = '28';

export const NUMBER_45: string = '45';

export const NUMBER_7: string = '7';

export const TEXT_ADRESS: string = 'Sinna, 45, 7';

export const BUTTON_CREATE_SCHEDULE: string = 'Create schedule';

export const TEXT_FIRST_REACTION: string = 'First reaction';

export const TEXT_64_SYMBOLS_REACTION_NAME: string = 'Petrovich1Petrovich1Petrovich1Petrovich1Petrovich1Petrovich1Petr';

export const TEXT_63_SYMBOLS_REACTION_NAME: string = 'Petrovich1Petrovich1Petrovich1Petrovich1Petrovich1Petrovich1Pe';

export const TEXT_SECOND_REACTION: string = 'Second reaction';

export const TITLE_AUTOMATION: string = 'Automation';

export const TEXT_SELECT_CONTROLLER_TIME_ZONE: string = 'Select controller time zone';

export const REACTION_WARNING_MESSAGE: string = 'At least 1 day of the week must be selected';

export const REACTION_ERROR_MESSAGE: string = 'Error code: {{CODE}}';

export const DAY_MONDAY: string = 'Mo';

export const REACTION_WARNING_DELETE_MESSAGE: string = 'Are you sure you want to delete reaction?';

export const GROUP_NAME: string = 'Group 1';

//SETTINGS

export const SETTINGS_DISARMING: string = 'Disarming';

export const SETTINGS_TIME_ZONE: string = 'Time zone';

export const TIME_ZONE_FIRST: string = 'Kyiv (+02:00 UTC)';

export const TIME_ZONE_SECOND: string = 'Kabul (+04:30 UTC)';

export const SETTINGS_AUTOMATICALLY: string = 'Automatically';

export const SETTINGS_MANUALLY: string = 'Manually';

export const SETTINGS_10_SECONDS: string = '10 seconds';

export const SETTINGS_30_SECONDS: string = '30 seconds';

export const SETTINGS_TURN_ON: string = 'Turn on';

export const SETTINGS_TURN_OFF: string = 'Turn off';

export const SETTINGS_DISABLED: string = 'Disabled';

export const SETTINGS_ENABLED: string = 'Enabled';

export const SETTINGS_DISABLE: string = 'Disable';

export const SETTINGS_TRACK: string = 'Track';

export const SETTINGS_ARMS_DISARM: string = 'Arms/Disarms';

export const SETTINGS_ALARMS_RESTORES: string = 'Alarms/Restores';

export const SETTINGS_TROUBLES_RESTORES: string = 'Troubles/Restores';

export const SETTINGS_ARMS_DISARMS_ALARMS_RESTORES: string = 'Arms/Disarms, Alarms/Restores';

export const SETTINGS_DENIED: string = 'Denied';

export const SETTINGS_ALLOWED: string = 'Allowed';

export const SETTINGS_ENABLE: string = 'Enable';



export const TITLE_EDIT_USER: string = 'Edit user';

export const TEXT_EDITING_EMAIL: string = 'Editing Email';

export const TEXT_CHANGE_USER_NAME: string = 'Change username';

export const TEXT_PANEL_STATES: string = 'Panel states';

export const TEXT_VIEW: string = 'View';

export const TEXT_MOBILE: string = 'Mobile';

export const TITLE_TROUBLES: string = 'Troubles';

export const TITLE_DEALERS: string = 'Dealers';

export const TEXT_NO_HUB_WITH_TROUBLES: string = 'No hubs with trouble';

export const BUTTON_ADD_COMPANY: string = 'Add company';

export const TEXT_ADDING_GROUPS_OF_COMPANIES: string = 'Adding a group of companies';

export const TEXT_DELETING_GROUPS_OF_COMPANIES: string = 'Delete group of companies corporation.name?';

export const TEXT_ADD_EMPLOYEE: string = 'Add employee';

export const ROLE_ENGINEER: string = 'Engineer';

export const TEXT_EDIT_EMPLOYEE: string = 'Edit employee';

export const TEXT_EDIT_SUPPORT: string = 'Edit support';

export const TEXT_ADD_SUPPORT: string = 'Add support';

export const TITLE_SERVICE_REQUESTS: string = 'Service requests';

export const TEXT_PHONE: string = 'Phone';

export const TEXT_FULL_NAME: string = 'Full name';

export const TEXT_CONFIGURING_PANELS: string = 'Configuring panels';

export const TEXT_NODES: string = 'Nodes';

export const TEXT_INFO: string = 'Info';

export const TEXT_CONNECTION: string = 'Connection';

export const TITLE_PANELS: string = 'Panels';

export const SERVER_NAME_FIRST: string = 'Best server';

export const SERVER_NAME_SECOND: string = 'New server';

export const SERVER_DNS_FIRST: string = '179.36.500.218';

export const SERVER_DNS_SECOND: string = '179.36.500.300';

export const SERVER_PORT_FIRST: string = '4480';

export const SERVER_PORT_SECOND: string = '4490';

export const TEXT_INTERNATIONAL: string = 'international';

export const TEXT_SAVING_CHANGES: string = 'Saving changes';

export const TEXT_SUCCESSFULLY: string = 'successfully';

export const TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES: string = 'Test email for all language';

export const TEXT_EDIT_TEMPLATE: string = 'Edit template';

export const TITLE_PUSH_NOTIFICATIONS: string = 'Push notifications';

export const TEXT_EDIT_PUSH_TEMPLATE: string = 'Edit push template';

export const TEXT_SEND_TO: string = 'Send to';

export const TEXT_LANGUAGE: string = 'Language';

export const TEXT_LANGUAGE_COUNT: string = 'Language count';

export const TEXT_TEMPLATE_TYPE: string = 'Template type';

export const TEXT_LETTER_TEMPLATES: string = 'Letter templates';

export const TEXT_TEST_EMAIL_SEND_SUCCESSFULLY: string = 'Test email send successfully';

export const TEXT_NO_LINK: string = 'NO_LINK';

export const TEXT_EMAIL_TEMPLATES_FAILURES: string = 'EMAIL_TEMPLATES_FAILURES';

export const TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES_: string = 'TEXT_TEST_EMAIL_FOR_ALL_LANGUAGES';

export const TEXT_ALL_SELECTED: string = 'Select all';

export const TITLE_STATISTICS: string = 'Statistics';

export const TITLE_RADIO_DEVICES: string = 'Radio devices';

export const TITLE_STATISTICS_PANELS: string = 'Statistics: Panels';

export const TITLE_STATISTICS_COMPANIES: string = 'Statistics: Companies';

export const TITLE_STATISTICS_RADIO_DEVICES: string = 'Statistics: Radio devices';

export const TEXT_TOTAL_NUMBER_OF_DEVICES: string = 'Total number of devices';

export const TEXT_TOTAL_NUMBER_OF_RADIO_DEVICES: string = 'The total number of radio devices';

export const TEXT_COUNT_OF_DEVICES_IN_COUNTRY: string = 'Count of device in this country';

export const TITLE_COUNTRY_CONTROL: string = 'Country control';

export const TEXT_DELETE_COUNTRY: string = 'Delete country';

export const TEXT_CREATE_COUNTRY: string = 'Create country';

export const TEXT_LIST_OF_COUNTRIES: string = 'List of available countries:';

export const TEXT_EDIT_COUNTRY: string = 'Edit country';

export const TEXT_ADD_COUNTRY: string = 'Add country';

export const TEXT_INSTALLATION_COUNTRY: string = 'Installation Country';

export const TEXT_INSTALLATION_COUNTRY_FULL: string = 'Select country where the device is installed';

export const TEN: string = '10';

export const SEVENTEEN: string = '17';

export const EIGHTEEN: string = '18';

export const TEXT_4_SYMBOLS: string = '4 symbols';

export const TEXT_6_SYMBOLS: string = '6 symbols';

export const TEXT_CHANGE_KEYPAD_CODE_LENGTH: string = 'Change keypad code length';

export const TEXT_DISABLE_TAMPER: string = 'Disable tamper';

export const TEXT_DISABLE_RADIO_JAM: string = 'Disable radio jam detection';

export const TEXT_PANEL_TAMPER_DISABLED: string = 'Panel tamper disabled';

export const TEXT_RADIO_JAM_DISABLED: string = 'Radio jam detection disabled';

export const TEXT_REGION: string = 'Дніпропетровська область';

export const TEXT_DISTRICT: string = 'Дніпровський район';

export const TEXT_COMMUNITY: string = 'Любимівська територіальна громада';

export const TEXT_SELECT_REGION: string = 'Select region';

export const TEXT_SELECT_DISTRICT: string = 'Select district';

export const TEXT_SELECT_COMMUNITY: string = 'Select community';

export const TEXT_MOBILE_NEW: string = 'Mobile |';

export const TEXT_USER_MANAGEMENT: string = 'User management';

export const TEXT_SERVICE: string = 'Service';

export const TEXT_SUBMIT: string = 'Submit';

export const TEXT_ADD_KEYFOB: string = 'Add keyfob / panic button';

export const TEXT_ADD_KEYFOB_INSTRUCTION_FIRST: string = 'Place the key fob no more than 2 m from the security center. Registration takes place at the lowest possible power in order to avoid the influence of neighboring systems, possibly configured nearby. To add a device, hold down any button for about 10 seconds until the green indicator blinks. Wait for the message about successful device registration. Also make sure that there is a charged battery in the key fob.';

export const TEXT_ADD_KEYFOB_INSTRUCTION_SECOND: string = 'Press the button and hold for 10 seconds until the green indicator blinks.';

export const TEXT_CANSEL_REGISTRY: string = 'Cancel registry';

export const TEXT_UPLOADING_NEW_CONSOLE_APP_FIRMWARE: string = 'Uploading new console application firmware';

export const TEXT_SEPTEMBER_2024: string = 'September 2024';

export const TEXT_OCTOBER_2024: string = 'October 2024';

export const TEXT_DAY_FIRST: string = '18.10.2024, Friday';

export const TEXT_DAY_SECOND: string = '19.10.2024, Saturday';

export const TEXT_DAY_THIRD: string = '17.10.2024, Thursday';

export const TEXT_DAY_FOURTH: string = '10.10.2024, Thursday';

export const TEXT_DAY_FIFTH: string = '11.10.2024, Friday';

export const TITLE_CAPTCHA_WHITE_LIST: string = 'Captcha white list';

export const TITLE_ACCOUNT_SERVER: string = 'Account Server';

export const TEXT_SEARCH_BY_EMAIL: string = 'Search by email';

export const TEXT_REMOVE_USER_FROM_WHITELIST: string = 'Remove user from whitelist?';

export const TEXT_ADD_EMAIL_TO_WHITELIST: string = 'Add email to whitelist';

export const TEXT_ADD_USER_TO_CAPTCHA__WHITELIST: string = 'Add user to captcha white list';

export const TEXT_PANEL_NODE_FIRST: string = 'Panel Server Node: dev-panel-1.maks.systems';

export const TEXT_PANEL_NODE_SECOND: string = 'Panel Server Node: dev-panel-2.maks.systems';

export const TEXT_CLEARING_CACHE: string = 'Clearing the cache on the Account server';

export const TEXT_CLEARING_CACHE_CONFIRMATION: string = 'Are you sure you want to clear the cache on Account server?';

export const COUNTRY_CODE_FIRST: string = 'DD';

export const COUNTRY_CODE_UK_FIRST: string = 'ddr';

export const COUNTRY_CODE_EN_FIRST: string = 'dddr';

export const COUNTRY_CODE_RU_FIRST: string = 'ddddr';

export const COUNTRY_CODE_UK_SECOND: string = 'bbr';

export const COUNTRY_CODE_EN_SECOND: string = 'bbbr';

export const COUNTRY_CODE_RU_SECOND: string = 'bbbbr';

export const TEXT_DELETE: string = 'Delete';

export const TEXT_ADD_LOCALIZATION: string = 'Add Localization';

export const TEXT_REQUEST_WARNING_MESSAGE: string = 'Unfortunately, there are no companies in your country to apply for service. You can select another country';

export const TEXT_COUNTRY_SELECTION: string = 'Country selection';

export const TEXT_SERVER_SETTINGS: string = 'Server settings';

export const TEXT_PANEL_CONTROL_TRANSFER: string = 'Panel control transfer';

export const TEXT_TRANSFER_REQUEST_SENT: string = 'Transfer request sent';

export const TEXT_REVERT_APPLICATION: string = 'Revert application';

export const TEXT_REVOKE_SERVICE_REQUEST: string = 'Revoke a service request';

export const TEXT_WARNING: string = 'Warning!';

export const TEXT_CAPTCHA_IS_VISIBLE: string = 'Captcha is visible';

export const TEXT_EMAIL_ALREADY_EXISTS: string = 'Email already exists';

export const TEXT_NOT_RECEIVED_EMAIL: string = 'Not received an email?';

export const TEXT_RESEND_EMAIL: string = 'Resend email';

export const TEXT_EMAIL_CONFIRMATION: string = 'Email confirmation';

export const TEXT_REGISTRATION: string = 'Registration';

export const TEXT_INCORRECT_EMAIL_FORMAT: string = 'Incorrect email address format.';

export const TEXT_USERS_WITH_NO_ACCESS: string = 'Users with no access to Alarm Station Monitoring';

export const TEXT_PASSWORD_MUST_CONTAIN: string = 'Password must contain at least';

export const TEXT_8_SYMBOLS: string = '8 symbols';

export const TEXT_1_NUMBER: string = '1 number';

export const TEXT_1_LOWERCASE_LETTER: string = '1 lowercase letter';

export const TEXT_1_UPPERCASE_LETTER: string = '1 uppercase letter';

export const TEXT_LATIN_CHARACTERS_ONLY: string = 'latin characters only';

export const TEXT_PASSWORD_RECOVERY: string = 'Password recovery';

export const TEXT_WHAT_EMAIL_IS_ASSOCIATED: string = 'What email is associated with your U-Prox profile?';

export const TEXT_PASSWORD_RECOVERY_SENT: string = 'A password recovery email has been sent to your email.';

export const TEXT_USER_NOT_FOUND: string = 'User not found';

export const TEXT_ROLE: string = 'Role';

export const TEXT_EMAIL: string = 'Email';

export const TEXT_REQUIRED_FIELD: string = 'Required field';

export const TEXT_COUNTRY: string = 'Country';

export const TEXT_PUT_ON_SERVICE: string = 'Put on service';

export const TEXT_REFUSE_PANEL_FROM_MONITORING: string = 'Refuse panel from monitoring';

export const TEXT_PUT_PANEL_ON_MONITORING: string = 'Put panel on monitoring';

export const TEXT_REFUSE_SERVICE: string = 'Refuse service';

export const TEXT_ERROR_CODE: string = 'Error code:';

export const TEXT_ERROR_CODE_BY_COMPULSION: string = 'This pin code is already used by another user on the panel';

export const TEXT_ERROR_33_GROUP: string = 'Failed to create group';

export const TEXT_ERROR_N1_REACTIONS: string = 'The maximum number of reactions for this panel has been reached';

export const BLOCKING_SYSTEM_ADMIN: string = 'Blocking system_admin';


//SELECTORS

export const SELECTOR_FIRST: string = 'div:text-is("Monitoring-service companies")';

export const SELECTOR_SECOND: string = 'use[*|href="#icon-ads"]';

export const SELECTOR_THIRD: string = 'use[*|href="#icon-About"]';

export const SELECTOR_FOURTH: string = 'div:text-is("Service companies")';

export const SELECTOR_FIFTH: string = 'use[*|href="#icon-ban"]';

//URL

export const URL_DEALER_COMPANIES: string = '/dealer/companies';

export const URL_LOGIN: string = '/login';

export const URL_PROFILE_PANELS: string = '/profile/panels';

export const URL_PROFILE_FEEDBACK: string = '/profile/feedback';

export const URL_PROFILE_COMPANIES: string = '/profile/companies';

export const URL_PANELS: string = '/panels';

export const URL_SUPPORT_SEARCH: string = '/support/search';

export const URL_HUB_DOC: string = 'about:blank';


//FAKER

export const FAKER_NAME_OF_GROUP_FIRST: string = faker.string.alphanumeric({ length: { min: 10, max: 12 } });

export const FAKER_NAME_OF_GROUP_SECOND: string = 'newgroup_' + faker.string.alphanumeric({ length: { min: 3, max: 4 } });

export const FAKER_NAME_OF_COMPANY_FIRST: string = faker.commerce.productName();

export const FAKER_NAME_OF_COMPANY_SECOND: string = 'TEST_COMPANY_' + faker.string.alphanumeric({ length: { min: 5, max: 6 } });

export const FAKER_EMAIL_FIRST: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });

export const FAKER_EMAIL_SECOND: string = faker.internet.email({ firstName: EMAIL_NECESSARY_NAME_PART });

export const FAKER_EMAIL_THIRD: string = faker.internet.email({ firstName: 'pol_' + EMAIL_NECESSARY_NAME_PART });

export const FAKER_EMAIL_FOURTH: string = faker.internet.email();

export const FAKER_EMAIL_FIFTH: string = faker.internet.email();

export const FAKER_EMAIL_SIX: string = faker.internet.email();

export const FAKER_PHONE_FIRST: string = faker.phone.number();

export const FAKER_PHONE_SECOND: string = faker.phone.number();

export const FAKER_EMAIL_ADMIN: string = faker.internet.email({ firstName: 'sastest2398_' });

export const FAKER_FULL_NAME: string = faker.person.fullName();

export const FAKER_FULL_NAME_FIRST: string = faker.person.fullName();

export const FAKER_CODE: string = (faker.number.int({ min: 111111, max: 999998 })).toString();
