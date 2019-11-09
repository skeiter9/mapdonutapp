import { Navigation } from 'react-native-navigation';
import runEpics from './runEpics';
import { getEpicMiddleware, getDispatch } from './store';
import { YellowBox } from 'react-native';
import rnnRegisterComponent from './utils/rnnRegisterComponent';
import SplashScreen from './screens/SplashScreen';
import { registerScreens } from './screenNames';

YellowBox.ignoreWarnings([
    'Remote debugger is in a background tab which may cause apps to perform slowly. Fix this by foregrounding the tab (or opening it in a separate window).',
    '`-[RCTRootView cancelTouches]` is deprecated and will be deleted soon.',
]);

rnnRegisterComponent('mapdonut.dev.splash', SplashScreen)
const dispatch = getDispatch();
runEpics(getEpicMiddleware());
const screens = registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
    dispatch({ type: 'SHOW_INITIAL_SPLASH', payload: { screens } });
});

import auth from '@react-native-firebase/auth';
import NetInfo from "@react-native-community/netinfo";
import firestore from '@react-native-firebase/firestore';

import { addEventListener as RNLocalizeListener } from "react-native-localize";
import { eventEmitter } from 'react-native-dark-mode';

eventEmitter.on('currentModeChanged', newMode => {
    dispatch({ type: 'CHANGE_THEME', payload: {
        theme: newMode === 'dark' ? newMode : 'default'
    }});
    dispatch({
        type: 'CHANGE_THEME_DEVICE', payload: {
            theme: newMode === 'dark' ? newMode : 'default'
        }
    });
})

RNLocalizeListener("change", (res) => {
    console.log({ RNLocalize_Chnage: res });
});

NetInfo.addEventListener(async (netInfo) => {
    firestore()[netInfo.isInternetReachable ? 'enableNetwork' : 'disableNetwork']();
    const action = { type: 'SAVE_NET_INFO', payload: { netInfo } };
    dispatch(action);
});

Navigation.events()
    .registerCommandCompletedListener((res) => {
        dispatch({ type: 'RNN_REGISTER_COMMAND_COMPLETED', payload: { command: res } });
    });

/*



auth().onAuthStateChanged(user => {
    dispatch({ type: 'FIREBASE_STATE_AUTH_CHANGED', payload: { user } });
});


*/






//const bottomTabEventListener = Navigation.events().registerBottomTabSelectedListener(({ selectedTabIndex, unselectedTabIndex }) => {
    //Navigation.mergeOptions('MAIN_STACK', {
    //    topBar: {
    //        visible: false,
    //        animate: false,
    //        drawBehind: false,
    //    }
    //})
//});
//const navigationButtonEventListener = Navigation.events()
//    .registerNavigationButtonPressedListener((res) => {
//        //console.log({ registerNavigationButtonPressedListener: res});
//        //dispatch({ type: 'RNN_TOPBAR_BUTTON_TAPPED', payload: res });
//    });
//const modalDismissedListener = Navigation.events()
//    .registerModalDismissedListener((res) => { //{ componentId, modalsDismissed }
//        //dispatch({ type: 'RNN_MODAL_DISSMISSED', payload: res });
//    });
/*
*/
