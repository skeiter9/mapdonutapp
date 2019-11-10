import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, Text, SafeAreaView} from 'react-native';
import {wp, viewportHeight} from '../utils/dimentions';
import {languageSelector} from '../utils/appSelectors';
import {Title, Paragraph} from 'react-native-paper';
import Button from '../components/Button';
import {useSelector, useDispatch} from 'react-redux';
import {RNN_screenProps} from '../@types/rnn';
import {closeModal} from '../utils/rrn';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

ThemesOverlayLogin.propTypes = {};
interface Props extends RNN_screenProps {}
export default function ThemesOverlayLogin(props: Props) {
  const {componentId} = props;
  const width = wp(40);
  const height = wp(40, 'vertical');
  const {words} = useSelector(languageSelector);
  const dispatch = useDispatch();

  return (
    <TouchableWithoutFeedback
      onPressIn={() => {
        closeModal(componentId);
      }}>
      <SafeAreaView>
        <View
          style={{
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View>
            <Title style={{textAlign: 'center'}}>
              {words.CHOOSE_THEME_LOGIN}
            </Title>
            <Paragraph style={{textAlign: 'center'}}>
              {words.CHOOSE_THEME_LOGIN_DESCRIPTION}
            </Paragraph>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              onPress={() => {
                closeModal(componentId);
                dispatch({type: 'CHANGE_THEME', payload: {theme: 'light'}});
              }}>
              <Image source={{uri: 'light'}} style={{height, width}} />
            </Button>
            <Button
              onPress={() => {
                closeModal(componentId);
                dispatch({type: 'CHANGE_THEME', payload: {theme: 'dark'}});
              }}>
              <Image source={{uri: 'dark'}} style={{height, width}} />
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}
