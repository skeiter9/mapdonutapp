import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import SearchBar, { SearchBarClass } from './Searchbar';
import { viewportWidth } from '../utils/dimentions';

SearchBarInTopbar.propTypes = {
};
interface Props {
    cancelText: string;
    placeholderText: string,
    onCancel: () => void,
    forwardRef: any
}
export default function SearchBarInTopbar(props: Props) {
    const { cancelText, placeholderText, onCancel, forwardRef } = props;
    //const sRef = useRef<SearchBarClass | null>(null);
    //const ref = useRef<SearchBarClass | null>(null);

    return <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
            style={{ backgroundColor: 'rgba(0,0,0,0)',
                width: viewportWidth - 32,
                transform: [
                    { translateY: -12 }
                ]
            }}
        >
            <SearchBar forwardRef={forwardRef} {...{cancelText, placeholderText}} onCancelButtonPress={onCancel} showsCancelButton={true} />
        </View>
    </View>
}