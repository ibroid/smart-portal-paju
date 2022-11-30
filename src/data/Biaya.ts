export const defaultBiaya = [
    {
        uraian: 'PNBP Pendaftaran',
        tarif: '30000',
    },
    {
        uraian: 'Biaya Proses',
        tarif: '75000',
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
            uraian: 'Panggilan Sidang Kepada Pemohon (2x)',
            tarif: (p1: any, p2: any) => {

                if (p1[1] != '400622') {
                    p1[0] += 50000;
                    return p1[0] * 2;
                }
                return p1[0] * 2;
            }

        },
        {
            uraian: 'Panggilan Sidang Kepada Termohon (3x)',
            tarif: (p1: any, p2: any) => {

                if (p2[1] != '400622') {
                    p2[0] += 50000;
                    return p2[0] * 3;
                }
                return p2[0] * 3;
            }

        },
        {
            uraian: 'PNBP Relaas Pemberitahuan Putusan Pemohon',
            tarif: '10000',
        },
        {
            uraian: 'PNBP Relaas Pemberitahuan Putusan Termohon',
            tarif: '10000',
        },
        {
            uraian: 'Pemberitahuan isi Putusan Kepada Termohon',
            tarif: (p1: any, p2: any) => {

                if (p2[1] != '400622') {
                    p2[0] += 50000;
                    return p2[0] * 1;
                }
                return p2[0] * 1;
            }
        },
        {
            uraian: 'Panggilan Ikrar Talak untuk Pemohon',
            tarif: (p1: any, p2: any) => {

                if (p1[1] != '400622') {
                    p1[0] += 50000;
                    return p1[0] * 1;
                }
                return p1[0] * 1;
            }
        },
        {
            uraian: 'Panggilan Ikrar Talak untuk Termohon',
            tarif: (p1: any, p2: any) => {
                if (p2[1] != '400622') {
                    p2[0] += 50000;
                    return p2[0] * 1;
                }
                return p2[0] * 1;
            }
        },
        {
            uraian: 'PNBP Pencabutan',
            tarif: '10000',
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

                if (p1[1] != '400622') {
                    p1[0] += 50000;
                    return p1[0] * 2;
                }
                return p1[0] * 2;
            }
        },
        {
            uraian: 'Panggilan Sidang untuk Tergugat (3x)',
            tarif: (p1: any, p2: any) => {

                if (p2[1] != '400622') {
                    p2[0] += 50000;
                    return p2[0] * 3;
                }
                return p2[0] * 3;
            }
        },
        {
            uraian: 'Pemberitahuan isi Putusan Kepada Tergugat',
            tarif: (p1: any, p2: any) => {

                if (p2[1] != '400622') {
                    p2[0] += 50000;
                    return p2[0] * 1;
                }
                return p2[0] * 1;
            }
        },
        {
            uraian: 'PNBP Relaas Pemberitahuan Putusan Tergugat',
            tarif: '10000',
        },
        {
            uraian: 'PNBP Pencabutan',
            tarif: '10000',
        }
    ],
    ib: [
        {
            uraian: 'PNBP Relas Pertama Pemohon',
            tarif: '10000',
        },
        {
            uraian: 'Panggilan Sidang untuk Pemohon (2x)',
            tarif: (p1: any, p2: any) => {

                if (p1[1] != '400622') {
                    p1[0] += 50000;
                    return p1[0] * 2;
                }
                return p1[0] * 2;
            }
        },
        {
            uraian: 'PNBP Pencabutan',
            tarif: '10000',
        }

    ],
    dn: [
        {
            uraian: 'PNBP Relas Pertama Pemohon',
            tarif: '10000',
        },
        {
            uraian: 'Panggilan Sidang untuk Pemohon (2x)',
            tarif: (p1: any, p2: any) => {

                if (p1[1] != '400622') {
                    p1[0] += 50000;
                    return p1[0] * 2;
                }
                return p1[0] * 2;
            }
        },
        {
            uraian: 'PNBP Pencabutan',
            tarif: '10000',
        }

    ]
};