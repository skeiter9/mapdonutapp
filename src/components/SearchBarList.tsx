import React, { useState } from 'react';
import { View, Text, FlatList, Platform  } from 'react-native';
import { useSelector } from 'react-redux';
import createCachedSelector from 're-reselect';
import { contains, ascend, sortWith, prop } from 'ramda';
import Fuse from 'fuse.js';
import { ItemSearchBarList } from '../@types/searchBarList';
import { themeSelector } from '../utils/appSelectors';
import Button from './Button';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Flag } from 'react-native-svg-flagkit';

type selectItem<T> = (item: ItemSearchBarList<T>) => string[];

interface Props<T> {
    id: string
    items: ItemSearchBarList<T>[],
    selectItem: selectItem<T>
    selected?: string,
    selectedIdItems?: string[],
    loadMore?: () => void,

    sortBy?: 'title' | 'id',
    fuseOptions?: (searchText: string) => Fuse.FuseOptions<ItemSearchBarList<T>>
    searchText?: string;

    itemsPerPage?: number;
    sizeIcon?: number
    noBounces?:boolean
}

interface ItemProps<T> {
    item: ItemSearchBarList<T>;
    title: string,
    subtitle?: string,
    selectItem: selectItem<T>;
    listId: string,
    sizeIcon?: number,
    isSelected: boolean
}

export function searchOnList<T>(initialItems: ItemSearchBarList<T>[], text: string, fuseOptions: Fuse.FuseOptions<ItemSearchBarList<T>>) {
    const fuse = new Fuse(initialItems, fuseOptions);
    return fuse.search(text);
}

const orderList = (items: ItemSearchBarList<any>[], selectedIdItems: string[], fuseOptions: any, searchText: string, sortBy?: string) => {
    const isSelected = (item: ItemSearchBarList) => contains(item.id, (selectedIdItems || [])) ? -1 : 1;  //selectedIdItems.find(id => id === c.id) ? -1 : 1;
    const parsedItem = fuseOptions && searchText ?
        searchOnList(items, searchText, fuseOptions(searchText)) :
        sortWith([
            isSelected,
            ascend(prop(sortBy || 'title')),
        ], items);
        
    return parsedItem;
}

const itemsSelector = createCachedSelector(
    (props: Props<any>) => props.items,
    (props: Props<any>) => props.selectedIdItems,
    (props: Props<any>) => props.fuseOptions,
    (props: Props<any>) => props.searchText,
    (props: Props<any>) => props.searchText,
    (props: Props<any>) => props.sortBy,
    (items, selectedIdItems, fuseOptions, searchText, sortBy) => {
        const _items = orderList(items, selectedIdItems || [], fuseOptions, searchText || '', sortBy);
        return {
            items: _items,
            selectedIdItems: selectedIdItems || []
        }
        //const isSelected = (item: ItemSearchBarList) => contains(item.id, (selectedIdItems || [])) ? -1 : 1;  //selectedIdItems.find(id => id === c.id) ? -1 : 1;
        //const parsedItem = fuseOptions && searchText ?
        //    searchOnList(items, searchText, fuseOptions(searchText)) :
        //    sortWith([
        //        isSelected,
        //        ascend(prop(sortBy || 'title')),
        //    ], items);
        //const _parsedItems = parsedItem;//parsedItem.slice(0.4);
        ////console.log({ searchText, _parsedItems, fuseOps: fuseOptions ? fuseOptions(searchText || '') : null });
        //console.log(_parsedItems);
        //return _parsedItems;
    }
)((props) => `SearchListFor_${props.id}`);

export default function SearchBarList<T>(props: Props<T>) {
    //const { items, selectedIdItems, sortBy, fuseOptions, searchText } = itemsSelector(props);
    //const [itemsParsed, setItems] = useState(items.slice(0, 4)); 
    //const { themeVariables } = useSelector(themeSelector);

    //const [items, setItems] = useState(itemsSelector(props));
    const { items } = itemsSelector(props);

    const [selectedIdItems, setSelectedIdItems] = useState(props.selectedIdItems || [])

    return <FlatList
        bounces={!!props.noBounces ? false : true}
        data={orderList(items, selectedIdItems, props.fuseOptions, props.searchText || '', props.sortBy)}
        //data={items}
        keyExtractor={(item) => item.id}
        initialNumToRender={props.itemsPerPage || 12}
        onEndReachedThreshold={20}
        keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
        onEndReached={(onEndReachedInfo) => console.log({onEndReachedInfo})}
        extraData={selectedIdItems.join(',')}
        renderItem={({ item, separators }) => <Item<T>
            listId={props.id}
            sizeIcon={props.sizeIcon}
            item={item}
            title={item.title}
            subtitle={item.subtitle}
            selectItem={item => {
                const newSelectedItems = props.selectItem(item);
                //const newOrder = orderList(items, newSelectedItems, props.fuseOptions, props.searchText || '', props.sortBy);
                setSelectedIdItems(newSelectedItems);
                //setItems(newOrder);
                //separators.updateProps('trailing', { isSelected: true});
                return newSelectedItems;
            }}
            isSelected={!!selectedIdItems.find(id => id === item.id)}
        />}
    />
}

