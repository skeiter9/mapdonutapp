import { combineEpics, EpicMiddleware } from 'redux-observable';

import epicShowWebview from './epics/epicShowWebview';
import { firebaseSignInWithPhoneNumber, firebaseConfirmPhoneNumber } from './epics/epicFirebasePhoneAuth';
import { firebaseLogout, firebaseLogin, showLoader, hideLoader } from './epics/epicFirebaseEvents';
import { changeThemeUser, changeLangUser, changeUnitUser, openModalCountries, modifyPassports } from './epics/epicUserSettings';

import { showThemesInLogin, showTutorial, showPhoneLogin, showPhoneLoginCode } from './epics/epicsLogin';
import epicShowInitialSplash from './epics/epicShowInitialSplash';
import { actionGeneral } from './@types/redux';

export default function runEpics(epicMiddleware: EpicMiddleware<actionGeneral>) {
    const rootEpic = combineEpics(
        epicShowInitialSplash,
        showThemesInLogin,
        changeThemeUser,
        epicShowWebview,
        showTutorial,
        showPhoneLogin,
        openModalCountries,
        /*
        epicRnnRegisterRoot,
        epicSplashScreenLoaded,
        ,
        firebaseSignInWithPhoneNumber,
        firebaseConfirmPhoneNumber,
        showPhoneLoginCode,
        firebaseLogin,
        firebaseLogout,
        showLoader,
        hideLoader,
        changeLangUser,
        changeUnitUser,
        modifyPassports
        */
    );

    epicMiddleware.run(rootEpic);
}