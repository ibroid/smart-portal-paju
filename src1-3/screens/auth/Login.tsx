import React, { useEffect, useCallback } from "react";

import {
	View,
	Text,
	ImageBackground,
	Image,
	TextInput,
	TouchableOpacity,
	Button,
	StatusBar,
	Alert,
} from "react-native";

import { AuthStackProps } from "../../interfaces/IStackParams";
import axios, { AxiosResponse } from "axios";
import { GlobalState, UserState } from "../../state";
import { useFocusEffect } from "@react-navigation/native";

import Styles from "../screen.style";
import HttpClient from "../../service/http";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TokenState } from "../../state/token";

export default function Login({ navigation }: AuthStackProps) {

	const [inputPhone, setInputPhone] = React.useState<string>()
	const [inputPassword, setInputPassword] = React.useState<string>()
	const [grantedAccess, setGrantedAccess] = React.useState<boolean>(false)

	useFocusEffect(
		useCallback(() => {
			GlobalState.update(i => { i.isLoading = false })
			const checkIfAuthed = async () => {
				if (grantedAccess == true) {

					GlobalState.update(index => { index.isAuth = 1 })
				}
			}
			checkIfAuthed()

			return function cleanup() {
				setGrantedAccess(false)
				setInputPassword('')
				setInputPhone('')
			}


		}, [grantedAccess])
	)


	return (
		<ImageBackground style={Styles.imageBackground} source={require('../../assets/images/backgrounds/bg_gradient_blue.png')}>
			<StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent={true}></StatusBar>
			<View style={{ flex: 1, alignItems: 'center', padding: 10, marginTop: 50 }}>
				<Image style={{ height: 200 }} resizeMode={'center'} source={require('../../assets/logo/paju_putih.png')} />

				<Text style={{ color: '#fff', fontWeight: '800', marginVertical: 10, fontSize: 20, textAlign: 'center' }}>
					Selamat Datang Di Aplikasi Smart Portal Pengadilan Agama Jakarta Utara
				</Text>

				<Text style={{ color: '#fff', fontWeight: '600', fontSize: 15 }}>Silahkan Masuk</Text>

				<TextInput value={inputPhone} onChangeText={(text) => setInputPhone(text)} selectionColor={'#fff'} style={{ borderWidth: 1, borderColor: '#fff', width: '100%', padding: 10, borderRadius: 10, marginTop: 20, color: '#fff' }} placeholder={'Masukan Nomor Telepon '} />


				<TextInput autoCapitalize='none' value={inputPassword} onChangeText={(text) => setInputPassword(text)} secureTextEntry={true} selectionColor={'#fff'} style={{ borderWidth: 1, borderColor: '#fff', width: '100%', padding: 10, borderRadius: 10, marginTop: 20, color: '#fff', marginBottom: 10 }} placeholder={'Masukan Password'} />

				<View style={{ width: '70%', borderRadius: 10 }}>

					<Button onPress={() => {
						if (inputPhone == undefined && inputPassword == undefined) {
							return Alert.alert('Kolom Tidak Boleh Kosong');
						}

						GlobalState.update(index => {
							index.isLoading = true, index.loadingMessage = 'Menghubungkan Ke Server'
						}, async () => {

							try {
								const loginRequest: AxiosResponse = await HttpClient.login(inputPhone, inputPassword)

								TokenState.update(i => {
									i.access = loginRequest.data.token
								})

								UserState.update(i => {
									i.created_at = loginRequest.data.user.created_at,
										i.updated_at = loginRequest.data.user.updated_at,
										i.user_nik = loginRequest.data.user.nik,
										i.user_fullname = loginRequest.data.user.name,
										i.user_phone = loginRequest.data.user.phone
								});

								await AsyncStorage.setItem('access_key', loginRequest.data.token)


								setGrantedAccess(true)

							} catch (error) {
								if (axios.isAxiosError(error)) {
									Alert.alert('Gagal Login', error.response?.data.message);
								}
								GlobalState.update(index => {
									index.isLoading = false
								})
							}
						})

					}} title={'masuk'} color={'#663dd6'} />

				</View>

				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Text style={{ color: '#fff', fontWeight: '400', marginVertical: 10, fontSize: 15, marginRight: 10 }}>
						Belum Punya Akun ?
					</Text>
					<TouchableOpacity onPress={() => navigation.push('Register')}>
						<Text style={{ color: '#fff', fontWeight: '700', marginVertical: 10, fontSize: 15 }}>Buat Akun Disini</Text>
					</TouchableOpacity>
				</View>

				<View>
					<Text style={{ color: '#fff', fontWeight: '600', fontSize: 10, alignSelf: 'center' }}>Copyright 2022 Pengadilan Agama Jakarta Utara | ALPHA 1.0</Text>
				</View>
			</View>

		</ImageBackground>
	)
}