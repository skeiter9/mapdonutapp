import React, { useRef, useEffect, useState } from 'React';
import { View } from 'react-native';
import SearchBar from 'react-native-search-bar';
import { useSelector } from 'react-redux';
import { fetchTheme, fetchLanguage } from '../../../utils/urilsSelectors';

interface props {
    onChangeText?: (txt: string) => void,
    onFocus?: () => void,
    onBlur?: () => void,
    onCancelButtonPress?: () => void,
    onSearchButtonPress?: () => void,
    placeholder?: string,
    searchBarStyle?: 'default' | 'prominent' | 'minimal',
    ref?: (obj: MapdonutSearch) => MapdonutSearch
}

export class MapdonutSearch extends SearchBar {

}

export default function(props: props) {
    const {
        onChangeText, onBlur, onFocus, onCancelButtonPress, onSearchButtonPress,
        placeholder, searchBarStyle, ref
    } = props;
    const { themeVariables, theme } = useSelector(fetchTheme());
    const { words } = useSelector(fetchLanguage());
    const [sRef, setSref] = useState<SearchBar | null>(null);
    const _onSearchButtonPress = () => onSearchButtonPress ?
        onSearchButtonPress() :
        sRef ? sRef.unFocus() : null
    return <SearchBar
        ref={x => x ? setSref(x) : null}
        textColor={themeVariables.TEXT_COLOR}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        onCancelButtonPress={onCancelButtonPress}
        onSearchButtonPress={_onSearchButtonPress}
        placeholder={placeholder || words.SEARCH}
        searchBarStyle={searchBarStyle}
        keyboardAppearance={theme === 'dark' ? 'dark' : 'default'}
        barStyle={theme === 'dark' ? 'black' : 'default'}
        hideBackground={true}
        autoCorrect={true}
    />
}