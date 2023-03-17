import { IMenu } from "../interfaces/IMenu";
export const serviceMenu: IMenu[] = [
    {
        icon: require('../assets/icons/megaphone.png'),
        name: 'Pengumuman Kantor',
        color: '#fff',
        url: 'Pengumuman'
    },
    {
        icon: require('../assets/icons/paper_with_pencil.png'),
        name: 'Cara Pendaftaran',
        color: '#fff',
        url: "Pendaftaran"
    },
    {
        icon: require('../assets/icons/calculator.png'),
        name: 'Hitung Biaya Perkara',
        color: '#fff',
        url: 'CekBiaya'
    },
    {
        icon: require('../assets/icons/paper_with_pen_liquid.png'),
        name: 'Survey Masyarakat',
        color: '#fff',
        url: 'Survey'
    },
    {
        icon: require('../assets/icons/tv_screen.png'),
        name: 'Antrian Pelayanan',
        color: '#fff',
        url: 'Antrian'
    },
    {
        icon: require('../assets/icons/customer_service_man.png'),
        name: 'Permohonan Informasi',
        color: '#fff',
        url: 'Informasi'
    },
    {
        icon: require('../assets/icons/drive-thru.png'),
        name: 'Drive Thru',
        color: '#fff',
        url: 'DriveThru'
    },

];