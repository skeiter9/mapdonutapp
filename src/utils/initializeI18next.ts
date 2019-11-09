import i18next, { InitOptions } from 'i18next';
//import Backend from 'i18next-xhr-backend'; // Todo migrate to our own servers
import { initReactI18next } from 'react-i18next';
import Locize from "i18next-locize-backend";
import { LANGUAGE_DEFAULT } from '../config.app';
import { Mapdonut_Languages_Availables } from '../@types/languagesReducer';
//import AsyncStorageBackend from 'i18next-async-storage-backend';

const LOCIZE_PROJECT_ID =    'e3c01644-8ab3-4eb5-96b4-ed2250f19b11';
const LOCIZE_API_KEY =       '3e30087d-d8b0-42d5-aa09-fd5c68ed24ac';
const LOCIZE_API_KEY_ADMIN = 'df52861d-be02-4063-b78f-97d6de154295';
const LOCIZE_VERSION_TRANSLATIONS = 'v0.8';

const getOptionsLocize = (ns: "NoLogged" | 'Logged') => {
    return {
        projectId: LOCIZE_PROJECT_ID,
        // add an api key if you want to send missing keys
        apiKey: __DEV__ ? LOCIZE_API_KEY_ADMIN : LOCIZE_API_KEY,

        // the reference language of your project
        //referenceLng: LANGUAGE_DEFAULT,

        // version - defaults to latest
        version: LOCIZE_VERSION_TRANSLATIONS,

        // private - set to true if you version on locize is set to use private publish
        private: true,

        // hostnames that are allowed to create, update keys
        // please keep those to your local system, staging, test servers (not production)
        allowedAddOrUpdateHosts: ['localhost'],

        setContentTypeJSON: true,

        // optional event triggered on saved to backend
        onSaved: (lng: string, ns: string) => {
            console.log(`${lng} on ${ns} has been saved in database`);

        },
        defaultNS: ns
    }
}

//export const locizeService = new Locize(null, locizeOptions);

export default function runI18next(lang: Mapdonut_Languages_Availables, ns: "NoLogged" | 'Logged', isOffline: boolean) {
    
    const locizeOptions = getOptionsLocize(ns);

    const options: InitOptions = {
        backend: getOptionsLocize(ns),
        debug: __DEV__,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
        },
        defaultNS: ns,
        lng: lang,
        load: 'currentOnly',
        preload: [lang],
        ns: ns,
        saveMissing: __DEV__,
        updateMissing: __DEV__,
        saveMissingTo: 'fallback',
        missingKeyHandler(lngs, ns, key, fallbackValue) {
            console.log({ missingKeyHandler_CALLED: { lngs, ns, key, fallbackValue} });
        },
        appendNamespaceToMissingKey: true,
        parseMissingKeyHandler(key) {
            return `${key}`
        },
        //missingInterpolationHandler?: (text: string, value: any, options: InitOptions) => any;
        returnEmptyString: true,
        returnObjects: true,
        //returnedObjectHandler?(key: string, value: string, options: any): void;
    }
    const _i18n = (_options: InitOptions) => i18next
        .use(Locize)
        .use(initReactI18next)
        .init({
            backend: locizeOptions,
            ..._options
        });


    const locizeService = new Locize(null, locizeOptions);

    const toPromise = (attr: 'getOptions' | 'getLanguages'): Promise<any> => new Promise((resolve, reject) => {
        locizeService[attr]((err, res) => !!err ? reject(err) : resolve(res) )
    });
    
    return Promise.all([
        toPromise('getOptions'),
    ])
    .then(([optsServer]) => {
        return Promise.all([
            toPromise('getLanguages'),
            _i18n({
                ...options,
                fallbackLng: optsServer.fallbackLng,
                //load: optsServer.load,
                whitelist: optsServer.whitelist,
            }),
            optsServer
        ])
    })
    .then(([languagesAvailable, t, optsServer]) => {
        console.log({
            languagesAvailable, t, i18next, optsServer,
            //test: t('LOGIN_WITH_PHONE'),
            //test2: t('LoginWithPhone')
        });
        return {
            languagesAvailable: languagesAvailable,
            t,
            i18next,
        }
    })
};

