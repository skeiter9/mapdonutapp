import React, { useState, useEffect, useRef, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import createCachedSelector, { createStructuredCachedSelector } from 're-reselect';
import { Alert, View, Platform, SafeAreaView, Keyboard, SectionList, SectionListStatic, ActivityIndicator } from 'react-native';
import { ItemSearchBarList } from '../@types/searchBarList';
import { RNN_screenProps } from '../@types/rnn';
import { StoreApp } from '../@types/redux';
import SearchBar from 'react-native-search-bar';
import getStore from '../store';
import SearchBarList from '../components/SearchBarList';
import Fuse from 'fuse.js';
import { Navigation } from 'react-native-navigation';
import { Flag } from 'react-native-svg-flagkit';

import R from 'ramda';
import { ScrollView } from 'react-native-gesture-handler';
import Text from '../components/TextTranslation';
import Layout from '../components/Layout';

import { Mapdonut_Country } from '../mapdonut_libs/countries/types';
import { viewportWidth, viewportHeight } from '../utils/dimentions';
import ButtonView from '../components/Button';
import { getFlagByLanguage } from '../utils/languages';
import flatten from 'ramda/es/flatten';
import useRnnBindScreen from '../hooks/useRnn';
import { themeSelector, languageSelector } from '../utils/appSelectors';
import { getAllCountries, getCountriesInOrderAlphabetic, getCountriesByCallingCode } from '../mapdonut_libs/countries/countries';
import { ItemInListCallingCode } from '../components/ItemInList';

/*
const wordsSelector = createCachedSelector(
    (s: StoreApp) => s.languages.words,
    (s: StoreApp, props: Props) => props.rnnId,
    (x) => {
        return {
            cancelText: x.CANCEL,
            placeholderText: x.SEARCH_PASSPORTS
        }
    }
)((s: StoreApp, p: Props) => p.rnnId + '_words');

const themeColorsSelector = createCachedSelector(
    (s: StoreApp) => s.theme.themeVariables.colors,
    (s: StoreApp, props: Props) => props.rnnId,
    (x) => x
)((s: StoreApp, p: Props) => p.rnnId + '_themeColor');

const themeSelector = createCachedSelector(
    (s: StoreApp) => s.theme.theme,
    (x) => x
)((s: StoreApp) => 'CURRENT_THEME');

const selectorRnnId = createCachedSelector(
    (p: Props) => p.rnnId,
    (x) => x
)((p: Props) => 'cmp_' + p.rnnId);

const initialItemsSelector = createCachedSelector(
    (props: Props) => props.initialItems,
    (initialItems) => {
        const sortItems = R.pipe(
            R.groupBy((item: ItemSearchBarList) => {
                return (item.title.trim()).charAt(0)
            }),
            R.toPairs,
            R.map(x => ({
                title: x[0],
                data: x[1],
            }))
        )
        const items = sortItems(initialItems || []);
        return items;
    }
)((p: Props) => p.rnnId + '_initialItems');   // TODO (passports || [])



const fuseOptsSelector = createCachedSelector(
    (p: Props) => p.fuseOptions,
    (x) => x
)((p: Props) => 'cmp_fuseOptions_' + p.rnnId);
*/
const ITEM_HEIGHT = 50;

interface Section {
    title: string,
    data: Mapdonut_Country[]
}
export interface Props<T = any> extends RNN_screenProps {
    typeList: 'calling_codes' | 'passports',
    selectItem: (item: Mapdonut_Country) => string[],
    //maxItemsPerPage?: number,
    //selectedIdItems: string[],
    //fuseOptions: (searchText: string) => Fuse.FuseOptions<ItemSearchBarList<T>>
}



//const mainSelector = createStructuredCachedSelector<Props, { selectedIdItems: string[], rnnId: string }>({
//    //initialItems: (props: Props) => props.initialItems,
//    selectedIdItems: (props: Props) => props.selectedIdItems,
//    rnnId: (props: Props) => props.rnnId,
//})((props) => `view_${props.rnnId}`)

const initialItemsSelector = createCachedSelector(
    (l: string) => l,
    (l:string, props: Props) => props.typeList,
    (lang, typeList) => {
        const COUNTRIES_BY_CALLING_CODE = (lang: string) => getCountriesInOrderAlphabetic(getCountriesByCallingCode(lang));
        const COUNTRIES_BY_PASSPORT = (lang: string) => getCountriesInOrderAlphabetic(getAllCountries(lang));
        const items = {
            calling_codes: COUNTRIES_BY_CALLING_CODE(lang),
            passports: COUNTRIES_BY_PASSPORT(lang)
        };
        return items[typeList];
    }
)((lang: string, props: Props) => `Countries_list_${props.typeList}_${lang}`);

//const Item = memo(Item_);
const List = memo(List_);
const ViewListMemo = memo(ViewList);
const HeaderItem = memo(HeaderItem_)

ViewList.propTypes = {
    componentId: PropTypes.string.isRequired,
    typeList: PropTypes.string.isRequired
};

export default ViewListMemo;

function ViewList<T>(props: Props) {
    //const { selectedIdItems, rnnId } = mainSelector(props);
    
    /*
    const initialItems = initialItemsSelector(props);
    const initialItemsSelected = initialItemsSelectedSelector(props);
    const fuseOptions = fuseOptsSelector(props);
    const rnnId = selectorRnnId(props);
    const colors = themeColorsSelector(getStore().getState(), props);
    */
    

    //const onSearchButtonPress = () => sRef && sRef.current ? sRef.current.unFocus() : null
    //const onCancelButtonPress = () => rnnId ? (() => {
    //    Keyboard.dismiss();
    //    Navigation.dismissModal(rnnId);
    //})() : null;

    //const selectItem = (item: ItemSearchBarList<T>) => {
    //    const newSelectedItems = props.selectItem(item);
    //    if (!newSelectedItems) return;
    //    //setSelectedItems(newSelectedItems);
    //    return newSelectedItems;
    //}

    //let init = false;
    //useEffect(() => {
    //    if (!init && sRef.current) sRef.current.focus();
    //    init = true;
    //}, [sRef.current]);

    const { componentId, selectItem } = props;
    const { lang } = useSelector(languageSelector);
    const initialItems = initialItemsSelector(lang, props);
    const { themeVariables: { colors } } = useSelector(themeSelector);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [showList, setShowList] = useState(false);
    const sRef = useRef<SearchBar | null>(null);

    const sectionListRef = useRef<any>(null);
    const [items, setItems] = useState([] as Section[]);

    const scrollTo = (letter: string) => {
        const index = items.findIndex(c_ => c_.title === letter);
        console.log('scroll to', letter, index, { sectionListRef: sectionListRef.current});
        if (!!sectionListRef.current) {
            sectionListRef.current.scrollToLocation({ animated: false, itemIndex: 0, sectionIndex: index })
        }
    }

    const onScrollToIndexFailed = (_info: {
        index: number
        highestMeasuredFrameIndex: number
        averageItemLength: number
    }) => {
        console.log({ onScrollToIndexFailed: _info});
    }

    console.log('PROPS, SELCTE PASSPOORT', props);

    const componentDidAppear = () => {
        setItems(initialItems)
    }

    let init = false;
    const onContentSizeChange = (e: any) => {
        console.log({ onContentSizeChange: e });
        if (e > 400 && !init) {
            init = true;
            const t = setTimeout(() => {
                console.log({ INIT_onContentSizeChange: e });
                setShowList(true);
                clearTimeout(t);                
            }, 800);
        }
    }
    
    if (componentId) useRnnBindScreen(this, componentId, { componentDidAppear })

    //
    const loader = <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 32,
        position: 'absolute',
        backgroundColor: colors.background,
        //opacity: .6,
        width: viewportWidth,
        height: viewportHeight
    }}>
        <ActivityIndicator size="large" color={colors.text} />
    </View>;

    const content = <>
        <List {...{ initialItems: items, onScrollToIndexFailed, sectionListRef, onContentSizeChange, onPress: selectItem }} />
        <ScrollView bounces={false} style={{ position: 'absolute', right: 0, height: '100%' }}
            contentContainerStyle={{
                alignItems: 'center', justifyContent: "center",
                width: 32, height: '100%',
            }}
        >
            {
                items.map((c: Section) => <Letter key={c.title} letter={c.title} scrollTo={scrollTo} />)
            }
        </ScrollView>
    </>

    return (
        <SafeAreaView style={{flexDirection: 'row'}}>

            { !showList ? loader : null }

            { content }
            
        </SafeAreaView>
    );
}

