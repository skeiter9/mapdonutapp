import React from 'react';
import { Platform, View, TouchableOpacityProps, StyleSheet } from 'react-native';
import {
    TouchableOpacity,
    TouchableNativeFeedback,
    RectButton,
    RectButtonProperties
} from 'react-native-gesture-handler';
import {
    TouchableOpacity as TOpacityReact,
    //TouchableNativeFeedback as TNativeReact
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import createCachedSelector from 're-reselect';
import { useSelector } from 'react-redux';
import is from 'ramda/es/is';
import Text from './TextTranslation';
import { capitalizeString } from '../utils/utilsGeneral';
import { StoreApp } from '../@types/redux';
import { ThemeColors, IconDatatsets } from '../@types/themeReducer';

interface propsButton extends RectButtonProperties {
    //useReactNative?: boolean
    children?: JSX.Element | JSX.Element[] | string,
    icon?: string,
    iconType?: IconDatatsets,
    iconSize?: number,
    color?: ThemeColors,
    translationCode?: string,
}

const selector = createCachedSelector(
    (props: propsButton) => props.onPress,
    (props: propsButton) => props.icon,
    (props: propsButton) => props.iconType,
    (props: propsButton) => props.color,
    (props: propsButton) => props.children,
    (props: propsButton) => props.iconSize,
    (props: propsButton) => props.translationCode,
    (p: propsButton, s: StoreApp) => s.theme,
    (_onPress, _icon, _iconType, _color, _children, _iconSize, _translationCode, { themeVariables: {colors}, icons }) => {
        const color = _color || 'primary';
        let icon = _icon || '';
        let iconType = _iconType || icons;
        if (iconType === 'Ionicons') icon = `ios-${icon}`
        const colorText = `on${capitalizeString(color)}` as ThemeColors;
        return {
            icon,
            iconType,
            iconSize: _iconSize || 28,
            iconColor: colors[colorText],
            color: colors[color],
            children: _children || null,
            colorText: colorText,
            translationCode: _translationCode || ''
        };
    }
)((props: propsButton) => 'butonn')

export default function ButtonView(props: propsButton) {
    //const { themeVariables: { colors } } =  useSelector(themeSelector);
    //const iconsSet = useSelector((s: StoreApp) => s.theme.icons);
    const storeState = useSelector<StoreApp, StoreApp>(x => x);
    const { icon, iconType, iconSize, color, children, colorText, translationCode, iconColor } = selector(props, storeState);
    const styles = StyleSheet.create({
        bg: { backgroundColor: color },
        body: {
            minWidth: 120,
            borderRadius: 6
        }
    });

    return (
        <RectButton {...props} style={[props.style || {}, styles.body, styles.bg]} >
            { icon ? <Icon name={icon} type={iconType} color={iconColor} size={iconSize} /> : null}
            { translationCode ?
                <Text translationCode={props.translationCode} color={colorText}
                /> :
                children
            }
        </RectButton>
    )
}



/** 
 * 
 * //const { children, icon, iconType } = props;

    //const Wrapper = Platform.OS === 'ios' ?
    //    (props.useReactNative ? TOpacityReact : TouchableOpacity) : TouchableNativeFeedback;
    //if (Platform.OS === 'ios' && !props.useReactNative) return (
    //    <TouchableOpacity onPR>
    //        {children}
    //    </TouchableOpacity>
    //);
 * 
 * 
 * <Wrapper {...props} >
        <WrapperContent style={props.style || {}}>{props.children || null}</WrapperContent>
    </Wrapper>
 * 
 * 
 * 
*/
