import React from 'react';
import PropTypes from 'prop-types';
import { StoreApp } from '../@types/redux';
import createCachedSelector from 're-reselect';
import { getStateApp } from '../store';
import { Text as Text_, TextProps, StyleSheet, GestureResponderEvent } from 'react-native';
import {
} from 'react-native-gesture-handler';
import { sanFranciscoWeights, iOSUIKit } from 'react-native-typography';
import { useSelector } from 'react-redux';
import { themeSelector } from '../utils/appSelectors';
import ButtonView from './Button';
import { useTranslation } from 'react-i18next';
import { ThemeColors } from 'src/@types/themeReducer';
const uuidv4 = require('uuid/v4');

Text.propTypes = {
    translationCode: PropTypes.string,
};
interface Props extends TextProps{
    translationCode?: string,
    color?: ThemeColors,
    children?: any,
    fontStyle?: 'body' | 'caption2' | 'title3' | 'body' | 'bodyEmphasized' | 'subheadEmphasized',
    //onPress?: (event: GestureResponderEvent) => void;
    //onPressIn?: (event: GestureResponderEvent) => void;
    //onPressOut?: (event: GestureResponderEvent) => void;
}

/*
const TextTranslationSelector = createCachedSelector(
    (s: StoreApp) => s.languages.words,
    (s: StoreApp, props: Props) => props.translationCode,
    (words, code) => (code ? (words[code] || '') : '')
)(() => `TextTranslation_text__${uuidv4()}`);

const TextColorSelector = createCachedSelector(
    (s: StoreApp) => s.theme.themeVariables.colors,
    (s: StoreApp, props: Props) => props.color,
    (colors, color) => colors[color || 'text']
)(() => `TextTranslation_text__color_${uuidv4()}`);

*/

export default function Text(props: Props) {
    const { t, i18n } = useTranslation();
    //console.log('useTranslation', t('LOGIN_WITH_PHONE'), {t, i18n});
    const { translationCode } = props
    const text = translationCode ? t(translationCode) : '';//TextTranslationSelector(getStateApp(), props);
    const { themeVariables: { colors } } = useSelector(themeSelector);
    const color = colors[props.color || 'text'];
    const fontStyle = iOSUIKit[props.fontStyle || 'body']; // Todo Android
    const weigth = sanFranciscoWeights[
        props.fontStyle === 'title3' ? 'semibold' :
        props.fontStyle === 'bodyEmphasized' ? 'semibold' :
        props.fontStyle === 'subheadEmphasized' ? 'semibold' :
        'regular'
    ]; // Todo Android
    const styles = StyleSheet.create({
        weigth,
        color: { color }
    });

    return (
        <Text_
            {...props}
            style={[
                fontStyle,
                styles.weigth,
                styles.color,
                props.style,
            ]}> {text || props.children || ''} </Text_>
    )
}
