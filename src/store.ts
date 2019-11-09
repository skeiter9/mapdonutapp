import { createStore, applyMiddleware, Reducer, compose, Store} from 'redux';
import { createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import { createLogger } from 'redux-logger';
import { StoreApp, actionGeneral } from './@types/redux';
import { combineReducers } from 'redux-immer';
import produce from 'immer';
import { composeWithDevTools } from 'redux-devtools-extension';

// Reducers
import app from './reducers/appReducer';
import theme from './reducers/themeReducer';
import languages from './reducers/languagesReducer';
import isEmpty from 'ramda/es/isEmpty';

import rnn from './reducers/rnnReducer';
import locale from './reducers/localeReducer';
import connection from './reducers/connectionReducer';

//import { Navigation } from 'react-native-navigation';

const exec = () => {
    const loggerMiddleware = createLogger({
        collapsed: true
    });
    const epicMiddleware = createEpicMiddleware<actionGeneral>({
        dependencies: {
            //Navigation
        }
    });
    const middlewares = [epicMiddleware].concat(__DEV__ ? [loggerMiddleware] : []);
    const composeEnhancers = __DEV__ ? composeWithDevTools : compose;
    const rootReducer: Reducer<StoreApp, actionGeneral> = combineReducers(produce, {
        app,
        theme,
        languages,
        locale,
        rnn,
        connection
    });

    const store = createStore(
        rootReducer,
        composeEnhancers(
            ...middlewares.map(m => applyMiddleware(m))
        ),
    );
    return { store, epicMiddleware }
}

const _store = {
    get store() {
        return this._store
    },
    set store(s: Store<StoreApp, actionGeneral>) {
        this._store = s
    },
    set epicMiddleware(eM: EpicMiddleware<actionGeneral>) {
        this._epicMiddleware = eM
    },
    get data() {
        return { store: this._store, epicMiddleware: this._epicMiddleware }
    },
    _store: {} as Store<StoreApp, actionGeneral>,
    _epicMiddleware: {} as EpicMiddleware<actionGeneral>,
}

const _getStore = ((s) => ()  => {
    if (isEmpty(s.store)) {
        const { store, epicMiddleware } = exec();
        s.store = store;
        s.epicMiddleware = epicMiddleware;
    }
    return s.data;
})(_store);

export default function getStore() {
    return _getStore().store;
}
export function getDispatch() {
    return _getStore().store.dispatch;
}
export function getStateApp() {
    return _getStore().store.getState();
}
export function getEpicMiddleware() {
    return _getStore().epicMiddleware;
}
