import React, { useState } from 'react';
import { View, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import VideoBackground, { VideoView } from '../components/VideoBackground';
import MapdonutName from '../components/MapdonutName';
import MapdonutLogo from '../components/MapdonutLogo';
import { Navigation } from 'react-native-navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RNN_screenProps } from '../@types/rnn';
import createCachedSelector, { createStructuredCachedSelector } from 're-reselect';
import { StoreApp } from '../@types/redux';
import Icon from 'react-native-dynamic-vector-icons';
import LanguagesList from '../components/LanguagesList';
import BsSimple from '../components/BsSimple';
import Button from '../components/Button';
import Text from '../components/TextTranslation';
import { getFlagByLanguage } from '../utils/languages';
import times from 'ramda/es/times';
import identity from 'ramda/es/identity';
import map from 'ramda/es/map';
import { ScrollView, RectButton, Switch, BorderlessButton } from 'react-native-gesture-handler';
import { Flag } from 'react-native-svg-flagkit';
import LinearGradient from 'react-native-linear-gradient';

export interface LoginProps extends RNN_screenProps{
    bgLogin: string,
}

const viewSelector = createCachedSelector(
    //(s: StoreApp) => s.languages.words,
    //(s: StoreApp) => s.theme.themeVariables.colors,
    //(s: StoreApp) => s.theme.theme,
    (s: any) => s,
    (s: any, props: LoginProps) => props.componentId,
    (s: any, props: LoginProps) => props.bgLogin,
    ({words, colors, theme, lang}, componentId, bgLogin) => {
        const bgColors = [colors.background];
        //const lottieFile = lottieBgs[bgLogin]
        return { bgLogin, componentId, words, colors, bgColors, theme, lang } 
    }
)(() => `Login_View`)

export const _selectorStore = createStructuredCachedSelector<StoreApp, any>({
    colors: (state: StoreApp) => state.theme.themeVariables.colors,
    words: (state: StoreApp) => state.languages.words,
    theme: (state: StoreApp) => state.theme.theme,
    lang: (state: StoreApp) => state.languages.lang,
})(
    (a) => ('APP_LANGUAGE__' + a.languages.lang)
)

export default function (props: LoginProps) {
    const [showLangs, setShowLangs] = useState(false);
    const dispatch = useDispatch();
    const { bgLogin, componentId, bgColors, colors, theme, words, lang } = viewSelector(useSelector(_selectorStore), props);
    const [bgVideo, setBgVideo] = useState(bgLogin || 'video_6' );
    return <VideoBackground
        uri={bgVideo}
        colors={bgColors}
    >
        <>
            <StatusBar barStyle={theme === 'dark' ? "light-content" : "dark-content"} animated/>

            <LinearGradient
                useAngle
                angle={0}
                //start={{ x: 0.95, y: 0.95 }}
                colors={[colors.background, colors.background, 'transparent', 'transparent']}
            >
                    <View style={{
                            justifyContent: "flex-end",
                            alignItems: "center",
                            flex: 9,
                            //paddingBottom: viewportHeight / 10
                            paddingBottom: 32
                        }}
                    >
                        <Navigation.Element elementId='LOGO_LOGIN'>
                            <MapdonutLogo />
                        </Navigation.Element>
                        <Navigation.Element elementId='MAPDONUT_NAME_LOGIN'>
                            <MapdonutName color={colors.primary} />
                        </Navigation.Element>
                        <Button
                            icon='phone-portrait'
                            onPress={() => {
                                dispatch({ type: 'SHOW_PHONE_LOGIN', payload: { componentIdBase: componentId } })
                            }}
                            translationCode='LOGIN_WITH_PHONE'
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        flex: 1,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            paddingHorizontal: 16,
                            justifyContent: "space-between",
                            width: '100%',
                            transform: [
                                { translateY: -12 }
                            ]
                        }}>
                            <View style={{ flex: 1 }}>
                                <BorderlessButton
                                    style={{ flexDirection: "row", alignItems: 'center', justifyContent: "flex-start" }}
                                    onPress={() => setShowLangs(true)}
                                >
                                    <Icon name="ios-arrow-down" type="Ionicons"
                                        style={{ color: colors.text, bottom: -2, marginRight: 8 }} />
                                    <Flag id={getFlagByLanguage(lang)} width={20} />
                                    <Text style={{ marginLeft: 4 }} >
                                        {lang.toUpperCase()}
                                    </Text>
                                </BorderlessButton>
                            </View>

                            <Text translationCode='USER_TERMS' color='placeholder'
                                onPress={() => dispatch({ type: 'SHOW_WEBVIEW', payload: { title: words.USER_TERMS, componentIdBase: componentId, url: 'https://www.lipsum.com' } })}
                            />
                            <View style={{ flexDirection: "row", alignItems: 'center', flex: 1, justifyContent: "flex-end" }}>
                                <Icon name="ios-contrast" type="Ionicons"
                                    onPress={() => dispatch({ type: 'OPEN_THEMES_LOGIN', payload: { componentId } })}
                                    style={{ color: colors.text, marginRight: 4 }} />
                                <Switch
                                    //color={colors.primary}
                                    value={theme === 'dark'}
                                    onValueChange={(v) => dispatch({ type: 'CHANGE_THEME', payload: { theme: !v ? 'light' : 'dark' } })}
                                />
                            </View>

                        </View>
                    </View>

            </LinearGradient>
            
            <BsSimple snaps={[310, 0]} show={showLangs} setShow={setShowLangs}>
                <LanguagesList<string> select={(l) => {
                    dispatch({ type: 'CHANGE_LANGUAGE', payload: { lang: l } });
                    setShowLangs(false);
                    return [l];
                }} />
            </BsSimple>
        </>
        
    </VideoBackground>
}