function List_(props: any) {
    const { onScrollToIndexFailed, initialItems, sectionListRef, onContentSizeChange, onPress } = props;
    return (
        <SectionList
            keyExtractor={(item, index) => item.cca2 + index}
            sections={initialItems}
            renderItem={({ item }) => <ItemInListCallingCode
                title={item.name} flag={item.cca2} ccode={item.ccode}
                height={ITEM_HEIGHT}
                onPress={() => onPress(item)}
            />}
            renderSectionHeader={({ section: { title } }) => (
                <HeaderItem title={title} />
            )}
            renderScrollComponent={props => <ScrollView {...props} />}
            ref={sectionListRef}
            keyboardDismissMode={'on-drag'}
            onContentSizeChange={onContentSizeChange}
            
            //onScrollToIndexFailed={onScrollToIndexFailed}
            getItemLayout={(data, index) => {
                //console.log(data);
                return (
                    { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index }
                )
            }}
            initialNumToRender={20}
            //windowSize={50}
            //removeClippedSubviews={true}
            //maxToRenderPerBatch={50}
            //updateCellsBatchingPeriod={600}
            
        />
    )
}

function HeaderItem_(props: any) {
    const {title} = props;
    return <Layout color="surface" style={{
        padding: 4,
        height: ITEM_HEIGHT * 0.6,
    }}>
        <Text fontStyle='bodyEmphasized'> {title } </Text>
    </Layout>
}


