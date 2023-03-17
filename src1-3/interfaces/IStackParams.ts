import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AppStackParams = {
    Splash: undefined;
    Auth: undefined;
    Home: undefined;
    JadwalSidang: undefined;
    Putusan: undefined;
    AktaCerai: undefined;
    Transaksi: undefined;
    Pengumuman: undefined;
    Pendaftaran: undefined;
    Survey: undefined;
    DataStatistic: undefined;
    Chat: undefined;
    Saksi: undefined;
    CekBiaya: undefined;
    Antrian: undefined;
    Profil: undefined;
    DataUmum: undefined;
    DriveThru: undefined;
};

export type AppStackProps<T extends keyof AppStackParams> = NativeStackScreenProps<AppStackParams, T>

export type PengumumanStackProps<T extends "DaftarPengumuman" | "KontenPengumuman"> = NativeStackScreenProps<{
    DaftarPengumuman: undefined;
    KontenPengumuman: { id: string };
}, T>

export type PendaftaranStackProps<T extends "AlurPendaftaran" | "Persyaratan" | "Informasi"> = NativeStackScreenProps<{
    AlurPendaftaran: undefined;
    Persyaratan: undefined;
    Informasi: undefined;
}, T>

export type SurveyStackProps<T extends "Daftar" | "Pengisian"> = NativeStackScreenProps<{
    Daftar: undefined;
    Pengisian: { kode: string };
}, T>;

export type SaksiStackProps = NativeStackScreenProps<{
    DaftarSaksi: undefined;
    FormSaksi: undefined;
}, 'DaftarSaksi'>;

export type AuthStackProps = NativeStackScreenProps<{
    Login: undefined;
    Register: undefined;
    Modal: undefined;
    Home: undefined
}, 'Login'>;