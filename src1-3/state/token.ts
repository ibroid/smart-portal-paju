import { Store } from "pullstate";
import { IGlobalState } from "../interfaces/IState";

export const TokenState = new Store({
    access: '',
    refresh: ''
})