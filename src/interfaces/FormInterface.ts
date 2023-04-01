export interface IFormSignUp {
    namaLengkap: string;
    nomorTelepon: string;
    password: string;
    nomorPerkara?: string;
    tahunPerkara?: string;
    jenisPerkara?: string;
};

export interface IFormSignIn {
    nomorTelepon: string;
    password: string;
};

export interface IPerkaraForm {
    nomorPerkara: string;
    tahunPerkara: string;
    jenisPerkara: string;
}