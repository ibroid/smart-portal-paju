import { Store } from "pullstate";
import { IGlobalState } from "../interfaces/IState";

export const GlobalState = new Store<IGlobalState>({
    isLoading: false,
    loadingMessage: 'Loading ...',
    isAuth: 0
})