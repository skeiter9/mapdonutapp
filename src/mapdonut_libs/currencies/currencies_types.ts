import { Mapdonut_Country } from "../countries/types"

export const CURRENCIES_ACTIVE_CODES = [
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "AUD",
    "AWG",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BOV",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYN",
    "BZD",
    "CAD",
    "CDF",
    "CHE",
    "CHF",
    "CHW",
    "CLF",
    "CLP",
    "CNY",
    "COP",
    "COU",
    "CRC",
    "CUC",
    "CUP",
    "CVE",
    "CZK",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EGP",
    "ERN",
    "ETB",
    "EUR",
    "FJD",
    "FKP",
    "GBP",
    "GEL",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KMF",
    "KPW",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRU",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MXV",
    "MYR",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "QAR",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SLL",
    "SOS",
    "SRD",
    "SSP",
    "STN",
    "SVC",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMT",
    "TND",
    "TOP",
    "TRY",
    "TTD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "USD",
    "USN",
    "UYI",
    "UYU",
    "UYW",
    "UZS",
    "VES",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XAG",
    "XAU",
    "XBA",
    "XBB",
    "XBC",
    "XBD",
    "XCD",
    "XDR",
    "XOF",
    "XPD",
    "XPF",
    "XPT",
    "XSU",
    "XTS",
    "XUA",
    "XXX",
    "YER",
    "ZAR",
    "ZMW",
    "ZWL"
] as const

export type Mapdonut_Currency_Code = typeof CURRENCIES_ACTIVE_CODES[number] |
    typeof UNOFICIAL_CURRENCIES_CODES[number] |
    typeof CRIPTOCURRENCIES[number] |
    typeof OBSOLETE_CURRENCIES[number]

export interface Mapdonut_Currency_symbol {
    iso: Mapdonut_Currency_Code,
    symbol: string
}

export interface Mapdonut_Currency_raw {
    iso: Mapdonut_Currency_Code,
    currency_name: string,
    is_obsolete: boolean,
    superceded_by?: string
}

export interface Mapdonut_Currency extends Mapdonut_Currency_raw {
    symbol: string,
    countries: Mapdonut_Country[],
    isRegional?: boolean
}

export type Mapdonut_currencies_supported = typeof currenciesSupportedByXE[number];

export const UNKNOW_CURRENCIES_CODES = [
    'SPL'
] as const;

export const UNOFICIAL_CURRENCIES_CODES = [
    'CNH',
    'CNH',
    'GGP',
    'IMP',
    'JEP',
    'KID',
    'NIS',
    'NTD',
    'PRB',
    'SLS',
    'RMB',
    'TVD',
    'ZWB',
] as const;

export const CRIPTOCURRENCIES = [
    'DASH',
    'ETH',
    'VTC',
    'XBC',
    'XBT',
    'XLM',
    'XMR',
    'XRP',
    'ZEC',
] as const;

export const OBSOLETE_CURRENCIES = [
    'ADF',
    'ADP',
    'AFA',
    'AOK',
    'AON',
    'AOR',
    'ARL',
    'ARP',
    'ARA',
    'ATS',
    'AZM',
    'BAD',
    'BEF',
    'BGL',
    'BOP',
    'BRB',
    'BRC',
    'BRN',
    'BRE',
    'BRR',
    'BYB',
    'BYR',
    'CSD',
    'CSK',
    'CYP',
    'DDM',
    'DEM',
    'ECS',
    'ECV',
    'EEK',
    'ESA',
    'ESB',
    'ESP',
    'FIM',
    'FRF',
    'GNE',
    'GHC',
    'GQE',
    'GRD',
    'GWP',
    'HRD',
    'IEP',
    'ILP',
    'ILR',
    'ISJ',
    'ITL',
    'LAJ',
    'LTL',
    'LUF',
    'LVL',
    'MAF',
    'MCF',
    'MGF',
    'MKN',
    'MLF',
    'MVQ',
    'MRO',
    'MXP',
    'MZM',
    'MTL',
    'NIC',
    'NLG',
    'PEH',
    'PEI',
    'PLZ',
    'PTE',
    'ROL',
    'RUR',
    'SDD',
    'SDP',
    'SIT',
    'SKK',
    'SML',
    'SRG',
    'STD',
    'SUR',
    'TJR',
    'TMM',
    'TPE',
    'TRL',
    'UAK',
    'UGS',
    'USS',
    'UYP',
    'UYN',
    'VAL',
    'VEB',
    'VEF',
    'XEU',
    'XFO',
    'XFU',
    'YDD',
    'YUD',
    'YUN',
    'YUR',
    'YUO',
    'YUG',
    'YUM',
    'ZAL',
    'ZMK',
    'ZRZ',
    'ZRN',
    'ZWC',
    'ZWD',
    'ZWN',
    'ZWR'
] as const;

