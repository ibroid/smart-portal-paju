import React from "react";
import { IIdentityResponse, IUserResponse } from "../interfaces/IResponse";
import { IdentityState, UserState } from "../state";
import Helper from "./helper";

export function setIdentityState(data: any) {
    IdentityState._updateState({
        pihak_id: data.id,
        pihak_satu_id: data.pihak_satu.id,
        perkara_id: data.pihak_satu.perkara_id,
        nama_lengkap: data.nama,
        nik: data.nomor_indentitas,
        telepon: data.telepon,
        email: data.email,
        alamat: data.alamat,
        tempat_lahir: data.tempat_lahir,
        tanggal_lahir: data.tanggal_lahir,
        pekerjaan: data.pekerjaan,
        pendidikan: Helper.Pendidikan(data.pendidikan_id),
        agama: Helper.Agama(data.agama_id),
    })
}

export function setUserState(data: any) {
    UserState._updateState({
        id: data.id,
        created_at: data.created_at,
        updated_at: data.updated_at,
        user_fullname: data.user_fullname,
        user_email: data.user_email,
        user_nik: data.user_nik,
        user_phone: data.user_phone
    })

}