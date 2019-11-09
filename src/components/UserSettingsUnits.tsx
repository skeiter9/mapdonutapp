import React from 'react';
import { View, Text } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import createCachedSelector from 're-reselect';
import { StoreApp } from '../@types/redux';
import ButtonView from './Button';
import { Button } from 'react-native-paper';
import { sanFranciscoWeights, iOSUIKit, material } from 'react-native-typography'

const unitsSelector = createCachedSelector(
    //(s: StoreApp) => s.app.currentUser.uid,
    (s: StoreApp) => s.app.currentUser.tempUnit,
    (s: StoreApp) => s.app.currentUser.distanceUnit,
    (s: StoreApp) => s.theme.themeVariables.colors.surface,
    (s: StoreApp) => s.languages.words,
    (s: StoreApp) => s.theme.themeVariables,
    (tempUnit, distanceUnit, bg, words, themeVariables) => ({ tempUnit, distanceUnit, bg, words, themeVariables})
)(() => 'unitsMEasure');

export default function ({ }: any) {

    const { tempUnit, distanceUnit, bg, words, themeVariables } = useSelector(unitsSelector);

    const dispatch = useDispatch();

    const selectItem = (_type: 'T' | 'D', v: string) => {
        const type = _type === 'D' ? 'distanceUnit' : 'tempUnit'
        return dispatch({type: 'CHANGE_UNIT', payload: { [type]: v }})
    };

    return <View style={{ backgroundColor: themeVariables.colors.background, paddingHorizontal: 16, paddingBottom: 8}}>
        <UnitSetting label={words.TEMPERATURE} themeVariables={themeVariables}>
            <UnitSettingButton _key={0} themeVariables={themeVariables} label={'Fº'} selectItem={selectItem.bind(null, 'T', 'F')} isSelected={tempUnit === 'F'} />
            <UnitSettingButton _key={1} themeVariables={themeVariables} label={'Cº'} selectItem={selectItem.bind(null, 'T', 'C')} isSelected={tempUnit === 'C'} />
        </UnitSetting>
        <UnitSetting label={words.DISTANCE} themeVariables={themeVariables}>
            <UnitSettingButton _key={0} themeVariables={themeVariables} label={words.IMPERIAL} selectItem={selectItem.bind(null, 'D', 'imperial')} isSelected={distanceUnit === 'imperial'} />
            <UnitSettingButton _key={1} themeVariables={themeVariables} label={words.METRIC} selectItem={selectItem.bind(null, 'D', 'metric')} isSelected={distanceUnit === 'metric'} />
        </UnitSetting>
    </View>
}

function UnitSetting(props: any) {
    const { themeVariables } = props;
    return <View style={{ flexDirection: "row", alignItems: 'center', paddingVertical: 8 }}>
        <Text style={{ 
            ...iOSUIKit.subheadObject,
            color: themeVariables.colors.text,
        }}> {props.label} </Text>
        <View style={{ flexDirection: "row", justifyContent: 'flex-end', flex: 1 }}>
            {props.children}
        </View>
    </View>
}

function UnitSettingButton(props: any) {
    const { themeVariables: { colors }, _key } = props;
    return <ButtonView onPress={() => props.selectItem()} style={{  }}>
        <Button mode='contained'
            color={props.isSelected? colors.primary : colors.disabled }
            labelStyle={{
                ...iOSUIKit.subheadEmphasizedObject,
                color: props.isSelected ? colors.onPrimary : colors.onDisabled
            }}
            style={{
                borderTopLeftRadius: _key === 0 ? 8 : 0,
                borderTopRightRadius: _key === 1 ? 8 : 0,
                borderBottomRightRadius: _key === 1 ? 8 : 0,
                borderBottomLeftRadius: _key === 0 ? 8 : 0,
            }}
        > {props.label} </Button>
    </ButtonView>
}

/***  
 * 
 * <View style={{ padding: 8, backgroundColor: props.isSelected ? themeVariables.colors.primary : themeVariables.colors.background }}>
            <Text style={{ color: props.isSelected ? themeVariables.colors.text : themeVariables.colors.text }}> {props.label} </Text>
        </View>
 * 
*/