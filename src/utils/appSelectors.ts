import createCachedSelector, { createStructuredCachedSelector } from "re-reselect";
import { StoreApp, ThemeState, LanguageState } from "../@types/redux";
import { Mapdonut_Country_Code } from "../mapdonut_libs/countries/types";

export const themeSelector = createCachedSelector(
    (state: StoreApp) => state.theme.themeVariables,
    (state: StoreApp) => state.theme.theme,
    (themeVariables, theme) => ({ themeVariables, theme })
)(
    (s) => ('APP_THEME__' + s.theme.theme)
);

export const languageSelector = createStructuredCachedSelector<StoreApp, LanguageState>({
    lang: (state) => state.languages.lang,
    words: (state) => state.languages.words,
    //parseTranslation: (state) => state.languages.parseTranslation,
})(
    (a) => ('APP_LANGUAGE__' + a.languages.lang)
)

export const tmpdataSelector = createStructuredCachedSelector<StoreApp, {
    ccodeSelected: string,
    ccodeSelectedCca2: Mapdonut_Country_Code
}>({
    ccodeSelected: (state) => state.app.tmp.ccodeSelected,
    ccodeSelectedCca2: (state) => state.app.tmp.ccodeSelectedCca2,
})(
    (a) => ('APP_TMP__')
)