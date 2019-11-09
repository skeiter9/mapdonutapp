import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Alert, Keyboard } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { runTiming } from '../utils/animations';
import { Button, Surface, Paragraph } from 'react-native-paper';
import { closeModal } from '../utils/rrn';
import { RNN_screenProps } from '../@types/rnn';
import { Navigation } from 'react-native-navigation';
import MapdonutLogo from '../components/MapdonutLogo';
import MapdonutName from '../components/MapdonutName';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Flag } from 'react-native-svg-flagkit';
import { useSelector, useDispatch } from 'react-redux';
import { themeSelector, languageSelector, tmpdataSelector } from '../utils/appSelectors';
import ButtonView from '../components/Button';
import Text from '../components/TextTranslation';
import { viewportWidth, viewportHeight } from '../utils/dimentions';
import { getCountriesByCallingCode } from '../mapdonut_libs/countries/countries';
const { Clock, Value, set, cond, startClock, clockRunning, timing, debug, stopClock, block, interpolate } = Animated
import { parsePhoneNumberFromString } from 'libphonenumber-js/mobile'

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { of, from, Subject, merge } from 'rxjs';
import { switchMap, exhaustMap, tap, catchError } from 'rxjs/operators';
import { StoreApp } from '../@types/redux';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import R from 'ramda';

PhoneLogin.propTypes = {
};
interface Props extends RNN_screenProps {
}

