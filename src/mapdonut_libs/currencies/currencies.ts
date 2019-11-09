import { Mapdonut_Currency_symbol, Mapdonut_Currency_raw, Mapdonut_Currency, OBSOLETE_CURRENCIES, UNOFICIAL_CURRENCIES_CODES, Mapdonut_Currency_Code, FLAGS_BY_CURRENCY, UNKNOW_CURRENCIES_CODES, CURRENCIES_ACTIVE_CODES } from "./currencies_types";
import { getCountriesByCurrency } from "../countries/countries";
import { filter } from 'ramda';

let datasource: Mapdonut_Currency[];

export const loadDataSource = ((datasource) => () => {
    if (!datasource) datasource = require('./data/currencies.json');
    return datasource
})(datasource);

const symbols = require('./symbols.json') as Mapdonut_Currency_symbol[];

export function getAllCurrencies(lang: string = 'en', includeUnoficial: boolean = false, includeObsoletes: boolean = false) {

    const currencies = filter((c) => {
        if (includeObsoletes && (c.is_obsolete || !!OBSOLETE_CURRENCIES.find(obs => obs === c.iso) )) return true;
        if (includeUnoficial && (!!UNOFICIAL_CURRENCIES_CODES.find(un => un === c.iso))) return true;
        if (!!CURRENCIES_ACTIVE_CODES.find(iso => iso === c.iso)) return true;
        return false;
    }, loadDataSource())
        .map(c => {
            const symbol = symbols.find(s => s.iso === c.iso);
            const countries = getCountriesByCurrency(c.iso);//.map(c => c.cca2);
            return {
                ...c,
                symbol: symbol ? symbol.symbol : '',
                countries
            } as Mapdonut_Currency
        });

    return currencies;
}

export function getFlag(currencyCode: Mapdonut_Currency_Code) {
    const currenyMainCOuntry = Object.keys(FLAGS_BY_CURRENCY).find(iso => (' ' + iso).trim() === currencyCode);
    if (currenyMainCOuntry && currenyMainCOuntry !== 'REGIONAL') return FLAGS_BY_CURRENCY[currenyMainCOuntry];
    if (currenyMainCOuntry === 'REGIONAL') return 'REGIONAL';
    const countriesCode = getCountriesByCurrency(currencyCode).map(c => c.cca2);
    if (countriesCode.length === 1) return countriesCode[0];
    return 'NONE'
}

export function getCurrencySymbol(currencyCode: Mapdonut_Currency_Code) {
    const res = getAllCurrencies().find(c => c.iso === currencyCode);
    if (!res) throw new Error(`Unable to find ${currencyCode}`);
    return res && res.symbol ? res.symbol : res ? res.iso : 'NONE';
}

export function getCurrency(currencyCode: Mapdonut_Currency_Code) {
    const res = getAllCurrencies().find(c => c.iso === currencyCode);
    if (!res) throw new Error(`Unable to find ${currencyCode}`)
    return res;
}

