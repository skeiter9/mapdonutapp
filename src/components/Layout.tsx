import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ViewProps } from 'react-native';
import { StoreApp, AppState, ThemeState } from '../@types/redux';
import createCachedSelector from 're-reselect';
import { getStateApp } from '../store';
import { ThemeColors } from '../reducers/themeReducer';
import Animated, { Easing } from 'react-native-reanimated';
import { runTiming } from '../utils/animations';
import { iOSColors } from 'react-native-typography';
import { useSelector } from 'react-redux';
import { themeSelector } from '../utils/appSelectors';
const uuidv4 = require('uuid/v4');
const { Value } = Animated;

Layout.propTypes = {
    color: PropTypes.string,
    //chidlren: PropTypes.element.isRequired
};
interface Props extends ViewProps{
    color?: ThemeColors,
    children?: JSX.Element
}

const ID = uuidv4();

const bgSelector = createCachedSelector(
    (s: ThemeState) => s.themeVariables.colors,
    (s: any, props: Props) => props.color,
    (colors, color) => colors[color || 'background']
)(() => `Layout_bg_${ID}`);

const childrenSelector = createCachedSelector(
    (props: Props) => props.children,
    ch => ch
)(() => `Layout_children${ID}`);

const sel = createCachedSelector(
    (props: StoreApp) => props.theme.theme,
    ch => ch
)(() => `Layout_children_THee${ID}`);

export default function Layout(props: Props) {
    const bg = bgSelector(useSelector(themeSelector), props);
    const children = childrenSelector(props);
    const theme = useSelector(sel);

    //const prevBg = usePrevious(bg);
    //const clock = new Animated.Clock();

    //const trans = new Animated.Value(0);
    //let [transColor, setTransColor] = useState(Animated.color(0, 0, 0));
    //let [transColor2, setTransColor2] = useState(Animated.color(255, 255, 255));

    //const animatedSongCoverTopPosition = Animated.interpolate(trans, {
    //    inputRange: [0, 1],
    //    outputRange: ['rgb(0,0,0)', 'rgba(255,0,0,0)'],
    //    extrapolate: Animated.Extrapolate.CLAMP,
    //});

    //const r = runTiming(clock, transColor, Animated.color(theme === 'dark' ? 0 : 255, 0, 0, 0), 2000);

    useEffect(() => {
        //setTransColor(Animated.color(theme === 'dark' ? 0 : 255, theme === 'dark' ? 0 : 210, 0, 0))
        //Animated.timing(transColor, {
        //    toValue: Animated.color(theme === 'dark' ? 0 : 255, theme === 'dark' ? 0 : 210, 0, 0),
        //    duration: 3000,
        //    easing: Easing.inOut(Easing.ease),
        //})
        //setTransColor2(Animated.color(theme === 'dark' ? 0 : 200, theme === 'dark' ? 0 : 200, theme === 'dark' ? 0 : 200, 1));
    }, [theme])

    const BLACK = Animated.color(0, 0, 0);
    const WHITE = Animated.color(255, 255, 255);

    return <Animated.View {...props} style={[props.style, {
        //backgroundColor: runTiming2(clock, transColor, theme === 'dark' ? BLACK : WHITE),
        backgroundColor: bg,
        //opacity: runTiming(clock, theme === 'dark' ? .7 : .5, 1, 600)
    }]}>{children}</Animated.View>
}

const { Clock, set, cond, startClock, clockRunning, timing, debug, stopClock, block, interpolate } = Animated

export function runTiming2(clock: Clock, value, dest) {
    
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    //const dest = new Value(theme === 'dark' ? 1 : 0);

    const config = {
        duration: 500,
        toValue: dest,
        easing: Easing.inOut(Easing.ease),
    };

    //const dest = theme === 'dark' ? 1 : 0;//Animated.color(theme === 'dark' ? 0 : 255, theme === 'dark' ? 0 : 210, 0, 0);
    return block([
        cond(clockRunning(clock), [
            // if the clock is already running we update the toValue, in case a new dest has been passed in
            set(config.toValue, dest),
        ], [
            // if the clock isn't running we reset all the animation params and start the clock
            set(state.finished, 0),
            set(state.time, 0),
            set(state.position, value),
            set(state.frameTime, 0),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        // we run the step here that is going to update position,
        
        timing(clock, state, config),
        //interpolate(config.toValue, {
        //    inputRange: [0, 1],
        //    outputRange: [WHITE, BLACK],
        //    extrapolate: Animated.Extrapolate.IDENTITY,
        //}),
        // if the animation is over we stop the clock
        cond(state.finished, debug('stop clock', stopClock(clock))),
        // we made the block return the updated position
        state.position,
    ]);
}

function usePrevious(value: string) {
    // The ref object is a generic container whose current property is mutable ...
    // ... and can hold any value, similar to an instance property on a class
    const ref = useRef<string | null>('#fff');

    // Store current value in ref
    useEffect(() => {
        ref.current = value;
    }, [value]); // Only re-run if value changes

    // Return previous value (happens before update in useEffect above)
    return ref.current;
}