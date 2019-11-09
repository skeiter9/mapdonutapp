import React from 'react';
import ButtonView from './Button';
import { View, Text } from 'react-native';
import createCachedSelector from 're-reselect';
import { StoreApp } from '../@types/redux';
import getStore from '../store';
import { Subheading, Colors } from 'react-native-paper';
import { sanFranciscoWeights, iOSUIKit, material } from 'react-native-typography'

interface SimpleSetting {
    onPress: Function,
    title: string,
    value: string,
    placeholder?: string,
    valueComponent?: JSX.Element|null
}

const selector = createCachedSelector(
    (props: SimpleSetting) => props.value,
    (props: SimpleSetting) => props.title,
    (props: SimpleSetting) => props.valueComponent,
    (props: SimpleSetting) => props.placeholder,
    //(props: SimpleSetting, s: StoreApp) => s.theme.themeVariables.colors.surface,
    //(props: SimpleSetting, s: StoreApp) => s.theme.themeVariables.colors.text,
    //(props: SimpleSetting, s: StoreApp) => s.theme.themeVariables.colors.primary,
    (props: SimpleSetting, s: StoreApp) => s.theme.themeVariables.colors,
    (value, title, valueComponent, placeholder, colors) => {
        return { value, title, valueComponent, placeholder, colors }
    }
)((props: SimpleSetting) => `settings-${props.title}`);

export default function SimpleSetting(props: SimpleSetting) {
    const { value, title, valueComponent, placeholder, colors } = selector(props, getStore().getState());
    const { onPress } = props;

    return <ButtonView onPress={onPress} style={{ flexDirection: 'row' }}>
        <View style={{
            padding: 16, flexDirection: "row", justifyContent: "space-between",
            width: '100%', backgroundColor: colors.background, alignItems: 'center'
        }}>
            <Text style={{
                ...iOSUIKit.bodyObject,
                //...sanFranciscoWeights.semibold,
                color: colors.text
            }}> {title} </Text>
            {
                valueComponent ? valueComponent :
                    <Text style={{
                        ...iOSUIKit.bodyEmphasizedObject,
                        //...sanFranciscoWeights.bold,
                        color: value ? colors.primary : colors.placeholder,
                    }} > {value ? value : placeholder ? placeholder : ''} </Text>
            }
        </View>
    </ButtonView>
}