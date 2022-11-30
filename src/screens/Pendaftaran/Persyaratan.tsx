import React from "react";
import { View, Text, ImageBackground, Image, ScrollView } from "react-native";
import DefaultHeader from "../../components/DefaultHeader";
import { PendaftaranStackProps } from "../../interfaces/IStackParams";
import Style from "../screen.style";

export default function Persyaratan({ navigation }: PendaftaranStackProps<"Persyaratan">) {
	return (
		<ImageBackground style={Style.imageBackground} source={require('../../assets/images/backgrounds/bg_gradient_blue_3.png')}>
			<DefaultHeader name={'Persyaratan'} color={'#fff'} />
			<View style={{ justifyContent: 'center', alignSelf: 'center', padding: 10 }}>
				<Image style={{ height: 140 }} resizeMode={'center'} source={require('../../assets/images/persyaratan.png')} />
			</View>
			<View style={{ flex: 1, marginTop: 20, paddingHorizontal: 10 }}>
				<Text style={{ color: '#6a48bd', textAlign: 'center', fontWeight: '700' }}>Daftar Persyaratan Pendaftaran Perkara Pengadilan Agama Jakarta Utara</Text>
				<ScrollView>
					<View style={{ paddingVertical: 10 }}>
						<Text style={{ color: 'black' }}> SYARAT PENGAJUAN CERAI GUGAT/CERAI TALAK</Text>
						<Text style={{ textAlign: 'justify' }}>1. Buku nikah asli atau Duplikat buku nikah jika yang asli hilang (Duplikat buku nikah bisa di buat di KUA setempat) beserta satu Lembar Fotokopi yang dimateraikan Rp. 10.000,- dan dicap leges di kantor pos</Text>
						<Text style={{ textAlign: 'justify' }}>2. Fotokopi KTP atau Resi KTP Lembar Fotokopi yang dimateraikan Rp. 10.000,- dan dicap leges di kantor pos</Text>
						<Text style={{ textAlign: 'justify' }}>3. Surat Keterangan Lurah setempat (Apabila Suami atau Istri tidak diketahui alamat keberadaan yang pasti)</Text>
						<Text style={{ textAlign: 'justify' }}>4. Surat Ijin Atasan (khusus bagi PNS/TNI/POLRI/BUMN)</Text>
					</View>
					<View style={{ paddingVertical: 10 }}>
						<Text style={{ color: 'black' }}> SYARAT PENGAJUAN DISPENSASI NIKAH</Text>
						<Text style={{ textAlign: 'justify' }}>1. Fotocopi KTP Pemohon / para Pemohon sebanyak 1 lembar A4 (tidak boleh dipotong) yang dimateraikan Rp 10.000,- dan dicap leges di kantor pos</Text>
						<Text style={{ textAlign: 'justify' }}>2. Fotocopi Kartu Keluarga Pemohon sebanyak 1 lembar yang dimateraikan Rp 10.000,- dan dicap leges di kantor pos</Text>
						<Text style={{ textAlign: 'justify' }}>3. Fotocopi akta nikah orang tua calon yang dimateraikan Rp 10.000,- dan dicap leges di kantor pos</Text>
						<Text style={{ textAlign: 'justify' }}>4. Fotocopi akta kelahiran calon suami dan calon istri yang dimateraikan Rp 10.000,- dan dicap leges di kantor pos</Text>
						<Text style={{ textAlign: 'justify' }}>5. Surat keterangan pemberitahuan adanya halangan / kekurangan persyaratan nikah dari KUA</Text>
						<Text style={{ textAlign: 'justify' }}>6. Surat keterangan status dari Kelurahan</Text>
					</View>
					<View style={{ paddingVertical: 10 }}>
						<Text style={{ color: 'black' }}> SYARAT PENGAJUAN ISBAT NIKAH</Text>
						<Text style={{ textAlign: 'justify' }}>1. Fotocopi KTP Pemohon yang dimateraikan Rp 10.000,- dan dicap leges di kantor pos</Text>
						<Text style={{ textAlign: 'justify' }}>2. Surat Keterangan KUA setempat (menerangkan bahwa NIKAH nya tidak terdapat di Register Nikah KUA setempat)</Text>
					</View>
				</ScrollView>
			</View>
		</ImageBackground>
	)
}