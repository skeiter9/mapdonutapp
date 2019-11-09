import React from 'react'
import { View, StyleSheet, Image, StatusBar } from 'react-native'
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types'
import LottieView from 'lottie-react-native';
import { viewportHeight, viewportWidth } from '../utils/dimentions';
import Layout from './Layout';
import ButtonView from './Button';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

const BASE_BG_LOTTIES = '../assets/lottie/backgrounds/';
const BASE_BG_VIDEOS = '../assets/video-background/res';

const lottieBgs = {
    //lottieDark: require(BASE_BG_LOTTIES + '10201-background-full-screen-night.json'),
    //lottieLight: require(BASE_BG_LOTTIES + '10590-summer.json'),
    //gradiant: require(`${BASE_BG_LOTTIES}/434-gradient-animated-background.json`)
}

const videos = {
    //'video_0': require(`${BASE_BG_VIDEOS}/video_0.mp4`),
    //'video_1': require(`${BASE_BG_VIDEOS}/video_1.mp4`), // Remote urls
    //'video_2': require(`${BASE_BG_VIDEOS}/video_2.mp4`), // Remote urls
    //'video_3': require(`${BASE_BG_VIDEOS}/video_3.mp4`), // Remote urls
    //'video_4': require(`${BASE_BG_VIDEOS}/video_4.mp4`), // Remote urls
    //'video_5': require(`${BASE_BG_VIDEOS}/video_5.mp4`), // Remote urls
    'video_6': require(`${BASE_BG_VIDEOS}/video_6.mp4`), // Remote urls //Train
}

const POSTERS = {
    //'video_0': require(`${BASE_BG_VIDEOS}/video_0.jpg`),
    //'video_1': require(`${BASE_BG_VIDEOS}/video_1.jpg`),
    //'video_2': require(`${BASE_BG_VIDEOS}/video_2.jpg`),
    //'video_3': require(`${BASE_BG_VIDEOS}/video_3.jpg`),
    //'video_4': require(`${BASE_BG_VIDEOS}/video_4.jpg`),
    //'video_5': require(`${BASE_BG_VIDEOS}/video_5.jpg`),
    'video_6': require(`${BASE_BG_VIDEOS}/video_6.jpg`),
}

VideoBackground.propTypes = {
    children: PropTypes.element.isRequired,
    uri: PropTypes.string.isRequired,
    colors: PropTypes.arrayOf(PropTypes.string),
}

type VideoFiles = 'video_1' | 'videos_2' | string;

interface Props {
    uri: VideoFiles,
    children: JSX.Element,
    colors: string[]
}

interface PropsVideoView {
    uri: VideoFiles,
    onPress: () => void,
    borderColor: string,
    width?: number
}


export function VideoView(props: PropsVideoView) {
    const { borderColor, width, uri } = props;
    const W = width || 48;
    return (
        <ButtonView onPress={props.onPress} style={{ width: 60 }}>
            <Image
                style={{ borderWidth: 2, borderColor, width: W, height: W, borderRadius: W }}
                source={{ uri }}
            />
        </ButtonView>
    )
}

function VideoBackground(props: Props) {
    const { colors, uri, children } = props;
    const _styles = StyleSheet.create({
        full: {
            position: 'absolute',
            height: viewportHeight,
            width: viewportWidth + 90,
            //height: '100%',
            //width: '100%',
        }
    });
    return (
        <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center',
            //backgroundColor: 'green'
        }}>
            <>
                <Video
                    style={{
                        ..._styles.full,
                        height: viewportHeight,
                        transform: [
                            { translateY: viewportHeight * -0.25 }
                        ]
                        //height: getStatusBarHeight() + (viewportWidth * 0.45) + (viewportWidth  * (9 / 16)), top: 0
                    }}
                    repeat
                    fullscreen={true}
                    controls={false}
                    poster={uri}
                    posterResizeMode={'cover'}
                    source={videos[uri]}
                    muted
                    translateY={300}
                    resizeMode={'cover'}
                />

                <LinearGradient
                    style={{ ..._styles.full, width: viewportWidth,
                        height: viewportHeight * 0.6, top: 0, opacity: .5
                    }}
                    useAngle angle={0}
                    colors={['transparent', colors[0]]}
                />
            </>
            {children}
        </View>
    )
}

export default VideoBackground;

/** 
 *
 * 
 * <Layout style={{ ..._styles.full,
                    height: viewportHeight * 0.1, bottom: 0, opacity: 0
                }}
                ></Layout>


                <LottieView source={lottieBgs.gradiant}
                    style={{ ..._styles.full, opacity: 0.25 }}
                    autoPlay
                    loop
                    autoSize={true}
                    resizeMode={'cover'}
                />
 * 
 * 
 * 
 * 

 * type === 'lottieDark' || type === 'lottieLight' ?
                    <>
                        <LottieView source={lottieBgs[type]}
                            style={{ ..._styles.full }}
                            transform={[{ translateY: viewportHeight * -0.3 } ]}
                            trans
                            autoPlay
                            loop
                            autoSize={true}
                            resizeMode={'cover'}
                        />
                    </>
                : null
 * 
 * 
 * 
 */
