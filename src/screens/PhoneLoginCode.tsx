import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { runTiming } from '../utils/animations';
import { Text } from 'react-native-paper';

const { Clock, Value, set, cond, startClock, clockRunning, timing, debug, stopClock, block, interpolate } = Animated

PhoneLoginCode.propTypes = {
};
interface Props {
}
export default function PhoneLoginCode(props: Props) {
    const {  } = props;
    return <Animated.View style={{
            justifyContent: "center", alignItems: 'center', height: '100%',
            backgroundColor: 'rgba(0,0,0,.4)',
            //opacity: runTiming(clock, 0, 1, 1000),
        }}
    >
        <Text> Code </Text>
    </Animated.View>
}