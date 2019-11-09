export const VERSION = '0.75';
//export const REGULAR_ANIMATION_TIMING = 300;
//export const DEFAULT_LOCATION = { lat: 39.741952, lng: -104.988589 };

export const CURRENCIES_LANGUAGES = [
    'en', 'es', 'ar', 'de', 'fr', 'it', 'ja', 'pt', 'sv', 'zh-CN', 'zh-HK'
];

export const COUNTRIES_LANGUAGES = [
    'en', 'es', 'cs', 'cy', 'de', 'fr', 'hr', 'it', 'jp', 'nl', 'pt', 'ru', 'sk', 'fi', 'zh', 'et', 'pl', 'ur', 'ko'
];

export const LANGUAGES = ['en', 'es', 'tr'];

export const DICTIONARIES = {
    en: require('./i18n/app/en.json'),
    es: require('./i18n/app/es.json'),
    tr: require('./i18n/app/tr.json')
} as const;

export const LANGUAGE_DEFAULT = 'en';
export const THEMES = ['defaul', 'dark', 'aiko'];
export const THEME_DEFAULT = 'light';
