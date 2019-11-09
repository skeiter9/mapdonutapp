import React from 'react';
import { Icon } from 'react-native-ui-kitten';
export default (name: string, type: string, extraStyles) => (style) => {
    return <Icon {...{ name, type }} {...({ ...style, ...extraStyles})}  />
}