export const REGIONAL_CURRENCIES = [
    'EUR',
    'XAF', // CFA franc BEAC || Central African CFA franc
    'XCD', // East Caribbean dollar
    'XOF', // CFA franc BCEAO || West African CFA franc //'XPF', // CFP franc (franc Pacifique) || CFP franc
    'XPF'
] as const;

export const CURRENCIES_MULTI_COUNTRY = [
    'USD',
    'ANG',
    'AUD',
    'CHF',
    'DKK',
    'GBP',
    'ILS',
    'MAD',
    'NOK',
    'NZD'
] as const;

export const FLAGS_BY_CURRENCY = {
    'EUR': 'EU',
    'USD': 'US',
    'ANG': 'CW',
    'AUD': 'AU',
    'CHF': 'CH',
    'DKK': 'DK',
    'GBP': 'GB',
    'ILS': 'IL',
    'MAD': 'MA',
    'NOK': 'NO',
    'NZD': 'NZ',
    'XAF': 'REGIONAL',
    'XCD': 'REGIONAL',
    'XOF': 'REGIONAL',
    'INR': 'IN',
    'DZD': 'DZ',
    'XPF': 'PF',
    'ZAR': 'ZA'
} as const;

export const currenciesSupportedByXE = [
    "AED",
    "AFN",
    "ALL",
    "AMD",
    "ANG",
    "AOA",
    "ARS",
    "ATS",
    "AUD",
    "AWG",
    "AZM",
    "AZN",
    "BAM",
    "BBD",
    "BDT",
    "BEF",
    "BGN",
    "BHD",
    "BIF",
    "BMD",
    "BND",
    "BOB",
    "BRL",
    "BSD",
    "BTN",
    "BWP",
    "BYN",
    "BYR",
    "BZD",
    "CAD",
    "CDF",
    "CHF",
    "CLP",
    "CNH",
    "CNY",
    "COP",
    "CRC",
    "CUC",
    "CUP",
    "CVE",
    "CYP",
    "CZK",
    "DEM",
    "DJF",
    "DKK",
    "DOP",
    "DZD",
    "EEK",
    "EGP",
    "ERN",
    "ESP",
    "ETB",
    "EUR",
    "FIM",
    "FJD",
    "FKP",
    "FRF",
    "GBP",
    "GEL",
    "GGP",
    "GHC",
    "GHS",
    "GIP",
    "GMD",
    "GNF",
    "GRD",
    "GTQ",
    "GYD",
    "HKD",
    "HNL",
    "HRK",
    "HTG",
    "HUF",
    "IDR",
    "IEP",
    "ILS",
    "IMP",
    "INR",
    "IQD",
    "IRR",
    "ISK",
    "ITL",
    "JEP",
    "JMD",
    "JOD",
    "JPY",
    "KES",
    "KGS",
    "KHR",
    "KMF",
    "KPW",
    "KRW",
    "KWD",
    "KYD",
    "KZT",
    "LAK",
    "LBP",
    "LKR",
    "LRD",
    "LSL",
    "LTL",
    "LUF",
    "LVL",
    "LYD",
    "MAD",
    "MDL",
    "MGA",
    "MGF",
    "MKD",
    "MMK",
    "MNT",
    "MOP",
    "MRO",
    "MRU",
    "MTL",
    "MUR",
    "MVR",
    "MWK",
    "MXN",
    "MXV",
    "MYR",
    "MZM",
    "MZN",
    "NAD",
    "NGN",
    "NIO",
    "NLG",
    "NOK",
    "NPR",
    "NZD",
    "OMR",
    "PAB",
    "PEN",
    "PGK",
    "PHP",
    "PKR",
    "PLN",
    "PTE",
    "PYG",
    "QAR",
    "ROL",
    "RON",
    "RSD",
    "RUB",
    "RWF",
    "SAR",
    "SBD",
    "SCR",
    "SDD",
    "SDG",
    "SEK",
    "SGD",
    "SHP",
    "SIT",
    "SKK",
    "SLL",
    "SOS",
    "SPL",
    "SRD",
    "SRG",
    "STD",
    "STN",
    "SVC",
    "SYP",
    "SZL",
    "THB",
    "TJS",
    "TMM",
    "TMT",
    "TND",
    "TOP",
    "TRL",
    "TRY",
    "TTD",
    "TVD",
    "TWD",
    "TZS",
    "UAH",
    "UGX",
    "USD",
    "UYU",
    "UZS",
    "VAL",
    "VEB",
    "VEF",
    "VES",
    "VND",
    "VUV",
    "WST",
    "XAF",
    "XAG",
    "XAU",
    "XBT",
    "XCD",
    "XDR",
    "XEU",
    "XOF",
    "XPD",
    "XPF",
    "XPT",
    "YER",
    "ZAR",
    "ZMK",
    "ZMW",
    "ZWD",
    "ZWL"
] as const;

export const currenciesSupported = currenciesSupportedByXE;