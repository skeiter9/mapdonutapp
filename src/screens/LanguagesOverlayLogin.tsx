import React, { useRef, useState, useEffect } from 'react';
import { RNN_screenProps } from '../@types/rnn';
import BottomSheetBehavior from 'reanimated-bottom-sheet';
import config from '../config';
import { useStore } from 'react-redux';
import { View, SafeAreaView, Image } from 'react-native';
import Button from '../components/Button';
import { getBottomSpace } from 'react-native-iphone-x-helper';

LanguagesOverlayLogin.propTypes = {
};
interface Props extends RNN_screenProps{
}
import Animated, { Easing } from 'react-native-reanimated';
import { Surface, Chip } from 'react-native-paper';
import createCachedSelector from 're-reselect';
import LanguagesList from '../components/LanguagesList';
import { StoreApp } from '../@types/redux';
const { Clock, Value, set, cond, startClock, clockRunning, timing, debug, stopClock, block, interpolate } = Animated

const selector = createCachedSelector(
    (p: any, s: StoreApp) => s.languages.lang,
    (p: any, s: StoreApp) => s.languages.words,
    () => config.LANGUAGES,
    (p: any) => p.componentId,
    (_lang, _words, items) => ({ _lang, _words, items })
)(() => `LangLoginOverlay`);

const selectorShow = createCachedSelector(
    (p: any) => p.show,
    (show) => show
)(() => `LangLoginOverlay`);

const opacityBgSelector = createCachedSelector(
    (res: any) => res.clock,
    (res: any) => res.show,
    (clock, show) => runTiming(clock, show ? 0 : 1, show ? 1 : 0, 200)
)(() => 'BG_OPACITY');
const opacityBgSelector2 = createCachedSelector(
    (res: any) => res.clock,
    (res: any) => res.show,
    (clock, show) => runTiming(clock, show ? 0 : 1, show ? 1 : 0, 200)
)(() => 'BG_OPACITY2');

const clock = new Clock();
const clock2 = new Clock();

function LanguagesOverlayLogin(props: any) {
    const show = selectorShow(props);
    const { _lang, _words, items } = selector(props, useStore().getState());
    const [ words ] = useState(_words);
    const [ lang ] = useState(_lang);
    const [_show] = useState(show);
    const bs = useRef<BottomSheetBehavior | null>(null);
    const fall = new Animated.Value(0);
    
    const op = opacityBgSelector({ clock, show });
    const op2 = opacityBgSelector({ clock, show: props.show });

    useEffect(() => {
        if (bs.current) bs.current.snapTo(props.show ? 0 : 1);
    }, [props.show]);

    return <Animated.View 
        style={{
            opacity: runTiming(clock, show ? 0 : 1, show ? 1 : 0, 200),
            position: "absolute",
            width: '100%',
            height: '100%'
        }}
    >
        <BottomSheetBehavior
            ref={bs}
            snapPoints={[240, 0]} //180
            renderContent={() => (
                <Surface style={{ paddingHorizontal: 32, paddingBottom: 32, paddingTop: 8, elevation: 4 }}
                    //onLayout={(e) => h > 0 ? null : setH(e.nativeEvent.layout.height)}
                >
                    <View style={{ alignItems: "center" }}>
                        <Chip style={{ height: 6, width: 48 }}>  </Chip>
                    </View>
                    {props.children}
                </Surface>
            )}
            initialSnap={1}
            callbackNode={fall}
            enabledInnerScrolling={false}
            onCloseEnd={() => props.setShow(false)}
        />

        <Button
            onPress={() => {
                props.setShow(false);
            }}
        >
            <Animated.View
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'black',
                    opacity: runTiming(clock2, show ? 0 : .4, show ? .4 : 0, 400),
                }}
            >

            </Animated.View>
        </Button>

        
    </Animated.View>
}

function runTiming(clock, value, dest, duration) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0),
        frameTime: new Value(0),
    };

    const config = {
        duration,
        toValue: new Value(0),
        easing: Easing.inOut(Easing.ease),
    };

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
        // we run the step here that is going to update position
        timing(clock, state, config),
        // if the animation is over we stop the clock
        cond(state.finished, debug('stop clock', stopClock(clock))),
        // we made the block return the updated position
        state.position,
    ]);
}

export default LanguagesOverlayLogin//LanguagesOverlayLogin;
