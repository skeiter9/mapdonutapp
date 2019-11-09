import { NetInfoState } from "@react-native-community/netinfo";
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Mapdonut_User } from "./user";
import { Theme } from "react-native-paper";
import { Mapdonut_Country_Code } from "./mapdonut.languages";
import { ThemeState } from "./themeReducer";
import { Mapdonut_Languages_Availables, LanguageState } from "./languagesReducer";

export interface StoreApp {
    app: AppState,
    theme: ThemeState,
    languages: LanguageState,
    locale: LocaleState,
    rnn: RnnState,
    connection: ConnectionState
}

export interface simpleObject {
    [prop: string]: string
}

export interface AppState {
    currentUserFirebase: FirebaseAuthTypes.User | null,
    currentUser: Mapdonut_User | null,
    permissions: object,
    data: {
        [prop: string]: any
    },
    tmp: {
        ccodeSelected: string,
        ccodeSelectedCca2: Mapdonut_Country_Code,
        [prop: string]: any
    }
    //rnnRegisters: any[],
    //netInfo: NetInfoState | null,
    //isLogged: boolean,
}

export interface LocaleState {
    preferredDefaultLanguage: {
        languageTag: Mapdonut_Languages_Availables,
        isRTL: boolean
    },
    country: string
}

export interface RnnState {
    root: object,
    componentsRegistered: any[]
}

export interface ConnectionState {
    isOffline: boolean
    netInfo: NetInfoState
}

export interface actionGeneral {
    type: string,
    payload: {
        [prop: string]: any
    },
}
