import React, { useCallback, useState } from "react";
import {
	View,
	Text,
	ImageBackground,
	Image,
	InteractionManager,
	ActivityIndicator,
	ScrollView,
	Alert
} from "react-native";

import DefaultHeader from "../components/DefaultHeader";
import FaIcon from "react-native-vector-icons/FontAwesome5";

import { useFocusEffect } from '@react-navigation/native';
import { IdentityState } from "../state";
import { IAktaCeraiResponse } from "../interfaces/IResponse";
import { localDate } from "../service/date";
import { AppStackProps } from "../interfaces/IStackParams";
import { TokenState } from "../state/token";

import Style from "./screen.style";
import useHttpRequest from "../hooks/useHttpRequest";

export default function AktaCerai({ navigation }: AppStackProps<"AktaCerai">) {

	const identityState = IdentityState.useState();
	const tokenState = TokenState.useState();
	const [interaction, setInteraction] = useState<boolean>(false)
	const [aktaCerai, setAktaCerai] = useState<IAktaCeraiResponse>()

	const { data, loading, error, errorMessage } = useHttpRequest<IAktaCeraiResponse>('/user/akta_cerai', tokenState.access);

	useFocusEffect(
		useCallback(() => {

			if (error && errorMessage) {
				console.log(errorMessage)
				Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan akta cerai tidak bisa diakses. Error : " + errorMessage.message, [
					{
						"text": "Kembali",
						"onPress": () => navigation.goBack()
					}
				])
			}

			if (data) {
				setAktaCerai(data)
			}

			if (!loading) {
				InteractionManager.runAfterInteractions(() => {
					setInteraction(true)
				})
			}

			return () => {
				setInteraction(false)

			}
		}, [loading])
	)

	const AktaNotExist = () => {
		return <View style={{ padding: 10, backgroundColor: '#fff', marginVertical: 20, borderRadius: 20 }}>
			<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: '#ff5768', marginBottom: -10, elevation: 20 }}>Akta Cerai Anda</Text>
			<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: '#ff5768', elevation: 20 }}>
				Belum Terbit
			</Text>
			<View style={{ borderWidth: 2, borderColor: '#6a48bd', marginVertical: 10 }} />
			<View style={{ flexDirection: 'row', alignItems: 'center' }}>
				<FaIcon name="bookmark" color={'#6a48bd'} size={20} />
				<Text style={{ marginLeft: 10, color: '#6a48bd', fontSize: 20 }}>Status Terakhir : Proses Persidangan</Text>
			</View>
		</View>
	}

	const AktaExist = () => {
		return <View style={{ padding: 10, backgroundColor: '#fff', marginVertical: 10, borderRadius: 20, flex: 1, maxHeight: 350 }}>
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: '#ff5768', marginBottom: -10, elevation: 20 }}>Akta Cerai Anda</Text>
				<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: '#ff5768', elevation: 20 }}>
					Sudah Terbit
				</Text>
				<View style={{ borderWidth: 2, borderColor: '#6a48bd', marginVertical: 10 }} />
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<FaIcon name="bookmark" color={'#6a48bd'} size={15} />
					<Text style={{ marginLeft: 10, color: '#6a48bd', fontSize: 15 }}>Nomor Akta : {aktaCerai?.nomor_akta_cerai}</Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<FaIcon name="bookmark" color={'#6a48bd'} size={15} />
					<Text style={{ marginLeft: 10, color: '#6a48bd', fontSize: 15 }}>Nomor Seri : {aktaCerai?.no_seri_akta_cerai}</Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<FaIcon name="calendar" color={'#6a48bd'} size={15} />
					<Text style={{ marginLeft: 10, color: '#6a48bd', fontSize: 15 }}>Tanggal Akta : {localDate(aktaCerai?.tgl_akta_cerai)}</Text>
				</View>
				<View style={{ borderWidth: 2, borderColor: '#6a48bd', marginVertical: 10 }} />
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<FaIcon name="calendar" color={'#6a48bd'} size={15} />
					<Text style={{ marginLeft: 10, color: '#6a48bd', fontSize: 15 }}>Di Ambil Oleh Penggugat : {localDate(aktaCerai?.tgl_penyerahan_akta_cerai)}</Text>
				</View>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<FaIcon name="calendar" color={'#6a48bd'} size={15} />
					<Text style={{ marginLeft: 10, color: '#6a48bd', fontSize: 15 }}>Di Ambil Oleh Tergugat : {localDate(aktaCerai?.tgl_penyerahan_akta_cerai_pihak2)}</Text>
				</View>
				<View style={{ borderWidth: 2, borderColor: '#6a48bd', marginVertical: 10 }} />
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<FaIcon name="arrow-down" color={'#6a48bd'} size={15} />
					<Text style={{ textAlign: 'center', marginLeft: 10, color: '#ff5768', fontSize: 15, fontWeight: '700' }}> Syarat Pengambilan Akta Cerai</Text>
				</View>
				<Text>1. Menyerahkan Fotokopi KTP</Text>
				<Text>2. Menyerahkan resi pembayaran dari kasir yang diterima setelah persidangan telah di putus</Text>
				<Text>3. Tidak boleh di wakilkan oleh orang lain</Text>
				<Text>4. Apabila tetap ingin di wakilkan. Maka memerlukan persyaratan sebagai berikut</Text>
				<Text>a. Surat kuasa</Text>
				<Text>b. Fotokopi KTP</Text>
				<Text>c. Surat PM1 dari kelurahan yang menjelaskan hubungan dengan yangg bersangkutan</Text>

			</ScrollView>
		</View>
	}

	return (
		<ImageBackground style={Style.imageBackground} source={require('../assets/images/backgrounds/bg_gradient_blue_2.png')}>
			<DefaultHeader name={'Akta Cerai'} />
			{!interaction
				?
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<ActivityIndicator size={'large'} color={'#fff'} />
				</View>
				:
				<View style={{ marginTop: 25, alignSelf: 'center', paddingHorizontal: 20 }}>
					<Image resizeMode='center' style={{ height: 200 }} source={require('../assets/images/print_document.png')}></Image>
					{!aktaCerai?.nomor_akta_cerai ? <AktaNotExist /> : <AktaExist />}

				</View>
			}

		</ImageBackground>
	)
}