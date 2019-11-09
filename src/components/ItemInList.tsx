import React from 'react';
import PropTypes from 'prop-types';
import { RectButton } from 'react-native-gesture-handler';
import { Flag } from 'react-native-svg-flagkit';
import Text from './TextTranslation';

ItemInListCallingCode.propTypes = {
};
interface Props {
    flag: string, title: string, ccode: string,
    height?: number,
    onPress(): void
}
export function ItemInListCallingCode(props: Props) {
    const { flag, title, ccode, onPress, height } = props;
    return <RectButton onPress={onPress} style={{
        flexDirection: 'row', alignItems: 'center',
        height: height || 50,
        paddingHorizontal: 16, paddingVertical: 12
    }}>
        <Flag id={flag} size={0.15} />
        <Text fontStyle='bodyEmphasized' >+{ccode}</Text>
        <Text> {title} </Text>
    </RectButton>
}