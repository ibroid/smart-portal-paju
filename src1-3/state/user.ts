import { Store } from "pullstate";
import { IUserState } from "../interfaces/IState";

export const UserState = new Store<IUserState>({
    created_at: "",
    updated_at: "",
    user_fullname: "",
    user_email: "",
    user_phone: "",
    user_nik: ""
})