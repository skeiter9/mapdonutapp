import { FirestoreTimestamp } from "./firebase";

export interface Mapdonut_Passport {
    countryCode: string;
    expireDate?: string;
}

export interface Mapdonut_Preference {
    id: string;
    name: string;
    data: any;
}
export interface Mapdonut_Country_translation {
    lang: string,
    name: string
}
export type Mapdonut_temperatureUnit = 'C' | 'F';

export interface Mapdonut_Visa {
    status: string,
    cca2: string
}

type Mapdonut_visa_by_passport = { [key: string]: Mapdonut_Visa };

export interface Mapdonut_Visa_datasource {
    cca2: string,
    timestamp: FirestoreTimestamp,
    visas: Mapdonut_visa_by_passport
}