const isSelectedSelector = createCachedSelector(
    (props: ItemProps<any>) => props.isSelected,
    (x) => x
)((props) => `list_${props.listId}_ItemCacheIsSelect`);

const itemSelector = createCachedSelector(
    (props: ItemProps<any>) => props.item,
    (item) => item
)((props) => `list_${props.listId}_ItemCache`);

const itemIdSelector = createCachedSelector(
    (props: ItemProps<any>) => props.item.id, x => x
)((x) => `list_${x.listId}_itemIdSelector_${x.item.id}`);

const itemTitleSelector = createCachedSelector(
    (props: ItemProps<any>) => props.title, x => x
)((x) => `list_${x.listId}_itemTitleSelector_${x.item.id}`);

const itemSubTitleSelector = createCachedSelector(
    (props: ItemProps<any>) => props.subtitle, x => x
)((x) => `list_${x.listId}_itemSubTitleSelector_${x.item.id}`);

const itemIconFlagSelector = createCachedSelector(
    (props: ItemProps<any>) => props.item.iconFlag, x => x
)((x) => `list_${x.listId}_itemIconFlagSelector_${x.item.id}`);

const itemIconSelector = createCachedSelector(
    (props: ItemProps<any>) => props.item.icon, x => x
)((x) => `list_${x.listId}_itemIconSelector_${x.item.id}`);

const itemIconElementSelector = createCachedSelector(
    (props: ItemProps<any>) => props.item.iconElement, x => x
)((x) => `list_${x.listId}_itemIconElementSelector_${x.item.id}`);

import { sanFranciscoWeights, iOSUIKit, material } from 'react-native-typography'
import { StoreApp } from '../@types/redux';

const colorsSelector = createCachedSelector(
    (s: StoreApp) => s.theme.themeVariables,
    (tv) => {
        return {
            primary: tv ? tv.colors.primary : '',
            background: tv ? tv.colors.background : '',
            text: tv ? tv.colors.text : '',
        }
    }
) ((x) => `Current_themeVAriables`);

function Item<T>(props: ItemProps<T>) {
    const { selectItem } = props;
    //const { themeVariables } = useSelector(themeSelector).themeVariables;
    const { primary, background, text } = useSelector(colorsSelector);
    const isSelected = isSelectedSelector(props);
    const [title, subtitle, iconFlag, icon, iconElement, _item] = [
        itemTitleSelector(props),
        itemSubTitleSelector(props),
        itemIconFlagSelector(props),
        itemIconSelector(props),
        itemIconElementSelector(props),
        itemSelector(props)
    ];
    const ICON_BOX_WIDTH = props.sizeIcon ? (props.sizeIcon * 1.5) : 32;
    const margins = (props.sizeIcon || 32) / 2;


    return <Button useReactNative onPress={() => selectItem(_item)}>
        <View style={{ paddingHorizontal: 16, paddingVertical: margins / 1.5 , flexDirection: 'row', alignItems: 'center'}}>
            
            {
                iconFlag || icon || iconElement ?
                    <View style={{ backgroundColor: isSelected ? primary : background,
                        borderRadius: ICON_BOX_WIDTH, width: ICON_BOX_WIDTH, height: ICON_BOX_WIDTH, justifyContent: "center",
                        alignItems: "center" }}
                    >
                        {
                            iconFlag ? <Flag id={iconFlag } width={props.sizeIcon || 32} height={props.sizeIcon || 32} /> :
                            icon ? <Icon name={icon} size={props.sizeIcon || 32} color={isSelected ? primary : text} />:
                            iconElement ? iconElement
                            : null
                        }
                    </View> : null
            }

            <View style={{ marginLeft: margins, alignContent: "flex-start", justifyContent: "center", flex: 1 }}>
                <Text style={{
                    ...( (props.sizeIcon || 0) >= 40 ? iOSUIKit.title3Object : iOSUIKit.bodyObject),
                    ...sanFranciscoWeights.medium,
                    color: isSelected ? primary : text,
                }}> {title} </Text>
                {subtitle ? <Text style={{ fontSize: 14, color: isSelected ? primary : text }}> {subtitle} </Text> : null}
            </View>
        </View>
    </Button>;
}

