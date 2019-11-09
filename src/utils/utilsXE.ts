//import { Mapdonut_Currency_Code, currenciesSupportedByXE } from "../../mapdonut_libs/currencies/currencies_types";
import { encode } from "base-64";
import { contains } from 'ramda'
import { currenciesSupportedByXE, Mapdonut_Currency_Code } from "../mapdonut_libs/currencies/currencies_types";

interface XE_cred {
    accountID: string,
    apiKey: string
}

interface XE_response {
    terms: string,
    privacy: string,
    from: string,
    amount: number,
    timestamp: string,
    to: {
        quotecurrency: string,
        mid: number
    }[]
}

const fetchApi = (url: string, cred: XE_cred): Promise<XE_response> => fetch(
    url,
    {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + encode(cred.accountID + ":" + cred.apiKey),
        })
    })
    .then(r => r.json())

export function XEgetExchange(cred: XE_cred, from: Mapdonut_Currency_Code, amount: number = 100) {
    return fetchApi(
        `https://xecdapi.xe.com/v1/convert_from?from=${from}&to=*&amount=${amount}`,
        cred
    )
        .catch(errEX => {
            console.log({ errEX });
            return [];
        })
}

export function XEfromTo(cred: XE_cred, from: Mapdonut_Currency_Code, to: Mapdonut_Currency_Code, amount: number = 100) {

    if (!contains(from, currenciesSupportedByXE) || !contains(from, currenciesSupportedByXE)) return Promise.resolve(null);

    return fetchApi(
            `https://xecdapi.xe.com/v1/convert_from?from=${from}&to=${to}&amount=${amount}`,
            cred
        )
}
