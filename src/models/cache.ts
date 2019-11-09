import { cacheStore } from "../@types/cache";

import { Cache } from "react-native-cache";
import AsyncStorage from '@react-native-community/async-storage';

export const getSetCache = (name: string, maxEntries: number = 1000) => new Cache({
    namespace: name,
    policy: {
        maxEntries
    },
    backend: AsyncStorage
});

export const getItemsInCache = (cache: cacheStore, key: string) => new Promise((resolve, reject) => {
    cache.getItem(key, (err, value) => {
        if (err) reject(err)
        let items = value ? JSON.parse(value) : null;
        resolve(items);
    })
});

export const setItemsInCache = (cache: cacheStore, key: string, value: any) => new Promise((resolve, reject) => {
    const _value = JSON.stringify(value);
    cache.setItem(key, _value, (err) => {
        if (err) reject(err)
        resolve(_value);
    })
});


export const peekItem = (cache: cacheStore, key: string) => new Promise((resolve, reject) => {
    cache.peekItem(key, (err, value) => {
        if (err) reject(err)
        resolve(value ? JSON.parse(value) : null)
    });
})