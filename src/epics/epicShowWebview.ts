import {mapTo, switchMap} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import {action$} from '../@types/global';
import {pushScreen, showModal, pushScreenSideMenu} from '../utils/rrn';
import {WEBVIEW} from '../screenNames';
import {from} from 'rxjs';
import {Navigation} from 'react-native-navigation';

export default (action$: action$) =>
  action$.pipe(
    ofType('SHOW_WEBVIEW'),
    switchMap(({payload: {componentIdBase, url, title}}) => {
      return from(
        Navigation.push(componentIdBase, {
          component: {
            name: WEBVIEW,
            passProps: {
              title,
              url,
            },
            options: {
              topBar: {
                visible: true,
                title: {
                  text: title,
                },
              },
            },
          },
        }),
      );
    }),
    mapTo({type: 'SHOW_WEBVIEW_FINISH'}),
  );
