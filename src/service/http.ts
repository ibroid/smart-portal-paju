import axios, { AxiosResponse, AxiosInstance } from "axios";
import { IHttpClient } from "../interfaces/IHttpClient";
import { SERVER_URL } from "../conf.json";
import { ICheckConnectionResponse, ILoginResponse } from "../interfaces/IResponse";
import { ILogoutResponse } from "../interfaces/IResponse";
import * as qs from "qs";

class HttpClient implements IHttpClient {
    public request: AxiosInstance;
    constructor() {
        this.request = axios.create({
            baseURL: SERVER_URL,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })

    }


    register(phone: string | undefined, nama: string | undefined, nik: string | undefined, password: string | undefined, device_id: string) {
        const queryString = qs.stringify({ phone, password, name: nama, nik });

        return this.request.post('/auth/register', queryString);

    }

    login(phone: string | undefined, password: string | undefined): Promise<AxiosResponse<any, any>> {
        const queryString = qs.stringify({ phone, password })

        return this.request.post<ILoginResponse>('/auth/login', queryString)
    }

    logout(): Promise<AxiosResponse<any, any>> {

        return this.request.post<ILogoutResponse>('/auth/logout');
    }

    getIdentity(): Promise<AxiosResponse<any, any>> {

        return this.request.get('/perkara/nik');
    }

    getUserData(): Promise<AxiosResponse<any, any>> {

        return this.request.get('/auth/user');
    }

    getJadwalSidang(perkara_id: number): Promise<AxiosResponse<any, any>> {

        return this.request.get(`/perkara/${perkara_id}/sidang`);
    }

    getTransaksi(perkara_id: number): Promise<AxiosResponse<any, any>> {

        return this.request.get(`/perkara/${perkara_id}/transaksi`);
    }

    checkConnection(): Promise<AxiosResponse<any, any>> {
        return this.request.get<ICheckConnectionResponse>('/check');
    }

    getPutusan(perkara_id: number): Promise<AxiosResponse<any, any>> {
        return this.request.get(`/perkara/${perkara_id}/putusan`)
    }

    getAktaCerai(perkara_id: number): Promise<AxiosResponse<any, any>> {
        return this.request.get(`/perkara/${perkara_id}/akta_cerai`)
    }
}

export default new HttpClient();