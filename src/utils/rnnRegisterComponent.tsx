import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import getStore, { getStateApp } from '../store';
import { Provider as PaperProvider } from 'react-native-paper';

export default function rnnRegisterComponent(key: string, ScreenComponent: any) {
    return Navigation.registerComponent(key, () => props => <Provider store={getStore()} >
        <ScreenComponent {...props} > </ScreenComponent>
    </Provider>, () => gestureHandlerRootHOC(ScreenComponent));
}

/** 
 * 
        <PaperProvider theme={getStateApp().theme.themeVariables as any}>
        </PaperProvider>

 *
 * 
 * 
 */