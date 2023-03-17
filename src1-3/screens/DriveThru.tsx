import React, { useState, useCallback } from "react";
import {
	View,
	Text,
	ImageBackground,
	ActivityIndicator,
	InteractionManager,
	Alert,
	TextInput,
	ScrollView,
	Image
} from "react-native";
import { AppStackProps } from "../interfaces/IStackParams";
import { Button } from "@rneui/base";
import { useFocusEffect } from "@react-navigation/native";
import { TokenState } from "../state/token";
import { GlobalState } from "../state";
import { AxiosError, AxiosResponse } from "axios";
import { IDriveThruCekResponse } from "../interfaces/IResponse";

import HttpClient from "../service/http";
import Style from "./screen.style";
import Loading from "../components/LoadingIndicator";
import FaIcon from "react-native-vector-icons/FontAwesome5";
import DefaultHeader from "../components/DefaultHeader";
import DatePicker from "react-native-date-picker";
import useHttpRequest from "../hooks/useHttpRequest";
import QueryString from "qs";
import { localDate } from "../service/date";

export default function DriveThru({ navigation }: AppStackProps<"DriveThru">) {

	const [open, setOpen] = useState<boolean>(false)
	const [interact, setInteract] = useState<boolean>(false)
	const tokenState = TokenState.useState()

	const { data, loading, error, errorMessage } = useHttpRequest<IDriveThruCekResponse>('/drive_thru/cek', tokenState.access);

	const [nomorPerkara, setNomorPerkara] = useState<string>('');
	const [nama, setNama] = useState<string>('');
	const [nomorWa, setNomorWa] = useState<string>('');
	const [waktuAmbil, setWaktuAmbil] = useState<string>('');
	const [sudahPesan, setSudahPesan] = useState<boolean>(false);

	const [tanggalTerpesan, setTanggalTerpesan] = useState<string>('')
	const [waktuTerpesan, setWaktuTerpesan] = useState<string>('')


	useFocusEffect(
		useCallback(() => {
			if (error && errorMessage) {
				Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan DriveThru tidak bisa diakses. Error : " + errorMessage, [
					{
						"text": "Kembali",
						"onPress": () => navigation.goBack()
					}
				])
			}

			if (data) {
				setTanggalTerpesan(data.tanggal_ambil)
				setWaktuAmbil(data.waktu_ambil)
				setSudahPesan(true)
			}

			if (!loading) {
				InteractionManager.runAfterInteractions(() => {
					setInteract(true)
				})
			}

			return () => {
				setInteract(false)
				setNama('')
				setNomorPerkara('')
				setWaktuAmbil('')
				setNomorWa('')
				setOpen(false)
			}
		}, [loading])
	)


	const kirimPesanan = () => {
		if (!nama || !nomorPerkara || !nomorWa || !waktuAmbil) {
			return Alert.alert('Silahkan lengkapi Form pemesanan')
		}

		GlobalState.update(i => { i.isLoading = true })

		HttpClient.request.defaults.headers.common['Authorization'] = `Bearer ${tokenState.access}`;
		HttpClient.request.defaults.headers.common['Accept'] = 'application/json';
		HttpClient.request.defaults.headers.common['Content-Type'] = 'application/json';

		HttpClient.request.post('/drive_thru', QueryString.stringify({
			'nomor_perkara': nomorPerkara,
			'nomor_wa': nomorWa,
			'waktu_ambil': waktuAmbil,
			'pihak_pengambil': nama
		}))

			.then((response: AxiosResponse) => {
				Alert.alert(response.data.status, response.data.message)
				setTanggalTerpesan(waktuAmbil.toString().replace(' ', '|').split('|')[0])
				setWaktuTerpesan(waktuAmbil.toString().replace(' ', '|').split('|')[1])
				setSudahPesan(true)
			})

			.catch((error: AxiosError<{ status: string, message: string }>) => {
				Alert.alert(error.response?.data.status || error.message, error.response?.data.message || '')
			})

			.finally(() => {
				GlobalState.update(i => { i.isLoading = false })
			})

	}


	const SudahPesan = () => {
		return (
			<View style={{ padding: 10, }}>
				<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: '#6756BE', elevation: 20 }}>Pesanan anda sudah tersimpan. Silahkan datang ke pengadilan agama jakarta utara pada tanggal dan waktu yang sudah di tentukan</Text>
				<Text style={{ textAlign: 'center', fontSize: 15, color: '#ff5768', elevation: 20 }}>Pastikan anda membawa fotokopi ktp anda dan uang minimal sebesar 20 ribu rupiah untuk pembayaran PNBP. Pengambilan tidak bisa di wakilkan oleh orang lain !</Text>
				<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#ff5768', elevation: 20 }}>Tanggal Pengambilan : {data ? localDate(data.tanggal_ambil) : localDate(tanggalTerpesan)}</Text>
				<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#ff5768', elevation: 20 }}>Jam Pengambilan : {data ? data.waktu_ambil : waktuTerpesan}</Text>
				<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#ff5768', elevation: 20 }}>Nomor Perkara : {data ? data.nomor_perkara : nomorPerkara}</Text>
				<Text style={{ textAlign: 'center', fontSize: 15, color: '#ff5768', elevation: 20 }}>Perlihatkan Pesan ini kepada petugas Drive Thru untuk mengambil Akta anda</Text>
			</View>
		)
	}

	return (
		<ImageBackground style={Style.imageBackground} source={require('../assets/images/backgrounds/bg_gradient_blue.png')}>
			<DefaultHeader name={'Drive Thru'} color={'#fff'} />
			<View style={{ alignSelf: 'center' }}>
				<Image resizeMode={'center'} style={{ height: 150 }} source={require('../assets/images/drive_thru_take.png')}></Image>
			</View>
			{!interact
				? <Loading />
				: <View style={{ margin: 20, backgroundColor: '#fff', marginVertical: 10, borderRadius: 10, flex: 1 }} >
					<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: '#ff5768', elevation: 20 }}>Ambil akta cerai mu melalui Drive Thru tanpa harus mengantri !</Text>
					{sudahPesan
						? <SudahPesan />
						: <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 10 }}>
							<Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: '#6756BE', elevation: 20 }}>Silahkan Lengkapi Form dibawah ini untuk memesan akta cerai melalui drive thru</Text>

							<Text style={{ alignSelf: 'center' }}>Masukan Nomor Perkara Dengan Benar</Text>
							<TextInput
								value={nomorPerkara}
								onChangeText={text => setNomorPerkara(text)}
								style={{ borderColor: '#6756BE', borderWidth: 2, borderRadius: 10, color: '#6756BE', marginBottom: 10, height: 40 }} placeholder='Contoh : 123/Pdt.G/2022/PA.JU' />

							<Text style={{ alignSelf: 'center' }}>Masukan Nama Pengambil</Text>
							<TextInput
								value={nama}
								onChangeText={text => setNama(text)}
								style={{ borderColor: '#6756BE', borderWidth: 2, borderRadius: 10, color: '#6756BE', marginBottom: 10, height: 40 }} placeholder='Nama Lengkap Sesuai KTP' />

							<Text style={{ alignSelf: 'center' }}>Masukan Nomor Telefon (Aktif WA)</Text>
							<TextInput
								onChangeText={text => setNomorWa(text)}
								value={nomorWa}
								style={{ borderColor: '#6756BE', borderWidth: 2, borderRadius: 10, color: '#6756BE', marginBottom: 10, height: 40 }} placeholder='Contoh : 0812345678' />

							<Text style={{ alignSelf: 'center' }}>Waktu Pengambilan Akta </Text>
							<TextInput
								value={waktuAmbil}
								onFocus={() => setOpen(true)} style={{ borderColor: '#6756BE', borderWidth: 2, borderRadius: 10, color: '#6756BE', marginBottom: 10, height: 40 }} placeholder='Pilih Waktu Pengambilan' />

							<Button
								onPress={kirimPesanan}
								title="Simpan Pesanan"
								buttonStyle={{
									backgroundColor: '#6a48bd',
									borderColor: 'white',
									borderRadius: 30,
								}}
								containerStyle={{
									borderRadius: 30,
									width: 200,
									marginHorizontal: 50,
									alignSelf: 'center'
								}}
								icon={<FaIcon name={'plus'} color={'#fff'} style={{ marginHorizontal: 5 }} />}
								titleStyle={{ fontWeight: '600' }} />

						</ScrollView>
					}

				</View>
			}

			<DatePicker
				modal
				mode="datetime"
				locale="id"
				open={open}
				title={'Pilih Tanggal dan Waktu Pengambilan'}
				date={new Date()}
				minuteInterval={30}
				is24hourSource="locale"
				onConfirm={(date) => {
					setWaktuAmbil(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes() == 0 ? String(date.getMinutes()).concat('0') : date.getMinutes()}:00`)

					setOpen(false)
				}}
				onCancel={() => {
					setOpen(false)
				}}
			/>

		</ImageBackground >
	)
}