import { Mapdonut_Country_Code } from "../countries/types";
import { FieldValue } from "../../@types/firebase";

interface Mapdonut_Visa {
    status: string,
    cca2: Mapdonut_Country_Code
}

export type Mapdonut_visa_by_passport = { [key in Mapdonut_Country_Code]: Mapdonut_Visa };

export interface Mapdonut_Visa_datasource {
    cca2: Mapdonut_Country_Code,
    timestamp: FieldValue,
    visas: Mapdonut_visa_by_passport
}