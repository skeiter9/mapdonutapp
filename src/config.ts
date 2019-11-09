//MApbox
import MapboxGL from "@react-native-mapbox-gl/maps";
import Geocoder from 'react-native-geocoding';
import * as Sentry from '@sentry/react-native';
//import config from 'react-native-config'; CHECK LATER

import * as VARIABLES  from './config.app'

export default {
    //...config,
    ...VARIABLES
};

export function beforeRunRNN() {

    MapboxGL.setAccessToken(config.MAPBOX_TOKEN_KEY);
    MapboxGL.setTelemetryEnabled(false);

    //Google geocoding
    //https://github.com/marlove/react-native-geocoding
    Geocoder.init(config.GOOGLE_MAPS_API_KEY);


    //https://sentry.io/nomadic-cl/react-native/getting-started/react-native/
    Sentry.init({
        dsn: config.SENTRY_DSN,
    });

}
