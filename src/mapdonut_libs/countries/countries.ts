import {
  TranslationLanguageCode,
  Mapdonut_Country,
  Mapdonut_Raw_Countrie,
  Mapdonut_Country_Code,
  Mapdonut_Country_translation,
  translations_dictionary,
  CountryCodeList,
  mapdonut_country_available_translations,
  Mapdonut_country_available_translations
} from './types'
import { Mapdonut_Currency_Code } from '../currencies/currencies_types';
import R from 'ramda';

type raw = { [key in Mapdonut_Country_Code]: Mapdonut_Raw_Countrie };

//let datasource: Countries_Datasource = {};
let allCountries: Mapdonut_Country[] = []

const FIX_LANG_CODES = {
  'common': 'en',
  'ces': 'cs',
  'cym': 'cy',
  'deu': 'de',
  'fra': 'fr',
  'hrv': 'hr',
  'ita': 'it',
  'jpn': 'jp',
  'nld': 'nl',
  'por': 'pt',
  'rus': 'ru',
  'spa': 'es',
  'slk': 'sk',
  'fin': 'fi',
  'zho': 'zh',
  'est': 'et',
  'pol': 'pl',
  'urd': 'ur',
  'kor': 'ko'
}

const FLAG_ICONS_NO_AVAiLABLES = [
  'EH', // WEstern Sahara
  'BQ', // Caribbean Netherlands
]

const getName = (c: Mapdonut_Country, lang: TranslationLanguageCode) => {
  if (typeof c.name === 'string') return c.name;
  return c.name[lang];
}

const _loadDataSource = ((allCountries, _data) => (lang: Mapdonut_country_available_translations, removeAntartica: boolean) => {

  const _initialItems = R.pipe(
    (r: raw) => r,
    R.toPairs,
    R.map(c => {
      const translations_dictionary = fixLangsCodeISO(c[1]);
      return {
        cca2: c[0] as Mapdonut_Country_Code,
        name: translations_dictionary[lang],
        currency: c[1].currency,
        callingCode: c[1].callingCode,
        flag: c[1].flag,
        //translations: fixLangsCode(c[1]),
        translations_dictionary,
      }
    }),
  );

  if (allCountries.length === 0) {
    const source = require('./data/datasetCountries.json') as raw;
    allCountries = _initialItems(source);
  }

  const sortItems = R.pipe<Mapdonut_Country[], Mapdonut_Country[], Mapdonut_Country[]>(
    R.filter(c => {
      if (removeAntartica && c.cca2 === 'AQ') return false;
      return true;
    }),
    R.map((c) => R.merge(c, { name: c.translations_dictionary[lang]})),
  )

  //if (pipe) return pipe(sortItems(allCountries))

  return sortItems(allCountries);

})(allCountries);

export const getCountriesByCurrency = (currencyCode: Mapdonut_Currency_Code, lang: string = 'en'): Mapdonut_Country[] => {
  const res = getAllCountries().filter(c => !!c.currency.find(_c => _c === currencyCode));
  return res;
}

export const getAllCountries = (_lang: string = 'en', removeAntartica: boolean = true) => {
  const lang = mapdonut_country_available_translations.find(l => l === _lang);
  return _loadDataSource(lang || 'en', removeAntartica);
};

export const getCountriesInOrderAlphabetic = (allCountries: Mapdonut_Country[]) => {
  const pipeFn = R.pipe(
    (x: Mapdonut_Country[]) => x,
    R.groupBy((item) => {
      return (item.name.trim()).charAt(0)
    }),
    R.toPairs,
    R.map(x => ({
      title: x[0],
      data: x[1]
        .filter(x => x.callingCode.length > 0),
    })),
    R.sort(R.ascend(R.prop('title')))
  );
  return pipeFn(allCountries);
}

export const getCountriesByCallingCode = (lang: string) => {
  const all = getAllCountries(lang);
  const allCallingCodesPipe = R.pipe(
    (x: Mapdonut_Country[]) => x,
    R.map(x => x.callingCode),
    R.flatten,
    R.uniq, //R.filter(x => R.includes(ccode, x.callingCode), all)
    R.map(ccode => R.map((x: Mapdonut_Country) => ({ ...x, ccode } as Mapdonut_Country), R.filter(x => R.includes(ccode, x.callingCode), all))),
    R.flatten,
    R.filter(x => !R.includes(x.cca2, FLAG_ICONS_NO_AVAiLABLES)),
  );
  const res = allCallingCodesPipe(all);
  return res;
}

function fixLangsCodeISO(c: Mapdonut_Raw_Countrie) {
  return (Object.keys(c.name) as TranslationLanguageCode[])
    .filter(oldCode => Object.keys(FIX_LANG_CODES).find(_oldCode => _oldCode === oldCode))
    .reduce((acc, k) => ({ ...acc, [FIX_LANG_CODES[k] || '_no']: c.name[k] || '' }), {}) as translations_dictionary;
}
