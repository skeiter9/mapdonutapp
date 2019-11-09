import React from 'react'

import Swiper from 'react-native-swiper'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    wrapper: {},
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default function SimpleSwiper(props: any) {
    return (
        <Swiper style={styles.wrapper} showsButtons={true}>
            {props.children}
        </Swiper>
    )
}