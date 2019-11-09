import React, { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import SearchBarComponent from 'react-native-search-bar';
import { languageSelector, themeSelector } from '../utils/appSelectors';
import { useSelector } from 'react-redux';
import { Platform } from 'react-native';
import omit from 'ramda/es/omit';

SearchBar.propTypes = {
    cancelText: PropTypes.string,
    placeholderText: PropTypes.string
};

SearchBar.defaultProps = {
    cancelText: '',
    placeholderText: ''
}

interface Props extends SearchBarComponent {
    cancelText: string;
    placeholderText: string;
    forwardRef?: any
}

export class SearchBarClass extends SearchBarComponent{
}

export default function SearchBar(props: Props) {
    const { theme, themeVariables: { colors } } = useSelector(themeSelector);
    const { SEARCH, CANCEL } = useSelector(languageSelector).words;
    const { cancelText, placeholderText, forwardRef} = props;

    const propsComponent = omit(['cancelText', 'placeholderText'], props)

    return (
        <SearchBarComponent
            //onChangeText={setSearchText}
            //onCancelButtonPress={onCancelButtonPress}
            //onSearchButtonPress={onSearchButtonPress}

            //onFocus={onFocus}
            //onBlur={onBlur}

            {...propsComponent}
            ref={forwardRef}

            hideBackground={true}
            searchBarStyle='minimal'
            keyboardAppearance={theme === 'dark' ? 'dark' : 'default'}
            barStyle={theme === 'dark' ? 'black' : 'default'}
            barTintColor={colors.background}
            tintColor={colors.primary}
            textColor={colors.text}
            textFieldBackgroundColor={colors.surface}
            placeholder={placeholderText || SEARCH}
            cancelButtonText={cancelText || CANCEL}
            keyboardType={Platform.OS === 'ios' ? 'web-search' : 'default'}
        />
    )
    
    
    
    
}

