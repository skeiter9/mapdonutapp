import React from 'react'
import { View, Text } from 'react-native'
import MaskedView from '@react-native-community/masked-view';
import LottieView from 'lottie-react-native';
import { viewportWidth } from '../utils/dimentions';
import LinearGradient from 'react-native-linear-gradient';

const MapdonutName = (props: any) => {
    const { color, height } = props;
    const _color = color || '#fff';
    const _height = height || 56;
    const maskView = <MaskedView
        style={{ flex: 1, flexDirection: 'row', height: '100%', width: '100%' }}
        maskElement={
            <View
                style={{
                    backgroundColor: 'rgba(0,0,0,0)',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text style={{ fontFamily: 'FredokaOne-Regular', textAlign: 'center', fontSize: 48, fontWeight: 'bold' }}>
                    Mapdonut
                </Text>
            </View>
        }>
        {/* Shows behind the mask, you can put anything here, such as an image */}
        <View style={{ backgroundColor: _color, width: '100%', height: '100%', opacity: 0 }}></View>
        <LinearGradient useAngle angle={180} colors={[_color, _color, '#30D158', '#30D158']}
            style={{position: "absolute", width: '100%', height: '100%', opacity: 1 }} />
        <LottieView
            //source={require('../assets/lottie/backgrounds/8408-app-background.json')}
            source={require('../assets/lottie/backgrounds/8934-waves.json')}
            style={{position: "absolute", width: '100%', height: '100%', opacity: .5, transform: [
                {translateY: 2}
            ] }}
            autoPlay loop
            speed={1}
            autoSize={false}
        />
    </MaskedView>
    return <View style={{ height: _height }}>
        {maskView}
    </View>
}

export default MapdonutName
