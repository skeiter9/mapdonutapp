import { actionGeneral } from "../@types/redux"
import config from "../config";
import * as RNLocalize from "react-native-localize";
import { Mapdonut_Languages_Availables, LanguageState } from "src/@types/languagesReducer";

const LANGUAGES_AVAILABLE: Mapdonut_Languages_Availables[] = [
    'es',
    'es',
    'ru',
    'de',
    'ar',
    'hi',
    'jp',
    'pt',
    'tr',
    'it',
    'zh-HANS', //Chinese (Simplified)
    'zh-HANT', //Chinese (Traditional)
    'QUE',

    // Extra for currencies
    'fr',
    'ja',
    'sv',

    // Extra for countries names
    'cs',
    'cy',
    'hr',
    'nl',
    'sk',
    'fi',
    'zh',
    'et',
    'pl',
    'ur',
    'ko'
]
const initialLang = ((matchedLang) => {
    if (!matchedLang) return {
        languageTag: config.LANGUAGE_DEFAULT,
        isRTL: false
    }
    return matchedLang
})(RNLocalize.findBestAvailableLanguage(LANGUAGES_AVAILABLE));

const initialState: LanguageState = {
    lang: initialLang.languageTag as Mapdonut_Languages_Availables,
    isRTL: initialLang.isRTL,
    words: {}
}

export default (state = initialState, action: actionGeneral) => {
    switch (action.type) {
        case 'SET_LANGUAGE':
        case 'CHANGE_LANGUAGE':
            const lang: Mapdonut_Languages_Availables = action.payload.lang;
            state.lang = lang;
            //state.words = config.DICTIONARIES[lang];
            return state;
        default:
            return state
    }
}

