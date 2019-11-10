import React, {useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, Text, Portal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {languageSelector, themeSelector} from '../utils/appSelectors';
import {RNN_screenProps} from '../@types/rnn';
import SimpleSetting from '../components/SimpleSetting';
import Hr from '../components/Hr';
import UserSettingsUnits from '../components/UserSettingsUnits';
import createCachedSelector from 're-reselect';
import {StoreApp} from '../@types/redux';
import {getCurrencySymbol} from '../mapdonut_libs/currencies/currencies';
import {View, Image} from 'react-native';
import BsSimple from '../components/BsSimple';
import LanguagesList from '../components/LanguagesList';
import Animated from 'react-native-reanimated';
import ButtonView from '../components/Button';
import {wp} from '../utils/dimentions';
import {Flag} from 'react-native-svg-flagkit';
import {Mapdonut_Country_Code} from '../@types/mapdonut.languages';
import ThemesList from '../components/ThemesList';
const {Clock} = Animated;

const valueSelector = createCachedSelector(
  (s: StoreApp) => s.app.currentUser.prefererdCurrencies,
  refererdCurrencies => {
    console.log({refererdCurrencies});
    return refererdCurrencies.map(iso => getCurrencySymbol(iso)).join(', ');
  },
)(() => 'selectCurrency_label');

const passportsSelector = createCachedSelector(
  (s: StoreApp) => s.app.currentUser.passports,
  x => x,
)(() => 'selectPassports');

Settings.propTypes = {};
interface Props extends RNN_screenProps {}
export default function Settings(props: Props) {
  const {componentId} = props;
  const dispatch = useDispatch();
  const {words, lang} = useSelector(languageSelector);
  const {themeVariables, theme} = useSelector(themeSelector);
  const [showLangs, setShowLangs] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const currencies = useSelector(valueSelector);
  const passports = useSelector(passportsSelector);

  const clock = new Clock();

  const widthTheme = wp(20);
  const heightTheme = wp(20, 'vertical');

  return (
    <View>
      <Animated.ScrollView
        bounces={false}
        style={
          {
            //paddingTop: __DEV__ ? 100 : 0,
            //backgroundColor: themeVariables.colors.surface
            //opacity: runTiming(clock, (showLangs || showThemes) ? 1 : .25, (showLangs || showThemes) ? .25 : 1, 300)
          }
        }
        contentContainerStyle={{
          height: '100%',
        }}>
        <SimpleSetting
          onPress={() => setShowLangs(true)}
          title={words.LANGUAGE}
          value={words[`LANG_${lang.toUpperCase()}`]}
        />
        <Hr mb={16} />

        <SimpleSetting
          onPress={() => setShowThemes(true)}
          title={words.THEME}
          value={theme}
        />
        <Hr mb={16} />

        <SimpleSetting
          onPress={() => dispatch({type: 'OPEN_PASSPORTS', payload: {}})}
          title={words.PASSPORT}
          value={''}
          placeholder={words.SET_PASSPORT}
          valueComponent={
            passports.length === 0 ? null : (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {passports.map((p, i) => (
                  <FlagPassport countryCode={p.countryCode} key={i} />
                ))}
              </View>
            )
          }
        />
        <Hr mb={16} />

        <SimpleSetting
          onPress={() => dispatch({type: 'OPEN_CURRENCIES', payload: {}})}
          title={words.CURRENCIES}
          value={currencies}
        />
        <Hr mb={16} />

        <SimpleSetting onPress={() => {}} title={words.UNITS} value={''} />
        <UserSettingsUnits />

        <Button
          color={themeVariables.colors.disabled}
          mode="contained"
          style={{maxWidth: 160, alignSelf: 'center', marginTop: 86}}
          onPress={() => {
            dispatch({type: 'LOGOUT', payload: {componentId}});
          }}>
          {words.LOGOUT}
        </Button>
      </Animated.ScrollView>
      <BsSimple snaps={[290, 0]} show={showLangs} setShow={setShowLangs}>
        <LanguagesList
          select={l => {
            dispatch({type: 'CHANGE_LANGUAGE', payload: {lang: l}});
            setShowLangs(false);
            return [l];
          }}
        />
      </BsSimple>
      <BsSimple snaps={[180, 0]} show={showThemes} setShow={setShowThemes}>
        <ThemesList
          width={widthTheme}
          height={heightTheme}
          onPress={themeName => {
            dispatch({type: 'CHANGE_THEME', payload: {theme: themeName}});
            setShowThemes(false);
          }}
        />
      </BsSimple>
    </View>
  );
}

function FlagPassport({countryCode}: {countryCode: Mapdonut_Country_Code}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 8}}>
      <Flag id={countryCode} width={20} height={20} />
    </View>
  );
}