function SwiperVideoViews(props: any) {
    const { borderColor, onPress } = props;
    const VIDEOS_URI = map(x => (`video_${x}`), times(identity, 7));
    const w = 42;
    return <ScrollView horizontal contentContainerStyle={{ paddingHorizontal: 16, justifyContent: 'center'  }}>
        {
            VIDEOS_URI.map(uri => {
                return (
                    <View key={uri} >
                        <VideoView
                            uri={uri} width={w} borderColor={borderColor} onPress={onPress.bind(null, uri)}
                        />
                    </View>
                )
            })
        }
    </ScrollView>
}

/**** 
 * 
 * 
 * <Button color={colors.primary}
                            onPress={() => {
                                dispatch({ type: 'SHOW_PHONE_LOGIN', payload: { componentIdBase: componentId } })
                            }}
                            icon={'cellphone'}
                            mode="outlined"
                            compact style={{ width: 280 }}
                        >
                            {words.LOGIN_WITH_PHONE}
                        </Button>
                        <Button color={colors.primary}
                            onPress={() => {
                                dispatch({ type: 'LOGIN_WITH_FB', payload: { componentIdBase: componentId } })
                            }}
                            icon={'facebook'}
                            mode="outlined"
                            compact style={{ width: 280 }}
                        >
                            {words.LOGIN_WITH_FB}
                        </Button>
 * 
 * 
 * 
 * <Button mode="outlined" onPress={() => {
                        dispatch({ type: 'SHOW_TUTORIAL', payload: { componentIdBase: componentId } })
                    }}>
                        {words.SHOW_WELCOME}
                    </Button>
 * 
 * 
 * <View style={{ flexDirection: "row", alignItems: 'center', flex: 2,
                            width: '100%',
                            opacity: 0
                        }}
                        >
                            <SwiperVideoViews borderColor={colors.accent} onPress={(uri) => setBgVideo(uri)} />
                        </View>
 * 
 * 
 * <View style={{ flex: 2 }}>
 * 
                    //dispatch({ type: 'SHOW_WEBVIEW', payload: { title: words.NEED_HELP_LOGIN, componentIdBase: componentId, url: 'https://www.lipsum.com' } })
 *
                onPress={() => dispatch({ type: 'SHOW_WEBVIEW', payload: { title: words.USER_TERMS, componentIdBase: componentId, url: 'https://www.lipsum.com' } })}
 *
            
            <Button onPress={onPress} > {words.NEED_HELP_LOGIN} </Button>

 * 
 * 
 */