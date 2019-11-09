import { memo } from 'react';

export const SCREEN_SPLASH = 'mapdonut.dev.splash';
export const SCREEN_LOGIN = 'mapdonut.dev.login';
export const SCREEN_HOME = 'mapdonut.dev.home';
export const TOPBAR_BUTTON = 'mapdonut.dev.topbarButton';
export const SEARCHBAR_IN_TOPBAR = 'mapdonut.dev.SearchBarinTopBar';
export const WEBVIEW = 'mapdonut.dev.webvieew';
//export const LANGUAGES_LOGIN_OVERLAY = 'mapdonut.dev.languagesLoginOverlay';
export const THEMES_LOGIN_OVERLAY = 'mapdonut.dev.themesLoginOverlay';
export const TUTORIAL_LOGIN = 'mapdonut.dev.tutorialLogin';
export const PHONE_LOGIN = 'mapdonut.dev.PhoneLogin';
export const PHONE_LOGIN_CODE = 'mapdonut.dev.PhoneLoginCODE';
export const SCREEN_EXPLORE = 'mapdonut.dev.Explore';
export const SCREEN_SETTINGS = 'mapdonut.dev.Settings';
export const SCREEN_PROFILE = 'mapdonut.dev.Profile';
export const SCREEN_SELECT_PASSPORT = 'mapdonut.dev.SelectPassport';
export const SCREEN_CURRENCY = 'mapdonut.dev.SelectCurrency';

import rnnRegisterComponent from "./utils/rnnRegisterComponent";
//import SplashScreen from "./screens/SplashScreen";

import Login from "./screens/Login";
import Home from "./screens/Home";
import WebviewScreen from "./screens/Webview";
//import LanguagesOverlayLogin from "./screens/LanguagesOverlayLogin";
import ThemesOverlayLogin from "./screens/ThemesOverlayLogin";
import Tutorial from "./screens/Tutorial";
import PhoneLogin from "./screens/PhoneLogin";
import PhoneLoginCode from "./screens/PhoneLoginCode";
import Explore from "./screens/Explore";
import Settings from "./screens/Settings";
import Profile from "./screens/Profile";
import SelectPassport from "./screens/SelectPassport";
import SelectCurrency from "./screens/SelectCurrency";
import { ComponentProvider } from "react-native";

import TopbarButton from "./components/TopbarButton";
import SearchBarInTopbar from "./components/SearchbarInTopbar";

const Screens = new Map();
//Screens.set(SCREEN_SPLASH, SplashScreen);

// Non Screens
Screens.set(TOPBAR_BUTTON, TopbarButton);
Screens.set(SEARCHBAR_IN_TOPBAR, SearchBarInTopbar);

Screens.set(SCREEN_LOGIN, Login);
Screens.set(SCREEN_HOME, Home);
Screens.set(WEBVIEW, WebviewScreen);
//Screens.set(LANGUAGES_LOGIN_OVERLAY, LanguagesOverlayLogin);
Screens.set(THEMES_LOGIN_OVERLAY, ThemesOverlayLogin);
Screens.set(TUTORIAL_LOGIN, Tutorial);
Screens.set(PHONE_LOGIN, PhoneLogin);
Screens.set(PHONE_LOGIN_CODE, PhoneLoginCode);

Screens.set(SCREEN_EXPLORE, Explore);
Screens.set(SCREEN_SETTINGS, Settings);
Screens.set(SCREEN_PROFILE, Profile);
Screens.set(SCREEN_SELECT_PASSPORT, SelectPassport);
Screens.set(SCREEN_CURRENCY, SelectCurrency);

// Register screens
export const registerScreens = () => {
    let arr: ComponentProvider[] = []
    Screens.forEach((Screen, key) => {
        arr.push(rnnRegisterComponent(key, (Screen)));
    });
    return arr;
    //rnnRegisterComponent(SCREEN_SPLASH, SplashScreen)
};
