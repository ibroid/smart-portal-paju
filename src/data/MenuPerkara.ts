import { ICourtMenu } from "../interfaces/IMenu";
export const courtMenu: ICourtMenu[] = [
    {
        icon: 'book',
        name: 'Umum',
        color: '#37a4c3',
        url: 'DataUmum',
    },
    {
        icon: 'calendar-alt',
        name: 'Sidang',
        color: '#f27d47',
        url: 'JadwalSidang',
    },
    {
        icon: 'users',
        name: 'Saksi',
        color: '#b7d33a',
        url: 'Saksi',
    },
    {
        icon: 'money-bill-wave',
        name: 'Transaksi',
        color: '#e42868',
        url: 'Transaksi',
    },
    {
        icon: 'file-alt',
        name: 'Putusan',
        color: '#3caa2a',
        url: 'Putusan',
    },
    {
        icon: 'print',
        name: 'Akta Cerai',
        color: '#06304b',
        url: 'AktaCerai',
    },
    {
        icon: 'newspaper',
        name: 'Berita',
        color: '#f96ff0',
        url: 'Pengumuman'
    },
    {
        icon: 'pencil-alt',
        name: 'Pendaftaran',
        color: '#24da96',
        url: "Pendaftaran"
    },
    {
        icon: 'money-check-alt',
        name: 'Biaya Perkara',
        color: '#293f04',
        url: 'CekBiaya'
    },
    {
        icon: 'pen-alt',
        name: 'Survey',
        color: '#791fe9',
        url: 'Survey'
    },
    {
        icon: 'people-arrows',
        name: 'Antrian',
        color: '#ec5e85',
        url: 'Antrian'
    },
    // {
    //     icon: 'book',
    //     name: 'Permohonan Informasi',
    //     color: '#fff',
    //     url: 'Informasi'
    // },
    {
        icon: 'motorcycle',
        name: 'Drive Thru',
        color: '#de9a45',
        url: 'DriveThru'
    },
];