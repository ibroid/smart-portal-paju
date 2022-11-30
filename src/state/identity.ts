import { Store } from "pullstate";
import { IIdentityState } from "../interfaces/IState";

export const IdentityState = new Store<IIdentityState>({
    pihak_id: 0,
    pihak_satu_id: 0,
    perkara_id: 0,
    nama_lengkap: "",
    nik: 0,
    telepon: 0,
    email: "",
    alamat: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    pekerjaan: "",
    pendidikan: "",
    agama: "",
})