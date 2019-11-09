import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { FieldValue, Geopoint } from './firebase';
import { Mapdonut_Passport, Mapdonut_Preference, Mapdonut_temperatureUnit } from './mapdonutTypes';
import { Mapdonut_Currency_Code } from '../mapdonut_libs/currencies/currencies_types';

export interface Mapdonut_User {

    uid: string,
    displayName: string;
    photoURL: string;
    coverURL: string;
    email: string;
    phoneNumber: string;
    providerData: FirebaseAuthTypes.UserInfo[]

    bio: string;
    username: string;

    themeName: string;
    languageSelected: string;

    location: Geopoint | null;

    socials?: any[] | FieldValue;
    lastSignInAt: FirebaseFirestoreTypes.Timestamp;
    created_at: FirebaseFirestoreTypes.Timestamp;
    updated_at: FirebaseFirestoreTypes.Timestamp;
    preferences: Mapdonut_Preference[] | FieldValue;
    devices: string[] | FieldValue;


    firstLogin: boolean,
    emailVerified: boolean,
    allowLocation: boolean,
    allowPushNotifications: boolean,
    distanceUnit: 'imperial' | 'metric',

    tempUnit: Mapdonut_temperatureUnit;
    passports: Mapdonut_Passport[]
    prefererdCurrencies: Mapdonut_Currency_Code[]

    savedCities: string[];

    permissions: {
        locationInUse?: boolean,
        camera?: boolean
    }
}