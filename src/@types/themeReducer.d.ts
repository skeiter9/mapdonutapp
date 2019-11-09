
export interface CustomizedTheme {
    colors: ThemeColorsDictionary
}
//export type APP_Languages_Availables = 'en' | 'es' | 'tr';
export type APP_Themes_Availables = 'light' | 'dark';

export interface ThemeState {
    theme: APP_Themes_Availables,
    themeVariables: CustomizedTheme,
    icons: IconDatatsets,
    font: FontsAvailable,
    textSizeBase: 15 | 16 | 17 | 18 | 20 | 24 | 26 | 30
}

export type FontsAvailable = 'system';

export type ThemeColors =
    'primary'|
    'background'|
    'surface'|
    'accent'|
    'error'|
    'text'|
    'disabled'|
    'placeholder'|
    'backdrop'|
    'notification'|
    'onAccent'|
    'onSurface'|
    'onBackground'|
    'onPrimary'|

    // Ios Colors
    'red'|
    'orange'|
    'yellow'|
    'green'|
    'tealBlue'|
    'blue'|
    'purple'|
    'pink'|
    'white'|
    'customGray'|
    'lightGray'|
    'lightGray2'|
    'midGray'|
    'gray'|
    'black';

export type ThemeColorsDictionary = { [key in ThemeColors]: string }

export type IconDatatsets = (
    | 'AntDesign'
    | 'MaterialIcons'
    | 'EvilIcons'
    | 'Entypo'
    | 'FontAwesome'
    | 'Foundation'
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'Zocial'
    | 'Octicons'
    | 'SimpleLineIcons'
    | 'Fontisto'
);

export type IconsUsedInAPP = (
    'phone-portrait' |
    'facebook'
)