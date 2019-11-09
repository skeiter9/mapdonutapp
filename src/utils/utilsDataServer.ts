import firestore from '@react-native-firebase/firestore';
import { Mapdonut_Visa_datasource } from '../@types/mapdonutTypes';

export async function getApiCredentials() {
    const res = await firestore().collection('__apis_credentials').get()
    return res.docs.map(d => (d.data() || {}));
}

export async function getVisasDataSourceByPassport(cca2: string) {
    const res = await firestore().doc(`__visas/${cca2}`).get()
    return res.data() as Mapdonut_Visa_datasource;
}

export async function getCity(id: string) {
    const res = await firestore().doc(`__cities/${id}`).get()
    return res.data() || {};
}

