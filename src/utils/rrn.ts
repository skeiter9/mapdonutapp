import {
  Navigation,
  LayoutStackChildren,
  Options,
  OptionsTopBarButton,
  LayoutComponent,
} from 'react-native-navigation';
import rnnRegisterComponent from './rnnRegisterComponent';
import {SCREEN_SPLASH} from '../screenNames';
import {Platform, StatusBar} from 'react-native';
const uuidv4 = require('uuid/v4');

export function toggleMainBottomTabs(toggle: boolean) {
  return Navigation.mergeOptions('ROOT_BOTTOM_TAPS_ID', {
    bottomTabs: {
      visible: toggle,
      animate: true,
      drawBehind: true,
    },
  });
}

export function popScreen(id: string, options: Options = {}) {
  return Navigation.pop(id, options);
}

const waitForRenderEnabled = () => ({
  animations: {
    push: {
      waitForRender: true,
    },
  },
});

export function pushScreen(
  componentIdBase: string,
  componentName: string | number,
  options: Options,
  passProps: object = {},
  id?: string,
) {
  return Navigation.push(componentIdBase, {
    component: {
      id,
      name: componentName,
      passProps,
      options: {
        ...options,
      },
    },
  });
}

export function showModal(
  componentName: string,
  options: Options = {},
  passProps = {},
  id?: string,
) {
  return Navigation.showModal({
    stack: {
      children: [
        {
          component: {
            id,
            name: componentName,
            passProps,
            options: {
              //...(waitForRender ? waitForRenderEnabled() : {}),
              ...options,
            },
          },
        },
      ],
    },
  });
}

export function showOverlay(
  componentName: string,
  options: Options = {},
  passProps = {},
  id: string = uuidv4(),
) {
  return Navigation.showOverlay({
    component: {
      id,
      name: componentName,
      passProps,
      options,
    },
  });
}

export const closeModal = (componentId: string) =>
  Navigation.dismissModal(componentId);
export const closeOverlay = (componentId: string) =>
  Navigation.dismissModal(componentId);

export function pushScreenSideMenu(
  componentIdBase: string,
  id: string,
  screenName: string,
  options: Options = {},
  right?: LayoutStackChildren,
  waitForRender = true,
) {
  return Navigation.push(componentIdBase, {
    sideMenu: {
      center: {
        component: {
          id,
          name: screenName,
          options: {
            ...(waitForRender ? waitForRenderEnabled() : {}),
            ...options,
          },
        },
      },
      ...(right ? right : {}),
    },
  });
}

export function setTopBarIcon(
  id: string,
  name: string,
  type: string = 'FontAwesome5',
  side: string = 'right',
  passProps: simpleObjectAnyValues = {},
): OptionsTopBarButton {
  return {
    id,
    component: {
      name: 'ICON_TOPBAR',
      passProps: {
        name: name,
        type,
        side,
        id,
        ...passProps,
      },
    },
  };
}

export function applyTheme(
  theme: string,
  bg: string,
  textColor: string,
  selected: string,
) {
  Platform.OS === 'ios'
    ? StatusBar.setBarStyle(
        theme !== 'dark' ? 'dark-content' : 'light-content',
        true,
      )
    : (() => {
        StatusBar.setBackgroundColor(bg, true);
        StatusBar.setTranslucent(true);
      })();
  const opts: Options = {
    topBar: {
      barStyle: theme === 'dark' ? 'black' : 'default',
      background: {
        color: bg,
      },
      title: {
        color: textColor,
      },
    },
    statusBar: {
      style: theme === 'dark' ? 'light' : 'dark',
      backgroundColor: bg,
    },
    layout: {
      backgroundColor: bg,
    },
    bottomTabs: {
      barStyle: theme === 'dark' ? 'black' : 'default',
      backgroundColor: bg,
    },
    bottomTab: {
      iconColor: textColor,
      selectedIconColor: selected,
      textColor: textColor,
      selectedTextColor: selected,
    },
  };
  Navigation.setDefaultOptions(opts);
  return theme;
}
