import React, { useState, useEffect } from 'react';
import FastImage from 'react-native-fast-image';
import { View } from 'react-native';

//import { AVATAR_DEFAULT_URL } from '../../global/variables';
//import useSavePicture from '../hooks/useSavePicture';
import ButtonView from './Button';

interface Props {
    editable?: boolean;
    styles: any;
    photoUrl: string;
    onChange?: (v: string) => void
}

export default function Avatar(props: Props) {

    //const { photoUrl, lunchOptions } = useSavePicture(props.photoUrl);
    const photoUrl = props.photoUrl;
    const lunchOptions = () => {}

    useEffect(() => {
        if (props.onChange) props.onChange(photoUrl);
    }, [photoUrl]);

    const AvatarWrapper = props.editable ? ButtonView : View;

    return <View style={props.styles}>
        <AvatarWrapper onPress={() => props.editable ? lunchOptions() : null}>
            { 
                photoUrl ? <FastImage
                    style={props.styles}
                    source={{
                        uri: props.photoUrl,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                /> : <View />
            }
        </AvatarWrapper>
    </View>
}
