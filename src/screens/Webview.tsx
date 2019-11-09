import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import LottieView from 'lottie-react-native';
WebviewScreen.propTypes = {
};
interface Props {
    url: string,
    title: string
}
export default function WebviewScreen(props: Props) {
    const { url } = props;
    const [hideLoader, setHideLoader] = useState(false);
    return <View style={{ width: '100%', height: '100%' }}>
        <WebView
            source={{ uri: url }}
            style={{ width: '100%', height: '100%' }}
            onLoadEnd={() => setHideLoader(true) }
        />
        {hideLoader ? null :  <View style={{ justifyContent: 'center', alignItems: "center", width: '100%', height: '100%', position: 'absolute' }}>
            <LottieView source={require('../assets/spinners/10522-loading-cycle-color.json')}
                style={{
                    height: 120,
                    width: 120,
                    bottom: 0
                }}
                autoPlay
                loop
                autoSize={true}
            /> 
        </View>}
        
    </View>
}