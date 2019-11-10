import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StoreApp} from '../@types/redux';
import createCachedSelector from 're-reselect';
import SearchBar from 'react-native-search-bar';
import {useSelector} from 'react-redux';
import {WSAECONNREFUSED} from 'constants';

Explore.propTypes = {};
interface Props {}

const exploreSelector = createCachedSelector(
  (s: StoreApp) => s.languages.words,
  (s: StoreApp) => s.theme.themeVariables,
  (s: StoreApp) => s.theme.theme,

  (s: StoreApp) => s.app.currentUser.uid,
  (s: StoreApp) => s.app.currentUser.tempUnit,
  (s: StoreApp) => s.app.currentUser.distanceUnit,
  (s: StoreApp) => s.theme.themeVariables.colors.surface,
  (words, themeVariables, theme) => ({words, themeVariables, theme}),
)(() => 'unitsMEasure');

export default function Explore(props: Props) {
  const {words, themeVariables, theme} = useSelector(exploreSelector);
  const searchBarRef = useRef<SearchBar | null>(null);

  return (
    <ScrollView>
      <SearchBar
        ref={searchBarRef}
        placeholder={words.EXPLORE_SEARCH_PLACEHOLDER}
        textColor={themeVariables.TEXT_COLOR}
        //onChangeText={onChangeText}
        //onFocus={toggleAppbar.bind(null, false)}
        //onBlur={toggleAppbar.bind(null, true)}
        //onCancelButtonPress={() => setShowSearchList(false)}
        onSearchButtonPress={() =>
          searchBarRef.current ? searchBarRef.current.unFocus() : null
        }
        keyboardAppearance={theme === 'dark' ? 'dark' : 'default'}
        barStyle={theme === 'dark' ? 'black' : 'default'}
        hideBackground={true}
        autoCorrect={true}
        searchBarStyle="prominent"
      />
    </ScrollView>;
  );
}
