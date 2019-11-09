import { actionGeneral } from '../@types/redux';
import { initialMode } from 'react-native-dark-mode';
import { ThemeState } from '../@types/themeReducer'

import darkTheme from '../themes/dark/darkTheme';
import lightTheme from '../themes/light/lightTheme';

export const THEMES_DICTIONARY = {
    light: lightTheme,
    dark: darkTheme,
}
export type Mapdonut_Themes_Availables = 'light' | 'dark' | 'aiko';

const { light, dark } = THEMES_DICTIONARY;

export const getThemeVariables = (name: string) => {
    return name === 'dark' ?
        dark :
        light;
};

const initialState: ThemeState = {
    theme: initialMode,
    themeVariables: THEMES_DICTIONARY[initialMode],
    icons: 'Ionicons',
    font: 'system',
    textSizeBase: 17 //ios
}

export default (state: ThemeState = initialState, action: actionGeneral) => {
    switch (action.type) {
        case 'SET_THEME':
        case 'CHANGE_THEME':
            const { theme } = action.payload;
            state.theme = theme;
            state.themeVariables = getThemeVariables(theme);
            return state
        default:
            return state
    }
}
