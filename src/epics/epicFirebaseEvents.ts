import { mapTo, map, exhaustMap, filter, switchMap, catchError, tap } from 'rxjs/operators'; 
import { ofType } from 'redux-observable'; 
import { action$, state$ } from '../@types/global';
import { goToLogin, goToHome, showRootOverlay, closeRootOverlay } from '../utils/rnnRoot';
import { from, of } from 'rxjs';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { includes } from 'ramda';

export const firebaseLogin = (action$: action$, state$: state$) => action$.pipe(
    ofType('LOGIN_COMPLETE'),
    exhaustMap(({ payload: { user } }) => goToHome(user, (() => {
        const net = state$.value.app.netInfo;
        return !net ? false : net.isInternetReachable;
    })())),
    mapTo({ type: 'LOGIN_SUCCESS' })
);

const showLoaderWhen = ['LOGIN', 'LOGOUT'];
const closeLoaderWhen = ['LOGIN_SUCCESS', 'LOGIN_FAILED', 'LOGOUT_SUCCESS', 'LOGOUT_FAILED'];

export const showLoader = (action$: action$) => action$.pipe(
    filter(({ type }) => includes(type, showLoaderWhen)),
    exhaustMap(() => from(showRootOverlay())),
    map(loader => ({ type: 'OPEN_LOADER', payload: { loader } }))
);

export const hideLoader = (action$: action$) => action$.pipe(
    filter(({ type }) => includes(type, closeLoaderWhen)),
    exhaustMap(() => from(closeRootOverlay())),
    mapTo({ type: 'CLOSE_LOADER' })
)


export const firebaseLogout = (action$: action$) => action$.pipe(
    ofType('LOGOUT'),
    switchMap(() => from(auth().signOut())),
    exhaustMap(() => goToLogin()),
    map(() => ({ type: 'LOGOUT_SUCCESS' })),
    catchError(error => {
        return of({ type: 'LOGOUT_FAILED', payload: { error } })
    })
);
