import { iOSColors } from 'react-native-typography';
import { CustomizedTheme } from 'src/@types/themeReducer';

const customizedTheme: CustomizedTheme = {
    colors: {
        ...iOSColors,

        text: iOSColors.customGray,

        backdrop: "rgba(0, 0, 0, 0.5)",
        disabled: "rgba(255, 255, 255, 0.38)",
        notification: "#ff80ab",
        placeholder: "rgba(255, 255, 255, 0.54)",

        primary: '#0A84FF',//PRIMARY_COLOR,
        error: "#FF375F",//'#BF0A30',
        accent: '#30D158',//'#58b35f',
        background: iOSColors.black,
        surface: '#242426', //Gray (6)	systemGray6 / 
        onAccent: iOSColors.white,//'#fff'
        onSurface: iOSColors.white,
        onBackground: '#242426',
        onPrimary: iOSColors.white,
    }
}

export default customizedTheme;