import React from 'react';
import { useDispatch } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Button from './Button';
import Icon from 'react-native-dynamic-vector-icons';
import createCachedSelector from 're-reselect';

interface Props {
    onPress: Function, iconName: string, iconType: string, color: string
}

const selector = createCachedSelector(
    (props: any) => props.onPress,
    (props: any) => props.iconName,
    (props: any) => props.iconType,
    (props: any) => props.color,
    (onPress, iconName, iconType, color) => ({ onPress, iconName, iconType, color })
)((props: any) => props.id)

export default function (props: Props) {
    const { onPress, iconName, iconType, color } = selector(props);
    const dispatch = useDispatch();
    return <Navigation.Element elementId={`TOPBAR_BUTTON_${iconName}`}>
        <Button
            onPress={(e) => {
                //console.log({e});
                onPress(dispatch);
            }}
        >
            <Icon name={iconName} type={iconType} color={color} size={28} />
        </Button>
    </Navigation.Element>
    
}