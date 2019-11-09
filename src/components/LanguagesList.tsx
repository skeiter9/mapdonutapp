import React, { useRef, useState } from 'react';
import createCachedSelector from 're-reselect';
import { getFlagByLanguage } from '../utils/languages';
import SearchBarList from './SearchBarList';
import { StoreApp } from '../@types/redux';
import { useSelector } from 'react-redux';
import config from '../config';
import PropTypes from 'prop-types';
import { ItemSearchBarList } from 'src/@types/searchBarList';
import R from 'ramda';

LanguagesList.propTypes = {
    select: PropTypes.func.isRequired
};
interface Props<T> {
    select: (lang: string) => string[]
}

const languagesWordsSelector = createCachedSelector(
    (props: StoreApp) => props.languages.lang,
    (props: StoreApp) => props.languages.words,
    () => config.LANGUAGES,
    (lang, words, langsAvailable) => {
        const tranlations = R.map(x => ({ [x.toUpperCase()]: words[R.trim(R.toUpper(`LANG_${x}`))] }), langsAvailable)
            .reduce((acc, cur) => {
                const k = Object.keys(cur)[0];
                return { ...acc, [k]: cur[k] }
            }, {})
        return { lang, tranlations};
    }
)((props: StoreApp) => `Languages_words_list_Login_${props.languages.lang}`);

export default function LanguagesList<T>(props: Props<T>) {
    const { lang, tranlations } = useSelector(languagesWordsSelector);
    const items: ItemSearchBarList<string>[] = config.LANGUAGES.map(l => ({
        id: l,
        title: tranlations[l.toUpperCase()],
        raw: l,
        iconFlag: getFlagByLanguage(l)
    }))
    return <></>
}


/***  
 * 
 * 
 * <SearchBarList
        id={'languages'}
        noBounces={true}
        items={items}
        selectedIdItems={[lang]}
        sizeIcon={40}
        selectItem={item => {
            const newSelected = props.select(item.raw)
            return newSelected;
        }}
    />
 * 
 */