import firestore from '@react-native-firebase/firestore';
import {action$, state$} from '../@types/global';
import {ofType} from 'redux-observable';
import {
  exhaustMap,
  mapTo,
  map,
  filter,
  tap,
  switchMap,
  catchError,
} from 'rxjs/operators';
import {saveExtraDataUser, getCurrentUserUid} from '../models/user';
import {from, of} from 'rxjs';
import {
  Navigation,
  Options,
  OptionsModalPresentationStyle,
  OptionsModalTransitionStyle,
} from 'react-native-navigation';
import {SCREEN_SELECT_PASSPORT, SEARCHBAR_IN_TOPBAR} from '../screenNames';
import {
  getAllCountries,
  getCountriesInOrderAlphabetic,
  getCountriesByCallingCode,
} from '../mapdonut_libs/countries/countries';
import {
  Mapdonut_Country,
  mapdonut_country_available_translations,
} from '../mapdonut_libs/countries/types';
import {ItemSearchBarList} from '../@types/searchBarList';
import getStore, {getDispatch} from '../store';
import {isLoggedPipe} from '../utils/epicUtils';
import {applyTheme} from '../utils/rrn';
import {getThemeVariables} from '../reducers/themeReducer';
import DefaultPreference from 'react-native-default-preference';

export const updateCurrentUser = (action$: action$, state$: state$) =>
  action$.pipe(
    ofType('UPDATE_CURRENTUSER'),
    exhaustMap(
      ({payload}) => from(saveExtraDataUser(getCurrentUserUid(), payload)),
      a => a,
    ),
    map(({payload}) => ({type: 'UPDATE_CURRENTUSER_SUCCESS', payload})),
  );

export const changeThemeUser = (action$: action$, state$: state$) =>
  action$.pipe(
    ofType('CHANGE_THEME'),
    tap(({payload: {theme}}) => {
      const {text, background, primary} = getThemeVariables(theme).colors; //state$.value.theme.themeVariables.colors;
      applyTheme(theme, background, text, primary);
      DefaultPreference.set('themeName', theme);
      //Navigation.setDefaultOptions(applyTheme(theme, background, text, primary));
    }),
    isLoggedPipe(state$),
    exhaustMap(({payload, isLogged}) => {
      const actionSuccess = {type: 'CHANGE_THEME_SUCCESS', payload: {}};
      if (!isLogged) {
        return of(actionSuccess);
      }
      return from(
        Promise.resolve(actionSuccess)
          .then(() =>
            saveExtraDataUser(getCurrentUserUid(), {themeName: payload.theme}),
          )
          .then(() => getDispatch()(actionSuccess))
          .then(() => ({type: 'UPDATE_CURRENTUSER_SUCCESS', payload: {}})),
      );
    }),
    catchError(err => of({type: 'CHANGE_THEME_FAILED', payload: {}})),
    //map(({ payload }) => ({ type: 'UPDATE_CURRENTUSER_SUCCESS', payload }))
  );

export const changeLangUser = (action$: action$, state$: state$) =>
  action$.pipe(
    ofType('CHANGE_LANGUAGE'),
    //filter(({ payload }) => payload.isLogged),
    isLoggedPipe(state$),
    exhaustMap(
      ({payload, isLogged}) =>
        !isLogged
          ? of(null)
          : from(
              saveExtraDataUser(getCurrentUserUid(), {
                languageSelected: payload.lang,
              }),
            ),
      a => a,
    ),
    map(({payload}) => ({type: 'UPDATE_CURRENTUSER_SUCCESS', payload})),
  );

export const changeUnitUser = (action$: action$, state$: state$) =>
  action$.pipe(
    ofType('CHANGE_UNIT'),
    //filter(({ payload }) => payload.isLogged),
    switchMap(
      ({payload}) => from(saveExtraDataUser(getCurrentUserUid(), payload)),
      a => a,
    ),
    map(({payload}) => ({type: 'UPDATE_CURRENTUSER_SUCCESS', payload})),
  );

export const modifyPassports = (action$: action$, state$: state$) =>
  action$.ofType('MODIFY_PASSPORTS').pipe(
    //filter(({ payload }) => payload.isLogged),  //const dispatch = getStore().dispatch;
    switchMap(
      ({payload}) => {
        return from(saveExtraDataUser(getCurrentUserUid(), payload));
      },
      a => a,
    ),
    map(({payload}) => ({type: 'UPDATE_CURRENTUSER_SUCCESS', payload})),
  );