interface LetterProps {
    letter: string
    scrollTo(letter: string): void
}
const Letter = ({ letter, scrollTo }: LetterProps) => {
    return (
        <ButtonView
            testID={`letter-${letter}`}
            key={letter}
            onPressIn={(e) => {
                scrollTo(letter)
            }}
        >
            <Text fontStyle={'caption2'} color='primary'> {letter} </Text>
        </ButtonView>
    )
}

/** 
 * 
 * 
 *
interface Item {
    title: string, flag: string, callingCode: string[], ccode: string
}

interface ItemProps {
    //title: string, flag: string, callingCode: string[],
    item: Mapdonut_Country
}

const itemSelector = createStructuredCachedSelector<ItemProps, Item>({
    title: (props: ItemProps) => props.item.name,
    flag: (props: ItemProps) => props.item.cca2,
    ccode: (props: ItemProps) => props.item.ccode || '',
    callingCode: (props: ItemProps) => props.item.callingCode,
})((props) => `item_${props.item.cca2}`)

function Item_(props: ItemProps) {
    const { title, flag, ccode, callingCode } = itemSelector(props);
    //const [state] = useState(itemSelector(props));
    //console.log('Items Changed', title);
    return <View style={{ flexDirection: 'row', alignItems: 'center',
        height: ITEM_HEIGHT,
        paddingHorizontal: 16, paddingVertical: 12
    }}>
        <Flag id={flag} size={0.15} />
        <View style={{ marginRight: 8 }} />
        <Text fontStyle='bodyEmphasized' >+{ccode}</Text>
        <Text> {title} </Text>
    </View>
}
 * 
 * 
 * 
 * 
 * <View>
        <SafeAreaView style={{ backgroundColor: colors.surface }}>
            <View style={{ backgroundColor: colors.surface, paddingBottom: 8 }}>
                <SearchBar
                    onChangeText={setSearchText}
                    placeholder={placeholderText}
                    ref={sRef}
                    //onFocus={onFocus}
                    //onBlur={onBlur}
                    onCancelButtonPress={onCancelButtonPress}
                    onSearchButtonPress={onSearchButtonPress}
                    searchBarStyle='prominent'
                    keyboardAppearance={theme === 'dark' ? 'dark' : 'default'}
                    barStyle={theme === 'dark' ? 'black' : 'default'}
                    hideBackground={true}
                    autoCorrect={true}
                    spellCheck={false}
                    barTintColor={colors.background}
                    tintColor={colors.primary}
                    textColor={colors.text}
                    textFieldBackgroundColor={colors.background}
                    cancelButtonText={cancelText}
                    keyboardType={Platform.OS === 'ios' ? 'web-search' : 'default'}
                />
            </View>
        </SafeAreaView>

        <SectionList
            sections={initialItems}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item title={item} />}
            renderSectionHeader={({ section: { title } }) => (
                <Text style={styles.header}>{title}</Text>
            )}
        >
    </View>
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * <SearchBarList<any>
            id={`list_${rnnId}`}
            items={items}
            selectedIdItems={selectedItems}
            selectItem={selectItem}
            searchText={searchText}
            fuseOptions={fuseOptions}
            sizeIcon={32}
        />
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * /*
    const { selectedIdItems, _initialItems, words, themeVariables: {colors}, theme } = itemsSelected(props, getStore().getState())
    const [searchText, setSearchText] = useState('');
    const sRef = useRef<SearchBar | null>(null);
    const MAX_ITEMS_PERPAGE = 4;
    const [initialItems] = useState(_initialItems);
    const [parsedItems, setItems] = useState(initialItems.slice(0, MAX_ITEMS_PERPAGE));

    

    const change$ = new Subject<string>();
    const obs = of(null).pipe(
        switchMap(() => change$),
        tap((text) => {
            if (text.length === 0) return setItems(initialItems.slice(0, MAX_ITEMS_PERPAGE));
        }),
        distinctUntilChanged(),
        tap(text => {
            if (text.length === 0) return;
            const itemsParsed = searchOnListWithFuse(initialItems, text, fuseOptions(text))
            setItems(itemsParsed.slice(0, MAX_ITEMS_PERPAGE));
        })
    ).subscribe();

    useEffect(() => {
        change$.next(searchText);
    }, [searchText]);

    useEffect(() => {
        if (sRef.current) sRef.current.focus();
        return () => {
            obs.unsubscribe();
        }
    }, []);

    const dispatch = useDispatch();

    const _selectItem = (item: ItemSearchBarList<any>) => {
        selectItem(item)
    }
    */