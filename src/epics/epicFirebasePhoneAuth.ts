import {mapTo, switchMap, map} from 'rxjs/operators';
import {ofType} from 'redux-observable';
import {action$} from '../@types/global';
import {from} from 'rxjs';
import auth from '@react-native-firebase/auth';

export const firebaseSignInWithPhoneNumber = (action$: action$) =>
  action$.pipe(
    ofType('FIREBASE_LOGIN_PHONE'),
    switchMap(({payload}) =>
      from(auth().signInWithPhoneNumber(payload.phoneNumber)),
    ),
    map(confirm => ({
      type: 'FIREBASE_LOGIN_PHONE_SUCCESS',
      payload: {confirm},
    })),
  );

export const firebaseConfirmPhoneNumber = (action$: action$) =>
  action$.pipe(
    ofType('FIREBASE_LOGIN_PHONE_CONFIRM'),
    switchMap(({payload}) => from(payload.confirm(payload.code))),
    map(user => ({
      type: 'FIREBASE_LOGIN_PHONE_CONFIRM_SUCCESS',
      payload: {user},
    })),
  );
