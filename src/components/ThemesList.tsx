import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import ButtonView from './Button';
import { useDispatch } from 'react-redux';
import { closeModal } from 'src/utils/rrn';

ThemesList.propTypes = {
};
interface Props {
    onPress: (themeName: string) => void,
    height: number,
    width: number
}
export default function ThemesList(props: Props) {
    const { onPress, height, width } = props;
    return <View style={{ flexDirection: 'row', justifyContent: "space-around" }}>
        <ButtonView  onPress={() => onPress('default')}>
            <Image source={{ uri: 'light' }} style={{ height, width }} />
        </ButtonView>
        <ButtonView onPress={() => onPress('dark')}>
            <Image source={{ uri: 'dark' }} style={{ height, width }} />
        </ButtonView>
    </View>
}