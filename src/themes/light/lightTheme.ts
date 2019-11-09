//import colors from './default-eva';
import { DefaultTheme, DarkTheme } from 'react-native-paper';

import { sanFranciscoWeights, iOSColors } from 'react-native-typography';
import { CustomizedTheme } from '../../@types/themeReducer'
//const fonts = Object.keys(sanFranciscoWeights)
//    .map(k => ({[k]: {
//        fontFamily: 'System', fontWeight: sanFranciscoWeights[k].fontWeight
//    } }))
//    .reduce((acc, cur) => ({...acc, ...cur}), {})
//
// https://nshipster.com/dark-mode/

const customizedTheme: CustomizedTheme = {
    colors: {
        ...iOSColors,

        text: iOSColors.black,
        
        notification: "#f50057",
        backdrop: "rgba(0, 0, 0, 0.5)",
        disabled: "rgba(0, 0, 0, 0.26)",
        placeholder: "rgba(0, 0, 0, 0.54)",

        primary: iOSColors.blue,//PRIMARY_COLOR,
        error: iOSColors.red,//'#BF0A30',
        accent: iOSColors.green,//'#58b35f',
        background: iOSColors.white,
        surface: iOSColors.customGray,
        onSurface: iOSColors.gray,
        onPrimary: iOSColors.white,
        onAccent: iOSColors.customGray,//'#fff'
        onBackground: iOSColors.lightGray2
    }
}

export default customizedTheme;