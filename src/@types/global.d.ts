import { Observable } from "rxjs"
import { actionGeneral, StoreApp } from "./redux"
import { StateObservable, ActionsObservable } from "redux-observable"

export type action$ = ActionsObservable<actionGeneral>;
export type state$ = StateObservable<StoreApp>;

