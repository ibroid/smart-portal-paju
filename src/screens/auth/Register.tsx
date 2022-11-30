import React, { useState } from "react";
import {
	View,
	Text,
	ImageBackground,
	StatusBar,
	Button,
	TextInput,
	Image,
	TouchableOpacity,
	Alert
} from "react-native";

import { getDeviceId } from 'react-native-device-info';
import { AuthStackProps } from "../../interfaces/IStackParams";
import { GlobalState, UserState } from "../../state";
import { AxiosResponse } from "axios";
import { TokenState } from "../../state/token";
import { IRegisterResponse } from "../../interfaces/IResponse";

import HttpClient from "../../service/http";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Styles from "../screen.style";
import * as qs from "qs";


export default function Register({ navigation }: AuthStackProps) {
	const [nama, setNama] = useState<string>();
	const [nik, setNik] = useState<string>();
	const [phone, setPhone] = useState<string>();
	const [password, setPassword] = useState<string>();
	const [grantedAccess, setGrantedAccess] = React.useState<boolean>(false)

	const [validasiNama, setValidasiNama] = useState<string>();
	const [validasiNik, setValidasiNik] = useState<string>();
	const [validasiPhone, setValidasiPhone] = useState<string>();
	const [validasiPassword, setValidasiPassword] = useState<string>();

	React.useEffect(() => {
		const checkIfAuthed = async () => {
			if (grantedAccess == true) {

				GlobalState.update(index => { index.isAuth = 1 })
			}
		}
		checkIfAuthed()

		return function cleanup() {

		}


	}, [grantedAccess])

	const renderRowText = (data: any) => {
		return (
			<View style={{ flexDirection: 'row' }}>
				<Text>{'\u2022'}</Text>
				<Text style={{ flex: 1, paddingLeft: 5 }}>{data}</Text>
			</View>
		);
	}


	async function register() {
		if (!phone && !nama && !nik && !password) {
			return Alert.alert('Kolom Tidak Boleh Kosong');
		}
		GlobalState.update(index => {
			index.isLoading = true, index.loadingMessage = 'Menghubungkan Ke Server'
		})

		HttpClient.request.defaults.headers.common['Accept'] = 'application/json';
		HttpClient.request.defaults.headers.common['Content-Type'] = 'application/json';

		HttpClient.request.post('/auth/register', qs.stringify({
			phone,
			name: nama,
			nik,
			password,
			device_id: getDeviceId()
		}))
			.then((response: AxiosResponse<IRegisterResponse>) => {
				TokenState.update(i => {
					i.access = response.data.token
				})

				UserState.update(i => {
					i.created_at = response.data.user.created_at,
						i.updated_at = response.data.user.updated_at,
						i.user_nik = response.data.user.nik,
						i.user_fullname = response.data.user.name,
						i.user_phone = response.data.user.phone
				});

				AsyncStorage.setItem('access_key', response.data.token, () => {
					setGrantedAccess(true)
				})
			})
			.catch((error) => {
				if (error.response?.status == 422) {
					const errors = error.response.data.errors;
					setValidasiNama((errors.nama) ? errors.nama[0] : '')
					setValidasiNik((errors.nik) ? errors.nik : '')
					setValidasiPhone((errors.phone) ? errors.phone[0] : '')
					setValidasiPassword((errors.password) ? errors.password[0] : '')
					return Alert.alert('Register Gagal')
				} else {
					console.log(error.response)
					Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini registrasi tidak bisa diakses. Error : " + error.message, [
						{
							"text": "Kembali",
							"onPress": () => navigation.goBack()
						}
					])
				}
			}).finally(() => {
				GlobalState.update(index => {
					index.isLoading = false
				})
			})

	}

	return (
		<ImageBackground style={Styles.imageBackground} source={require('../../assets/images/backgrounds/bg_gradient_blue.png')}>
			<StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent={true}></StatusBar>
			<View style={{ flex: 1, alignItems: 'center', padding: 10, marginTop: 50 }}>
				<Image style={{ height: 200 }} resizeMode={'center'} source={require('../../assets/logo/paju_putih.png')} />
				<Text style={{ color: '#fff', fontWeight: '800', marginVertical: 10, fontSize: 20, textAlign: 'center' }}>SIlahkan Lengkapi Data Diri Anda</Text>

				<TextInput value={nama} onChangeText={(text) => setNama(text)} selectionColor={'#fff'} style={{ borderWidth: 1, borderColor: '#fff', width: '100%', padding: 10, borderRadius: 10, color: '#fff' }} placeholder={'Nama Lengkap Sesuai KTP'} />
				<Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{validasiNama}</Text>

				<TextInput value={nik} onChangeText={(text) => setNik(text)} selectionColor={'#fff'} style={{ borderWidth: 1, borderColor: '#fff', marginTop: 10, width: '100%', padding: 10, borderRadius: 10, color: '#fff' }} placeholder={'Nomor NIK'} />
				<Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{validasiNik}</Text>

				<TextInput value={phone} onChangeText={(text) => setPhone(text)} selectionColor={'#fff'} style={{ borderWidth: 1, borderColor: '#fff', width: '100%', padding: 10, borderRadius: 10, marginTop: 10, color: '#fff' }} placeholder={'Masukan Nomor Telefon (Aktif WA)'} />
				<Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{validasiPhone}</Text>

				<TextInput value={password} onChangeText={(text) => setPassword(text)} autoCapitalize='none' secureTextEntry={true} selectionColor={'#fff'} style={{ borderWidth: 1, borderColor: '#fff', width: '100%', padding: 10, borderRadius: 10, marginTop: 10, color: '#fff' }} placeholder={'Masukan Password'} />
				<Text style={{ color: 'red', fontSize: 12, textAlign: 'left' }}>{validasiPassword}</Text>

				<View style={{ width: '70%', borderRadius: 10 }}>
					<Button onPress={register} title={'mendaftar'} color={'#663dd6'} />
				</View>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Text style={{ color: '#fff', fontWeight: '700', marginVertical: 10, fontSize: 15 }}>Kembali Ke Login</Text>
				</TouchableOpacity>

			</View>
			<View>
				<Text style={{ color: '#fff', fontWeight: '600', fontSize: 10, alignSelf: 'center' }}>Copyright 2022 Pengadilan Agama Jakarta Utara | http://pa-jakartautara.go.id</Text>
			</View>
		</ImageBackground>
	)
}