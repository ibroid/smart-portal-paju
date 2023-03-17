import React from "react";
import {
    Text,
    View,
    ImageBackground,
    StatusBar,
    Image,
    Button,
    Pressable,
    Alert,
    TouchableOpacity,
    Linking
} from "react-native";

import DefaultHeader from "../../components/DefaultHeader";
import Timeline from "react-native-timeline-flatlist";
import FaIcon from "react-native-vector-icons/FontAwesome5";
import { PendaftaranStackProps } from "../../interfaces/IStackParams";
import Style from "../screen.style";

export default function AlurPendaftaran({ navigation }: PendaftaranStackProps<"AlurPendaftaran">) {

    const linkToGugatanMandiri = async () => {
        const url = "https://sarbiati.pajakartautara.id"
        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Terjadi Kesalahan`, `Silahkan coba buka secara manual dengan mengakses ${url} di web browser anda`);
        }

    }

    const [timelineData, setTImelineData] = React.useState([
        { time: <FaIcon name="file-alt" color={'#6a48bd'} size={15} />, title: 'Memenuhi Persyaratan', description: <View style={{ marginEnd: 20 }}><Text style={{ textAlign: 'justify' }}>Sebelum memulai pendaftaran perkara, Pihak Wajib memenuhi semua persyaratan sesuai jenis perkara yang akan di ajukan. Untuk melihat persyaratan pendaftaran silahkan </Text><TouchableOpacity onPress={() => navigation.push('Persyaratan')}><Text style={{ color: '#6a48bd', fontWeight: '500' }}>Klik Disini</Text></TouchableOpacity></View> },
        { time: <FaIcon name="pencil-alt" color={'#6a48bd'} size={15} />, title: 'Membuat Gugatan atau Permohonan', description: <View style={{ marginEnd: 20 }}><Text style={{ textAlign: 'justify' }}>Setelah Persyaratan terkumpul, Selanjutnya membuat surat gugatan atau surat permohonan. Surat ini termasuk kedalam persyaratan pendaftaran. Untuk membuat nya, anda bisa ke loket posbakum di kantor Pengadilan Agama Jakarta Utara (gratis). Jika membuat surat gugatan secara mandiri silahkan</Text><TouchableOpacity onPress={linkToGugatanMandiri}><Text style={{ color: '#6a48bd', fontWeight: '500' }}>Klik Disini</Text></TouchableOpacity></View> },
        { time: <FaIcon name="file-signature" color={'#6a48bd'} size={15} />, title: 'Melakukan Pendaftaran', description: 'Setelah Persyaratan dan surat gugatan atau permohonan sudah terkumpul. Silahkan mengambil antrian pendaftaran dan memberikan semua dokumen persyaratan kepada petugas pendaftaran' },
        { time: <FaIcon name="money-bill-wave-alt" color={'#6a48bd'} size={15} />, title: 'Melakukan Pembayaran', description: 'Petugas pendaftaran akan memandu ke loket bank dan silahkan melakukan pembayaran sesuai nominal yang telah di berikan oleh petugas pendaftaran. Setelah itu berikan struk pembayaran dari loket bank kepada petugas pendaftaran.' },
        { time: <FaIcon name="user-tie" color={'#6a48bd'} size={15} />, title: 'Pendaftaran Berhasil', description: 'Setelah pendaftaran berhasil silahkan ikuti intruksi dari petugas pendaftaran tentang cara berperkara, Silahkan tanyakan sesuatu yang belum dimengerti kepada petugas.' },
    ])

    return (
        <ImageBackground style={Style.imageBackground} source={require('../../assets/images/backgrounds/bg_gradient_blue_3.png')}>
            <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent={true}></StatusBar>
            <DefaultHeader name={'Pendaftaran'} color={'#fff'} />
            <View style={{ alignContent: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                <Image style={{ height: 160 }} resizeMode='center' source={require('../../assets/images/document_flow.png')} />
            </View>
            <View style={{ flex: 1, marginVertical: 20 }}>
                <Text style={{ color: '#6a48bd', textAlign: 'center', fontWeight: '700' }}>Alur Pendaftaran Perkara</Text>
                <Timeline circleColor={'#6a48bd'} data={timelineData} descriptionStyle={{ textAlign: 'justify', paddingRight: 20 }} titleStyle={{ color: 'black' }} />
            </View>
            <Button onPress={() => navigation.push("Informasi")} title="Tanya Informasi" />

        </ImageBackground>
    )
}