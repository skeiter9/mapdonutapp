import React from 'react';
import { Image } from 'react-native';

interface Props {
}
export default function (props: Props) {
    const { w, h, logoId, hide } = props;
    return <Image style={{ width: w || 190, height: h || 190, opacity: hide || false ? 0 : 1 }} source={{ uri: logoId || 'mapdonut_logo' }}></Image>
}