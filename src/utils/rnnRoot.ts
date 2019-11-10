import {of, from} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {
  Navigation,
  LayoutComponent,
  OptionsModalPresentationStyle,
  OptionsModalTransitionStyle,
  LayoutBottomTabs,
} from 'react-native-navigation';
import {
  SCREEN_LOGIN,
  SCREEN_PROFILE,
  SCREEN_EXPLORE,
  SCREEN_SETTINGS,
  SCREEN_SPLASH,
} from '../screenNames';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native';
import {LoginProps} from '../screens/Login';

export const showRootOverlay = () =>
  Navigation.showOverlay({
    component: {
      id: 'loader',
      name: SCREEN_SPLASH,
      passProps: {
        isLoader: true,
      },
      options: {
        popGesture: false,
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
    },
  });

export const closeRootOverlay = () => Navigation.dismissOverlay('loader');

export const LoginRnnComponent = (passProps: LoginProps): LayoutComponent => ({
  name: SCREEN_LOGIN,
  id: SCREEN_LOGIN,
  passProps,
  options: {
    topBar: {
      visible: false,
      animate: true,
      background: {
        color: 'transparent',
      },
      borderColor: 'transparent',
    },
    layout: {
      backgroundColor: 'blue',
    },
    animations: {
      setRoot: {
        waitForRender: true,
      },
      push: {
        waitForRender: true,
      },
    },
    customTransition: {
      animations: [
        {
          type: 'sharedElement',
          fromId: 'LOGO_SLASH',
          toId: 'LOGO_LOGIN',
          startDelay: 0,
          springVelocity: 10,
          duration: 15,
        },
      ],
      duration: 0.5,
    },
  },
});

const homeRnnBottomTabs = (icons: any): LayoutBottomTabs => ({
  id: 'HOME_TABS',
  options: {
    popGesture: false,
    animations: {
      setRoot: {
        waitForRender: true,
      },
      push: {
        waitForRender: true,
      },
    },
    topBar: {
      visible: false,
    },
    bottomTabs: {
      currentTabIndex: 2,
    },
  },
  children: [
    {
      stack: {
        children: [
          {
            component: {
              name: SCREEN_PROFILE,
              passProps: {
                forCurrentUser: true,
              },
              options: {
                topBar: {
                  visible: true,
                  title: {
                    text: 'PRofile',
                  },
                },
                bottomTab: {
                  text: 'PRofile',
                  icon: icons.profile,
                  testID: 'PROFILE',
                },
                animations: {
                  push: {
                    waitForRender: true,
                  },
                },
              },
            },
          },
        ],
      },
    },

    {
      stack: {
        children: [
          {
            component: {
              name: SCREEN_EXPLORE,
              options: {
                topBar: {
                  visible: false,
                  title: {
                    text: 'EXplore',
                  },
                },
                bottomTab: {
                  text: 'EXplore',
                  icon: icons.explore,
                },
                animations: {
                  push: {
                    waitForRender: true,
                  },
                },
              },
            },
          },
        ],
      },
    },

    {
      stack: {
        children: [
          {
            component: {
              name: SCREEN_SETTINGS,
              options: {
                topBar: {
                  visible: true,
                  title: {
                    text: 'Settings',
                  },
                },
                bottomTab: {
                  text: 'Settings',
                  icon: icons.settings,
                },
                animations: {
                  push: {
                    waitForRender: true,
                  },
                },
              },
            },
          },
        ],
      },
    },
  ],
});

export const goToLogin = (bgLogin: string = '') =>
  of(null).pipe(
    switchMap(() => {
      const root = () =>
        Navigation.setRoot({
          root: {
            component: LoginRnnComponent(bgLogin),
          },
        });
      //return from(Navigation.push(SCREEN_SPLASH, {
      //   component: LoginRnnComponent
      //}));
      //const exec = () => Navigation.setStackRoot('MAIN_STACK', [{
      //        component: LoginRnnComponent
      //    }])
      //    .then((r) => {
      //        console.log('HOME ADDED , REMOVE SPLASH', { r });
      //    })
      //return from(exec());
      return from(root());
    }),
  );

export const goToHome = () =>
  of(null).pipe(
    switchMap(() => {
      const ICON_TABBAR_SIZE = 30;

      const getIConsForBottomTabs = () => {
        const os = Platform.OS;
        return Promise.all([
          Icon.getImageSource(`${os}-compass`, ICON_TABBAR_SIZE, '#000'),
          Icon.getImageSource(`${os}-contact`, ICON_TABBAR_SIZE, '#000'),
          Icon.getImageSource(`${os}-cog`, ICON_TABBAR_SIZE, '#000'),
          //Icon.getImageSource(`${os}-chatbubbles`, ICON_TABBAR_SIZE, '#000'),
          //Icon.getImageSource(`${os}-calendar`, ICON_TABBAR_SIZE, '#000'),
        ]).then(res => ({
          explore: res[0],
          profile: res[1],
          settings: res[2],
        }));
      };
      return from(
        Promise.all([
          getIConsForBottomTabs(),
          //getUserData(user, isOnline),
        ]).then(([icons]) => ({icons})),
      );
    }),

    switchMap(({icons}) => {
      const exec = () =>
        Promise.resolve(null).then(() =>
          Navigation.setStackRoot('MAIN_STACK', [
            {
              bottomTabs: homeRnnBottomTabs(icons),
            },
          ]),
        );
      const root = () =>
        Navigation.setRoot({
          root: {
            bottomTabs: homeRnnBottomTabs(icons),
          },
        });

      //return from(exec())
      return from(root());
    }),
  );