export default function PhoneLogin(props: Props) {
    const country = useSelector((s: StoreApp) => s.locale.country);
    const { words, lang } = useSelector(languageSelector);
    const { ccodeSelected, ccodeSelectedCca2 } = useSelector(tmpdataSelector);

    const ALL_COUNTRIES = getCountriesByCallingCode(lang);
    const COUNTRY = ALL_COUNTRIES.find(c => c.ccode === country);

    const { componentId } = props;
    const dispatch = useDispatch();
    const [isValidPNumber, setIsValidPNumber] = useState(false);

    const [flag, setFlag] = useState([ccodeSelectedCca2]);
    const [countryCode, setCountryCode] = useState(ccodeSelected);
    const [inputText, setInputText] = useState('');

    const [codeConfirmation, setCodeConfirmation] = useState('');
    const {theme, themeVariables } = useSelector(themeSelector);
    const [confirm, setConfirm] = useState<FirebaseAuthTypes.ConfirmationResult|null>(null);
    const [isLoading, setIsloading] = useState(false);
    const [isLoading2, setIsloading2] = useState(false);
    const s$ = new Subject<string>();
    const confirmation$ = new Subject<string>();

    const styleInput = {
        minHeight: 42,
        backgroundColor: themeVariables.colors.onBackground,
        paddingVertical: 8,
        borderRadius: 4,
        fontSize: 20,
        paddingHorizontal: 16,
        color: themeVariables.colors.text
    };

    const checkPhone = (txt: string) => {
        const pre = parsePhoneNumberFromString(txt);
        const valid = pre && pre.getType() === 'MOBILE' ? true : false;
        console.log({ txt, valid, pre });
        return {txt, valid, pre}
    }

    useEffect(() => {

        const includePlus = R.includes('+', inputText.split(''));
        const number = `${includePlus ? '' : '+' + countryCode}${inputText}`;
        const phone = parsePhoneNumberFromString(number);
        console.log(number, phone);
        if (phone && includePlus) {
            if (phone.country) setFlag([phone.country])
            if (phone.countryCallingCode) setCountryCode('' + phone.countryCallingCode);
            if (phone.nationalNumber) setInputText('' + phone.nationalNumber);
            setIsValidPNumber(phone.isValid());
        } else {
            setIsValidPNumber(phone && phone.isValid() ? true : false);
        }
    }, [inputText, countryCode])
    
    useEffect(() => {
        if (!ccodeSelected) return;
        setCountryCode(ccodeSelected);
        setFlag([ccodeSelectedCca2]);
        //setInputText('');
    }, [ccodeSelected, ccodeSelectedCca2])

    const obs = of(null)
        .pipe(
            switchMap(() => s$),
            exhaustMap(p => {
                setIsloading(true);
                return from(auth().signInWithPhoneNumber(p))
            }),
            tap(c => {
                setConfirm(c);
            }),
            catchError(err => {
                setIsloading(false);
                if (err && err.code === "auth/popup-closed-by-user") return of(err);
                if (err && err.code === "auth/too-many-requests") Alert.alert(words.BLOCK_DEVICE_MULTIPLTE_REQUESTS);
                return of(err);
            })
        );
    const obs1 = of(null).pipe(
        switchMap(() => confirmation$),
        exhaustMap(code => {
            dispatch({ type: 'LOGIN' })
            setIsloading2(true);
            Keyboard.dismiss();
            if (!confirm) return of(null);
            return from(confirm.confirm(code))
        }),
        tap(user => {
            //console.log('User Is logged', user);
            dispatch({ type: 'LOGIN_COMPLETE', payload: { user } })
        }),
        catchError(err => {
            console.log({ err });
            dispatch({ type: 'LOGIN_FAILED', payload: { err } })
            setIsloading2(false);
            if (err && err.code === "auth/invalid-verification-code") Alert.alert(words.SMS_WRONG)
            return of(err);
        })
    );

    const subs = merge(obs, obs1).subscribe()

    useEffect(() => {
        return () => {
            subs.unsubscribe();
        }
    }, []);

    const clock = new Clock();

    return <View
        style={{
            justifyContent: "center", alignItems: 'center', height: '100%',
            //backgroundColor: themeVariables.colors.background,//'rgba(0,0,0,.5)',
            width: '100%',
            //opacity: runTiming(clock, 0, 1, 1000),
        }}
        
    >

        <ButtonView useReactNative
            onPress={() => {
                Keyboard.dismiss();
                //closeModal(componentId);
            }}
            style={{
                //opacity: runTiming(clock, 0, 1, 1000),
                left: 0,
                top: 0,
                height: viewportHeight,
                width: viewportWidth,
                position: 'absolute',
                //backgroundColor: 'green',
            }}
        ><></>
        </ButtonView>

        <View
            style={{
                width: '85%',
                //height: '25%',
                minHeight: 120,
                padding: 16, justifyContent: 'center',
                zIndex: 10,
                transform: [{
                    translateY: -72
                }],
                borderRadius: 16,
                position: 'absolute',
                backgroundColor: themeVariables.colors.background
            }}
        >
            
            {
                !confirm ?
                    <Animated.View style={{ opacity: isLoading ? .7 : 1 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <RectButton
                                style={{
                                    flexDirection: 'row', alignItems: 'center',
                                    ...styleInput,
                                    //backgroundColor: themeVariables.colors.surface,
                                    paddingHorizontal: 12,
                                    marginRight: 8,
                                    flex: 3
                                }}
                                onPress={() => dispatch({ type: 'OPEN_COUNTRIES', payload: { componentIdBase: componentId, typeList: 'calling_codes' } })}
                            >
                                {
                                    flag.length > 0 ?
                                        flag.map(f => <Flag id={f} key={f} width={26} height={26} />)
                                        :
                                        <View style={{ width: 26, height: 26 }} />
                                }
                                <Text color="primary" fontStyle='bodyEmphasized'> +{countryCode} </Text>
                            </RectButton>
                            <TextInput
                                placeholder='Phone Number'
                                placeholderTextColor={themeVariables.colors.placeholder}
                                value={inputText}
                                onChangeText={setInputText}
                                autoCompleteType={'tel'}
                                autoFocus
                                keyboardType={'phone-pad'}
                                keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                                maxLength={15}
                                textContentType={'telephoneNumber'}
                                style={{
                                    ...styleInput,
                                    flex: 6,
                                    marginLeft: 8,
                                }}
                                editable={!isLoading}
                            ></TextInput>
                        </View>

                        <Button disabled={!isValidPNumber || isLoading} loading={isLoading} color={themeVariables.colors.accent} onPress={() => {
                            const phoneNumber = `+${countryCode}${inputText}`;
                            s$.next(phoneNumber);
                        }} icon={'send'} mode="contained" compact style={{ marginTop: 18 }}>
                            {words.NEXT}
                        </Button>
                    </Animated.View>
                    :
                    <Animated.View style={{ opacity: isLoading2 ? .7 : 1, alignItems: 'center' }} >
                        <Paragraph style={{ textAlign: 'center', marginBottom: 8 }}>
                            { words.SMS_INSTRUCTIONS }
                        </Paragraph>
                        <TextInput
                            value={codeConfirmation}
                            onChangeText={setCodeConfirmation}
                            keyboardType={'numeric'}
                            maxLength={6}
                            autoFocus
                            keyboardAppearance={theme === 'dark' ? 'dark' : 'light'}
                            style={{
                                ...styleInput,
                                width: '100%',
                                //backgroundColor: 'green'
                            }}
                        />

                        <Button disabled={codeConfirmation.length !== 6 || isLoading2} loading={isLoading2}  color={themeVariables.colors.accent} onPress={() => {
                            //s$.next(phoneNumber);
                            confirmation$.next(codeConfirmation);
                        }} icon={'key'} mode="contained" compact style={{ marginTop: 18, width: '100%' }}>
                            LOGIN
                        </Button>
                    </Animated.View>
            }

        </View>
        
    </View>
}