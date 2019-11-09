import { actionGeneral, AppState } from "../@types/redux"
import DefaultPreference from 'react-native-default-preference';

const appState = {
    currentUser: null,
    currentUserFirebase: null,
    permissions: {},
    data: {},
    tmp: {}
    //isLogged: false,
    //rnnRegisters: [],
    //netInfo: null,
}

export default (state = appState, action: actionGeneral) => {
    switch (action.type) {
        case 'FIREBASE_STATE_AUTH_CHANGED':
            const { user } = action.payload;
            state.currentUserFirebase = user;
            //state.isLogged = !!user;
            return state;
        case 'SET_USERDATA':
            const { userData, exchanges, visaDataSources, cities } = action.payload;
            state.currentUser = userData;
            state.data = {
                exchanges, visaDataSources, cities
            }
            return state;
        case 'SET_PERMISSIONS':
            state.permissions = action.payload.permissions;
            return state;
        case 'UPDATE_CURRENTUSER_SUCCESS':
        case 'SET_PASSPORTS':
        case 'CHANGE_UNIT':
            Object.keys(action.payload).forEach(k => {
                state.currentUser[k] = action.payload[k]
            });
            return state;
        case 'UPDATE_TMP_DATA':
            Object.keys(action.payload).forEach(k => {
                DefaultPreference.set(k, action.payload[k])
                state.tmp[k] = action.payload[k]
            });
            return state;
        default:
            return state
    }
}
