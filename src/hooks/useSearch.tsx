import Fuse from 'fuse.js';
import { ItemSearchBarList } from '../@types/searchBarList';

export function searchOnListWithFuse<T>(initialItems: ItemSearchBarList<T>[], text: string, fuseOptions: Fuse.FuseOptions<ItemSearchBarList<T>>) {
    const fuse = new Fuse(initialItems, fuseOptions);
    return fuse.search(text);
}
