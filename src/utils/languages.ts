import {Mapdonut_Country_Code} from '../@types/mapdonut.languages';

export function getFlagByLanguage(
  languageCode: string,
): Mapdonut_Country_Code | '' {
  switch (languageCode.toLowerCase()) {
    case 'en':
      return 'US';
    case 'es':
      return 'ES';
    case 'tr':
      return 'TR';
    default:
      return '';
  }
}
