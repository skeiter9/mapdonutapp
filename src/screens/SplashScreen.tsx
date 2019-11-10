import React from 'react';
import {SafeAreaView, View, StatusBar, Platform} from 'react-native';
import LottieView from 'lottie-react-native';
import {Navigation} from 'react-native-navigation';
import MapdonutLogo from '../components/MapdonutLogo';
import {initialMode} from 'react-native-dark-mode';

export default function SplashScreen() {
  const isDark = initialMode === 'dark';
  const bg = isDark ? '#1C1C1E' : '#F2F2F7';
  const propsStatusBar =
    Platform.OS === 'ios'
      ? {
          barStyle: isDark ? 'dark-content' : 'light-content',
          showHideTransition: 'fade',
        }
      : {
          // TODO ANDROID
        };
  return (
    <View
      style={{
        backgroundColor: bg,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StatusBar animated {...propsStatusBar} />
      <Navigation.Element elementId="LOGO_SLASH">
        <MapdonutLogo />
      </Navigation.Element>
      <SafeAreaView style={{position: 'absolute', bottom: 32}}>
        <LottieView
          source={require('../assets/spinners/10522-loading-cycle-color.json')}
          style={{width: 60, height: 60}}
          autoPlay
          loop
        />
      </SafeAreaView>
    </View>
  );
}
