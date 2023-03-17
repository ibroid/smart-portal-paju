import { kode } from "../backend.json";

export const defaultBiaya = [
    {
        uraian: 'PNBP Pendaftaran',
        tarif: '30000',
    },
    {
        uraian: 'Biaya ATK Perkara',
        tarif: '50000',
    },
    {
        uraian: 'Redaksi',
        tarif: '10000',
    },
    {
        uraian: 'Materai',
        tarif: '10000',
    },
]
export const biaya: any = {
    ct: [
        {
            uraian: 'PNBP Relaas Pertama Pemohon',
            tarif: '10000',
        },
        {
            uraian: 'PNBP Relaas Pertama Termohon',
            tarif: '10000',
        },
        {
            uraian: 'Panggilan Sidang Kepada Pemohon (3x)',
            tarif: (p1: any, p2: any) => {

                if (p1[1] !== kode) {
                    p1[0] = 250000;
                    return p1[0] * 3;
                }
                return p1[0] * 3;
            }

        },
        {
            uraian: 'Panggilan Sidang Kepada Termohon (4x)',
            tarif: (p1: any, p2: any) => {

                if (p2[1] != kode) {
                    p2[0] = 250000;
                    return p2[0] * 4;
                }
                return p2[0] * 4;
            }

        },
        {
            uraian: 'PNBP Relaas Pemberitahuan Putusan Pemohon dan Termohon',
            tarif: '20000',
        }
    ],
    cg: [
        {
            uraian: 'PNBP Relaas Pertama Penggugat',
            tarif: '10000',
        },
        {
            uraian: 'PNBP Relaas Pertama Tergugat',
            tarif: '10000',
        },
        {
            uraian: 'Panggilan Sidang untuk Penggugat (2x)',
            tarif: (p1: any, p2: any) => {

                if (p1[1] != kode) {
                    p1[0] = 250000;
                    return p1[0] * 2;
                }
                return p1[0] * 2;
            }
        },
        {
            uraian: 'Panggilan Sidang untuk Tergugat (3x)',
            tarif: (p1: any, p2: any) => {

                if (p2[1] != kode) {
                    p2[0] = 250000;
                    return p2[0] * 3;
                }
                return p2[0] * 3;
            }
        },
        {
            uraian: 'PNBP Relaas Pemberitahuan Putusan Penggugat dan Tergugat',
            tarif: '20000',
        }
    ],
    ib: [
        {
            uraian: 'PNBP Relas Pertama Pemohon I',
            tarif: '10000',
        },
        {
            uraian: 'PNBP Relas Pertama Pemohon II',
            tarif: '10000',
        },
        {
            uraian: 'Panggilan Sidang untuk Pemohon I (2x)',
            tarif: (p1: any, p2: any) => {

                if (p1[1] != kode) {
                    p1[0] = 250000;
                    return p1[0] * 2;
                }
                return p1[0] * 2;
            }
        },
        {
            uraian: 'Panggilan Sidang untuk Pemohon II (2x)',
            tarif: (p1: any, p2: any) => {

                if (p2[1] != kode) {
                    p2[0] = 250000;
                    return p2[0] * 2;
                }
                return p2[0] * 2;
            }
        }
    ],
    dn: [
        {
            uraian: 'PNBP Relas Pertama Pemohon I',
            tarif: '10000',
        },
        {
            uraian: 'PNBP Relas Pertama Pemohon II',
            tarif: '10000',
        },
        {
            uraian: 'Panggilan Sidang untuk Pemohon I (2x)',
            tarif: (p1: any, p2: any) => {

                if (p1[1] != kode) {
                    p1[0] = 250000;
                    return p1[0] * 2;
                }
                return p1[0] * 2;
            }
        },
        {
            uraian: 'Panggilan Sidang untuk Pemohon II (2x)',
            tarif: (p1: any, p2: any) => {

                if (p2[1] != kode) {
                    p2[0] = 250000;
                    return p2[0] * 2;
                }
                return p2[0] * 2;
            }
        }
    ]
};

