import React, { useRef, useState, useEffect } from 'react';
import BottomSheetBehavior from 'reanimated-bottom-sheet';
import { View, SafeAreaView, Image, TouchableWithoutFeedback } from 'react-native';
const { Clock, Value, set, cond, startClock, clockRunning, timing, debug, stopClock, block, interpolate } = Animated

BsSimple.propTypes = {
};
interface Props {
    snaps: number[],
    show: boolean,
    children: JSX.Element,
    setShow: (v: boolean) => void
}
import Animated from 'react-native-reanimated';
import { Surface, Chip } from 'react-native-paper';
import createCachedSelector from 're-reselect';
import { runTiming } from '../utils/animations';
import { useSelector } from 'react-redux';
import { themeSelector } from '../utils/appSelectors';
import Layout from './Layout';
//const { Clock } = Animated

const selectorShow = createCachedSelector(
    (p: Props) => p.show,
    (p: Props) => p.snaps,
    (show, snaps) => ({ show, snaps })
)(() => `LangLoginOverlay`);

function BsSimple(props: Props) {
    const { snaps, children, show, setShow } = props;
    const [isRunning, setIsRunning] = useState(false);
    const bs = useRef<BottomSheetBehavior | null>(null);
    const fall = useRef(new Animated.Value(0)).current;
    const clock = new Clock();
    const clock2 = new Clock();
    useEffect(() => {
        if (!bs.current) return;
        //if (isRunning) return;
        bs.current.snapTo(show ? 0 : 1);
    }, [show, isRunning]);

    return <Animated.View
        style={{
            //opacity: runTiming(clock, show ? 0 : 1, show ? 1 : 0, 200),
            //opacity: show ? 1 : 0,
            position: "absolute",
            width: '100%',
            height: '100%',
            //opacity: .4,
            //backgroundColor: 'green',
            //backgroundColor: show ? 'green' : 'red',
            
        }}
        pointerEvents={show  ? 'auto' : 'none'}
    >
        <BottomSheetBehavior
            ref={bs}
            snapPoints={snaps} //180  
            renderContent={() => <Content _children={children} />}
            initialSnap={1}
            callbackNode={fall}
            enabledInnerScrolling={false}
            onOpenStart={() => setIsRunning(true)}
            onCloseEnd={() => setIsRunning(false)}
            onCloseStart={() => {
                setShow(false);
            }}
        />

        {
            isRunning ?
                <TouchableWithoutFeedback
                    onPress={() => {
                        setShow(false);
                        if (bs.current) bs.current.snapTo(1);
                    }}
                >
                    <Animated.View
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#000',
                            //opacity: Animated.add(0.1, Animated.multiply(fall, 0.9)),
                            opacity: runTiming(clock2, show ? 0 : .6, show ? .6 : 0, 300),
                        }}
                    />
                </TouchableWithoutFeedback> 
                : null
        }

        

    </Animated.View>
}

function Content(props: any) {
    const colors = useSelector(themeSelector).themeVariables.colors;
    return (
        <Layout
            color='surface'
            style={{
                paddingHorizontal: 16, paddingBottom: 32, paddingTop: 16, elevation: 4,
            }}
        ><>
            <Chip style={{ height: 6, width: 48, alignSelf: 'center', backgroundColor: colors.background }}>  </Chip>
            {props._children}
        </></Layout>
    )
}

export default BsSimple//BsSimple;
