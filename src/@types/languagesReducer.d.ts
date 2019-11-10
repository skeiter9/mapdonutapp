import {i18n} from 'i18next';

export type Mapdonut_Languages_Availables =  // Full suppot App
  | 'es'
  | 'es'
  | 'ru'
  | 'de'
  | 'ar'
  | 'hi'
  | 'jp'
  | 'pt'
  | 'tr'
  | 'it'
  | 'zh-HANS' //Chinese (Simplified)
  | 'zh-HANT' //Chinese (Traditional)
  | 'QUE'

  // Extra for currencies
  | 'fr'
  | 'ja'
  | 'sv'

  // Extra for countries names
  | 'cs'
  | 'cy'
  | 'hr'
  | 'nl'
  | 'sk'
  | 'fi'
  | 'zh'
  | 'et'
  | 'pl'
  | 'ur'
  | 'ko';

export interface LanguageState {
  lang: Mapdonut_Languages_Availables;
  words: WordDictionary | object;
  isRTL: boolean;
  i18next?: i18n;
}

export type WordDictionary = {[code in APP_Translation_Code]: string};

type APP_Translation_Code = 'LOGIN_WITH_PHONE';
