import {mapTo, switchMap, exhaustMap} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import {action$, state$} from '../@types/global';
import {from} from 'rxjs';
import {
  THEMES_LOGIN_OVERLAY,
  TUTORIAL_LOGIN,
  PHONE_LOGIN,
  PHONE_LOGIN_CODE,
} from '../screenNames';
import {showOverlay, showModal, pushScreen} from '../utils/rrn';
import config from '../config';
import {
  OptionsModalPresentationStyle,
  Navigation,
  OptionsModalTransitionStyle,
  LayoutComponent,
} from 'react-native-navigation';
import {LoginProps} from 'src/screens/Login';

export const showThemesInLogin = (action$: action$) =>
  action$.pipe(
    ofType('OPEN_THEMES_LOGIN'),
    exhaustMap(({payload: {componentId}}) => {
      return from(
        showModal(
          THEMES_LOGIN_OVERLAY,
          {
            //popGesture: true,
            //blurOnUnmount: true,
            modalPresentationStyle:
              OptionsModalPresentationStyle.overCurrentContext,
            modalTransitionStyle: OptionsModalTransitionStyle.crossDissolve,
            layout: {
              //backgroundColor: 'transparent',
            },
            topBar: {
              visible: false,
              animate: true,
            },
            animations: {
              showModal: {
                //waitForRender: true
                x: {
                  from: 50,
                  to: 300,
                  duration: 100,
                },
                alpha: {
                  from: 0.4,
                  to: 0.7,
                  duration: 100,
                },
              },
            },
          },
          {},
        ),
      );
    }),
    mapTo({type: 'OPEN_THEMES_LOGIN_SUCCESS'}),
  );

export const showTutorial = (action$: action$) =>
  action$.pipe(
    ofType('SHOW_TUTORIAL'),
    exhaustMap(({payload: {componentIdBase}}) => {
      return from(
        showModal(
          TUTORIAL_LOGIN,
          {
            popGesture: true,
            blurOnUnmount: true,
            modalPresentationStyle:
              OptionsModalPresentationStyle.overCurrentContext,
            modalTransitionStyle: OptionsModalTransitionStyle.crossDissolve,
            layout: {
              backgroundColor: 'transparent',
            },
            topBar: {
              visible: false,
              animate: true,
              background: {
                color: 'transparent',
              },
            },
            animations: {
              showModal: {
                waitForRender: true,
              },
            },
          },
          {},
        ),
      );
    }),
    mapTo({type: 'SHOW_TUTORIAL_SUCCESS'}),
  );

export const showPhoneLogin = (action$: action$, state$: state$) =>
  action$.pipe(
    ofType('SHOW_PHONE_LOGIN'),
    exhaustMap(({payload: {componentIdBase}}) => {
      const component: LayoutComponent<LoginProps> = {
        name: PHONE_LOGIN,
        passProps: {
          bgLogin: '',
          componentId: PHONE_LOGIN,
        },
        options: {
          popGesture: true,
          blurOnUnmount: true,
          //modalPresentationStyle: OptionsModalPresentationStyle.none ,//.overCurrentContext,
          modalTransitionStyle: OptionsModalTransitionStyle.crossDissolve,
          layout: {
            //backgroundColor: 'transparent',
          },
          topBar: {
            visible: true,
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
      };

      return Navigation.push(componentIdBase, {
        component,
      });
    }),
    mapTo({type: 'SHOW_PHONE_LOGIN_SUCCESS'}),
  );

export const showPhoneLoginCode = (action$: action$, state$: state$) =>
  action$.pipe(
    ofType('SHOW_PHONE_LOGIN_CODE'),
    exhaustMap(({payload: {componentIdBase}}) => {
      return Navigation.push(componentIdBase, {
        component: {
          name: PHONE_LOGIN_CODE,
          options: {
            popGesture: false,
            blurOnUnmount: true,
            //modalPresentationStyle: OptionsModalPresentationStyle.overCurrentContext,
            //modalTransitionStyle: OptionsModalTransitionStyle.crossDissolve,
            layout: {
              backgroundColor: 'transparent',
            },
            topBar: {
              visible: true,
              animate: true,
              title: {
                text: 'Confirm Code',
              },
              background: {
                color: state$.value.theme.themeVariables.colors.surface,
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
      });
    }),
    mapTo({type: 'SHOW_PHONE_LOGIN_CODE_SUCCESS'}),
  );
