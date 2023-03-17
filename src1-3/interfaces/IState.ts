export interface IGlobalState {
    isAuth: number;
    isLoading: boolean;
    loadingMessage: string;
}

export interface IUserState {
    created_at: string | Date,
    updated_at: string | Date,
    user_fullname: string,
    user_email: string,
    user_phone: string,
    user_nik: string,
}

export interface IIdentityState {
    pihak_id: number;
    pihak_satu_id: number;
    perkara_id: number;
    nama_lengkap: string;
    nik: number;
    telepon: number;
    email: string;
    alamat: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    pendidikan: string;
    agama: string;
    pekerjaan: string;
}