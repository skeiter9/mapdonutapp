import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { createFirebaseTimestamp } from '../utils/utilsFirebase';
import { Mapdonut_User } from '../@types/user';
import { getApiCredentials, getVisasDataSourceByPassport, getCity } from '../utils/utilsDataServer';
import { XEgetExchange } from '../utils/utilsXE';

export async function getUser(u: FirebaseAuthTypes.User, isOnline: boolean) {
    return saveInitialUser(u, isOnline);
}

export async function getUserData(u: FirebaseAuthTypes.User, isOnline: boolean) {
    const userData = await saveInitialUser(u, isOnline);
    if (!isOnline) return Promise.resolve({ userData, exchanges: [], visaDataSources: [], cities: [] })
    const creds = (await getApiCredentials()).reduce((acc, cur) => ({ ...acc, [cur.service]: cur }), {});
    const passports = userData.passports.map(pass => pass.countryCode.toLowerCase());
    const currencies = userData.prefererdCurrencies;
    const savedCities = userData.savedCities;
    console.log({ userData, creds });
    const [exchanges, visaDataSources, cities] = await Promise.all([
        currencies.length > 0 ?
            Promise.all(currencies.map(cur => XEgetExchange(creds.xe, cur))) :
            Promise.resolve([]),
        passports.length > 0 ?
            Promise.all(passports.map(pass => getVisasDataSourceByPassport(pass))) :
            Promise.resolve([]),
        savedCities.length > 0 ?
            Promise.all(savedCities.map(cityId => getCity(cityId))) :
            Promise.resolve([]),
    ]);

    return Promise.resolve({ userData, exchanges, visaDataSources, cities, creds })
}

function saveInitialUser(user: FirebaseAuthTypes.User, isOnline: boolean) {
    const usersRef = firestore().collection('users').doc(user.uid);
    const initialData = {
        uid: user.uid,
        displayName: user.displayName || '',
        photoURL: (user.photoURL || '') + (!!user.providerData.find(p => p.providerId === 'facebook.com') ? '?height=700' : ''),
        coverURL: '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        providerData: user.providerData,
        bio: '',
        username: '',
        socials: [],
        themeName: 'default',
        languageSelected: 'en',
        location: null,
        lastSignInAt: createFirebaseTimestamp(),
        created_at: createFirebaseTimestamp(),
        updated_at: createFirebaseTimestamp(),
        firstLogin: true,
        emailVerified: false,
        allowLocation: false,
        allowPushNotifications: false,
        devices: [],
        preferences: [],
        tempUnit: 'F',
        distanceUnit: 'imperial',
        passports: [],
        prefererdCurrencies: ['USD'],
        savedCities: [],
        permissions: {
        }
    } as Mapdonut_User;
    return usersRef.get({ source: isOnline ? 'server' : 'cache' })
        .then((_u) => {
            const userData = _u.exists ? ({ ...initialData, ..._u.data()}) as Mapdonut_User : initialData;
            return !_u.exists ?
                usersRef.set(initialData).then(() => userData) :
                Promise.resolve(userData);
        })
}

export const getCurrentUserUid = () => {
    const c = auth().currentUser;
    return c ? c.uid : '';
};

export const saveExtraDataUser = (uid: string, userPartial: Partial<Mapdonut_User>) => {
    const usersRef = firestore().collection('users').doc(uid);
    //console.log({ uid, userPartial });
    return usersRef.update(userPartial)
        .then(() => ({ uid, userPartial }));
}
