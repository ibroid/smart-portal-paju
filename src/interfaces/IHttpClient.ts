import { Axios, AxiosResponse } from "axios";

export interface IHttpClient {
    checkConnection(): Promise<AxiosResponse>;

    login(nik: string | undefined, password: string | undefined): Promise<AxiosResponse>;

    logout(): Promise<AxiosResponse>

    getIdentity(): Promise<AxiosResponse>

    getUserData(): Promise<AxiosResponse>

    getJadwalSidang(perkara_id: number): Promise<AxiosResponse>

    getTransaksi(perkara_id: number): Promise<AxiosResponse>

    getPutusan(perkara_id: number): Promise<AxiosResponse>

    getAktaCerai(perkara_id: number): Promise<AxiosResponse>
}