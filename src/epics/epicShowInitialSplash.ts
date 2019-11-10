import {action$, state$} from '../@types/global';
import {mapTo, switchMap, tap, map} from 'rxjs/operators';
import {from} from 'rxjs';
import {LayoutComponent, Navigation} from 'react-native-navigation';
import {SCREEN_SPLASH, registerScreens, SCREEN_LOGIN} from '../screenNames';
import {Platform} from 'react-native';
import {check, PERMISSIONS, checkNotifications} from 'react-native-permissions';
import {goToHome, goToLogin, LoginRnnComponent} from '../utils/rnnRoot';
import {getUserData} from '../models/user';
import {getDispatch, getStateApp} from '../store';
import {THEME_DEFAULT, LANGUAGE_DEFAULT} from '../config.app';
import of from 'ramda/es/of';
import * as RNLocalize from 'react-native-localize';
import {getCountriesByCallingCode} from '../mapdonut_libs/countries/countries';
import runI18next from '../utils/initializeI18next';
import {Mapdonut_Languages_Availables} from '../@types/languagesReducer';
import DefaultPreference from 'react-native-default-preference';
import {APP_Themes_Availables} from '../@types/themeReducer';

export default (action$: action$, state$: state$) =>
  action$.ofType('SHOW_INITIAL_SPLASH').pipe(
    switchMap(() => from(rnnSetRootSplash())),
    switchMap(() => from(runAfterSplash()), root => root),
    tap(root => getDispatch()({type: 'SET_ROOT', payload: {root}})),
    switchMap(() => {
      const dispatch = getDispatch();
      const u = state$.value.app.currentUserFirebase;
      const isOnline = !state$.value.connection.isOffline;
      //console.log('Run after initial Splashscreena and before login/home', { u, isOnline});
      if (!u) {
        // No Logged
        return from(
          Promise.all([DefaultPreference.get('bgLogin')]).then(([bgLogin]) => {
            return Navigation.push('MAIN_STACK', {
              component: LoginRnnComponent({
                bgLogin: bgLogin,
                //colors: state$.value.theme.themeVariables.colors,
                componentId: SCREEN_LOGIN,
              }),
            });
          }),
        );
      }

      return of(null);

      //return isLogged ? goToHome() : goToLogin(bgLogin)
    }),
    mapTo({type: 'APP_READY', payload: {}}),
  );

function rnnSetRootSplash() {
  const comp: LayoutComponent = {
    id: SCREEN_SPLASH,
    name: SCREEN_SPLASH,
    passProps: {},
    options: {
      topBar: {
        visible: false,
      },
    },
  };

  return Navigation.setRoot({
    root: {
      stack: {
        id: 'MAIN_STACK',
        options: {
          animations: {
            setRoot: {
              waitForRender: true,
            },
          },
          topBar: {
            visible: false,
          },
        },
        children: [{component: comp}],
      },
    },
  });
}

function getInitialPermissions() {
  if (Platform.OS === 'ios') {
    Promise.all([
      checkNotifications(),
      check(PERMISSIONS.IOS.CAMERA),
      check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE),
      check(PERMISSIONS.IOS.MEDIA_LIBRARY),
      check(PERMISSIONS.IOS.PHOTO_LIBRARY),
      check(PERMISSIONS.IOS.SIRI),
      check(PERMISSIONS.IOS.CALENDARS),
      check(PERMISSIONS.IOS.CONTACTS),
      check(PERMISSIONS.IOS.REMINDERS),
      //check(PERMISSIONS.IOS.MICROPHONE),
    ]).then(
      ([
        notif,
        cameraStatus,
        locationWhenInUseStatus,
        mediaLibrary,
        photoLibrary,
        siri,
        calendars,
        contacts,
        reminders,
        //mic
      ]) => {
        return {
          permissions: {
            notifications: notif,
            camera: cameraStatus,
            locationWhenInUse: locationWhenInUseStatus,
            reminders,
            contacts,
            mediaLibrary,
            siri,
            calendars,
            photoLibrary,
            //mic
          },
        };
      },
    );
  } else if (Platform.OS === 'android') {
    //TODO Android
    return Promise.resolve({});
  }
  return Promise.resolve({});
}

function getIconForBottom() {}

function runAfterSplash() {
  const APP_PREFERENCES = [
    'themeName',
    'language',
    'ccodeSelected',
    'ccodeSelectedCca2',
    'phoneNumber',
    'bgLogin',
  ];
  return Promise.all(
    APP_PREFERENCES.map(name => DefaultPreference.get(name)),
  ).then(
    ([
      themeName,
      language,
      _ccodeSelected,
      _ccodeSelectedCca2,
      _phoneNumber,
    ]) => {
      const dispatch = getDispatch();
      const storeState = getStateApp();

      const lang = (language ||
        storeState.languages.lang ||
        LANGUAGE_DEFAULT) as Mapdonut_Languages_Availables;
      const theme = (themeName ||
        storeState.theme.theme ||
        THEME_DEFAULT) as APP_Themes_Availables;

      const deviceDefaultCcode = (cca2Device => {
        const ALL_COUNTRIES = getCountriesByCallingCode(
          storeState.languages.lang,
        );
        const COUNTRY = ALL_COUNTRIES.find(c => c.cca2 === cca2Device);
        return {
          ccodeSelected: COUNTRY ? COUNTRY.callingCode[0] : null,
          ccodeSelectedCca2: COUNTRY ? COUNTRY.cca2 : null,
        };
      })(RNLocalize.getCountry());

      const ccodeSelected =
        _ccodeSelected || deviceDefaultCcode.ccodeSelected || '1';
      const ccodeSelectedCca2 =
        _ccodeSelectedCca2 || deviceDefaultCcode.ccodeSelectedCca2 || 'US';
      const phoneNumber = _phoneNumber || '';

      dispatch({type: 'CHANGE_THEME', payload: {theme}});
      dispatch({type: 'SET_LANGUAGE', payload: {lang}});
      dispatch({
        type: 'UPDATE_TMP_DATA',
        payload: {
          ccodeSelected,
          ccodeSelectedCca2,
          phoneNumber,
        },
      });
      const u = storeState.app.currentUserFirebase;
      const isOffline = storeState.connection.isOffline;
      return runI18next(lang, u ? 'Logged' : 'NoLogged', isOffline);
    },
  );
}
