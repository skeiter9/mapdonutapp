import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {View, Image, SafeAreaView} from 'react-native';
import {themeSelector, languageSelector} from '../utils/appSelectors';
import {useSelector} from 'react-redux';
import {Title, Paragraph, Surface, Button} from 'react-native-paper';
import {viewportHeight, wp, viewportWidth} from '../utils/dimentions';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {RNN_screenProps} from '../@types/rnn';
import Animated, {Easing} from 'react-native-reanimated';
import {closeModal} from '../utils/rrn';

const {
  Clock,
  Value,
  set,
  cond,
  startClock,
  clockRunning,
  timing,
  debug,
  stopClock,
  block,
  interpolate,
} = Animated;

Tutorial.propTypes = {};
interface Props extends RNN_screenProps {}
export default function Tutorial(props: Props) {
  const {componentId} = props;
  const {themeVariables} = useSelector(themeSelector);
  const {words} = useSelector(languageSelector);

  const slideWidth = wp(75);
  const itemHorizontalMargin = wp(2);

  const sliderWidth = viewportWidth;
  const itemWidth = slideWidth + itemHorizontalMargin * 2;

  const carouselRef = useRef<Carousel>(null);
  const [sliderActiveSlide, setSliderActiveSlide] = useState(0);

  const data = [
    {
      title: words.TRAVEL_JOURNAL,
      description: words.TRAVEL_JOURNAL_DESCRIPTION,
      img: 'onboarding-explore', //require('../assets/welcome/onboarding-explore.png'),
    },
    {
      title: words.WELCOME_CONNECT_WORLD,
      description: words.WELCOME_CONNECT_WORLD_DESCRIPTION,
      img: 'onboarding-explore-2', //require('../assets/welcome/onboarding-explore-2.png'),
    },
    {
      title: words.WELCOME_OFFLINE,
      description: words.WELCOME_OFFLINE_DESCRIPTION,
      img: 'backpack', //require('../assets/welcome/backpack.png'),
    },

    {
      title: words.WELCOME_READY_TO_TRAVEL,
      description: words.WELCOME_READY_TO_TRAVEL_DESCRIPTION,
      img: 'onboarding-travel', //require('../assets/welcome/onboarding-travel.png'),
    },
    {
      title: words.WELCOME_EVENTS,
      description: words.WELCOME_EVENTS_DESCRIPTION,
      img: 'onboarding-events', //require('../assets/welcome/onboarding-events.png'),
    },
    {
      title: words.WELCOME_LINK,
      description: words.WELCOME_LINK_DESCRIPTION,
      img: 'onboarding-conection', //require('../assets/welcome/onboarding-conection.png'),
      imgIsRectangle: true,
    },
  ];

  const HEIGHT = 470;

  const _renderItem = ({item}: any) => (
    <Surface
      style={{
        height: HEIGHT,
        borderRadius: 16,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
        //borderWidth: 2,
        //borderColor: themeVariables.colors.surface,
        backgroundColor: themeVariables.colors.background,
        elevation: 6,
      }}>
      <Image
        source={{uri: item.img}}
        style={{width: '100%', height: item.imgIsRectangle ? 200 : 290}}
      />
      <View>
        <Title style={{textAlign: 'center'}}> {item.title} </Title>
        <Paragraph style={{textAlign: 'center'}}>
          {' '}
          {item.description}{' '}
        </Paragraph>
      </View>
    </Surface>

  const clock = new Clock();

  return (
    <Animated.View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        backgroundColor: themeVariables.colors.surface,
        //opacity: runTiming(clock, 0, 1, 1000),
      }}>
      <View style={{height: HEIGHT + 16}}>
        <Carousel
          ref={carouselRef}
          data={data}
          renderItem={_renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          onSnapToItem={(index: any) => setSliderActiveSlide(index)}
        />
      </View>

      <Pagination
        dotsLength={data.length}
        activeDotIndex={sliderActiveSlide}
        containerStyle={
          {
            //padding: 16
          }
        }
        dotColor={themeVariables.colors.accent}
        dotStyle={{
          width: 16,
          height: 16,
          borderRadius: 16,
          marginLeft: 8,
          marginRight: 8,
        }}
        inactiveDotColor={themeVariables.colors.background}
        inactiveDotOpacity={0.9}
        inactiveDotScale={0.6}
        carouselRef={carouselRef.current}
        tappableDots={!!carouselRef.current}
      />

      <Button
        color={themeVariables.colors.text}
        style={{alignSelf: 'center', marginTop: 16}}
        onPress={() => closeModal(componentId)}
        mode="text"
        compact>
        {words.SKIP_TUTORIAL}
      </Button>
    </Animated.View>
  );
}
