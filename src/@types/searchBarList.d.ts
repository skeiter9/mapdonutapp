
export interface ItemSearchBarList<T = any> {
    title: string;
    id: string;
    raw: T,
    subtitle?: string,
    icon?: string,
    iconFlag?: string,
    iconElement?: JSX.Element,
    sizeIcon?: number
}