export const openModalCountries = (action$: action$, state$: state$) =>
  action$.pipe(
    ofType('OPEN_COUNTRIES'),
    isLoggedPipe(state$),
    exhaustMap(({payload: {typeList}}) => {
      /*
        const { words } = state$.value.languages;
        const initialSelectItems = state$.value.app.currentUser.passports.map(p => p.countryCode);
        const { colors } = state$.value.theme.themeVariables;

        const dispatch = getStore().dispatch;

        const selectItem = (item: ItemSearchBarList<Mapdonut_Country>, __isAlreadySelected: boolean) => {
            const selectedIdItems = getStore().getState().app.currentUser.passports;
            const isAlreadySelected = !!selectedIdItems.find(p => p.countryCode.toLowerCase() === item.raw.cca2.toLowerCase())
            if (selectedIdItems.length > 6 && !isAlreadySelected) {
                Alert.alert('Oops', words.MAX_PASSPORTS);
                return null;
            }
            const passports = !isAlreadySelected ?
                R.append({ countryCode: item.raw.cca2, expireDate: '' }, selectedIdItems) :
                R.dropWhile(R.propEq('countryCode', item.raw.cca2), selectedIdItems);

            console.log('PASOPORTS after iteraction', passports.length, passports, { prev: isAlreadySelected});
            dispatch({ type: 'SET_PASSPORTS', payload: { passports } })
            dispatch({ type: 'MODIFY_PASSPORTS', payload: { passports } })
            //dispatch(appActionPopScreen(componentId, {}));

            return passports.map(p => p.countryCode);
        };
        */
      const cu = state$.value.app.currentUser;
      const lang = state$.value.languages.lang;
      const words = state$.value.languages.words;
      const initialSelectItems = cu ? cu.passports.map(p => p.countryCode) : [];

      const fuseOptions = (text: string) => ({
        shouldSort: true,
        threshold: 0.5,
        keys: [
          {name: 'id', weight: text.length > 2 ? 0.8 : 0.1},
          {name: 'title', weight: text.length > 2 ? 0.1 : 0.5},
        ].concat(
          mapdonut_country_available_translations.map(lang => ({
            name: 'raw.translations_dictionary.' + lang,
            weight: text.length > 3 ? 0.1 : 0.5,
          })),
        ),
        maxPatternLength: 12,
        minMatchCharLength: text.length > 3 ? 4 : text.length,
      });
      const selectItem = (item: Mapdonut_Country) => {
        const ccodeSelected = item.ccode;
        getDispatch()({
          type: 'UPDATE_TMP_DATA',
          payload: {
            ccodeSelected: ccodeSelected,
            ccodeSelectedCca2: item.cca2,
          },
        });
        Navigation.dismissModal(SCREEN_SELECT_PASSPORT, {});
      };

      const nav = () =>
        Navigation.showModal({
          stack: {
            children: [
              {
                component: {
                  id: SCREEN_SELECT_PASSPORT,
                  name: SCREEN_SELECT_PASSPORT,
                  passProps: {
                    //initialItems: items,
                    typeList: typeList || 'calling_codes',
                    //rnnId: SCREEN_SELECT_PASSPORT,

                    //initialSelectItems: initialSelectItems,
                    //fuseOptions,
                    selectItem,
                    //showRightScrollLetters: true,
                    //allCountries: getAllCountries(lang)
                  },
                  options: {
                    popGesture: true,
                    blurOnUnmount: true,
                    modalPresentationStyle:
                      OptionsModalPresentationStyle.overCurrentContext,
                    //modalTransitionStyle: OptionsModalTransitionStyle.crossDissolve,
                    layout: {
                      //backgroundColor: colors.background,
                    },
                    topBar: {
                      visible: true,
                      animate: true,
                      title: {
                        //text: 'Register Phone'
                        component: {
                          name: SEARCHBAR_IN_TOPBAR,
                          passProps: {
                            placeholderText: words.SEARCH_PHONES,
                            onCancel() {
                              Navigation.dismissModal(SCREEN_SELECT_PASSPORT);
                            },
                          },
                        },
                      },
                      background: {
                        //color: state$.value.theme.themeVariables.colors.surface
                      },
                    },
                    animations: {
                      push: {
                        //waitForRender: true
                      },
                      showModal: {
                        //waitForRender: true
                      },
                    },
                  },
                },
              },
            ],
          },
        });
      return from(nav());
    }),
    map(({payload}) => ({type: 'OPEN_COUNTRIES_SUCCESS', payload})),
  );
