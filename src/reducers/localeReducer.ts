import { actionGeneral } from "../@types/redux"

import * as RNLocalize from "react-native-localize";
import { initialMode } from 'react-native-dark-mode'
import config from "../config";

const initialData = {
    preferredDefaultLanguage: ((matchedLang) => {
        if (!matchedLang) return {
            languageTag: config.LANGUAGE_DEFAULT,
            isRTL: false
        }
        return matchedLang
    })(RNLocalize.findBestAvailableLanguage(config.LANGUAGES)),
    country: RNLocalize.getCountry(),


    locales: RNLocalize.getLocales(),
    currencies: RNLocalize.getCurrencies(),
    numberFormat: RNLocalize.getNumberFormatSettings(),
    calendar: RNLocalize.getCalendar(),
    temperatureUnit: RNLocalize.getTemperatureUnit(),
    timezone: RNLocalize.getTimeZone(),
    uses24Hours: RNLocalize.uses24HourClock(),
    usesMetric: RNLocalize.usesMetricSystem(),
    isDarkMode: initialMode === 'dark'
}

export default (state = initialData, action: actionGeneral) => {
    switch (action.type) {
        case 'CHANGE_THEME_DEVICE':
            state.isDarkMode = action.payload.theme === 'dark'
            return state;
        default:
            return state
    }
}
