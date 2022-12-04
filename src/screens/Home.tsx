import React, { useState } from "react";
import {
	View,
	Text,
	ImageBackground,
	StatusBar,
	Image,
	FlatList,
	TouchableOpacity,
	InteractionManager,
	ActivityIndicator,
	Alert,
	StyleSheet
} from "react-native";

import IonIcon from "react-native-vector-icons/Ionicons";
import FaIcon from "react-native-vector-icons/FontAwesome5";
import useHttpRequest from "../hooks/useHttpRequest";
import HttpClient from "../service/http";
import * as qs from "qs";
import Modal from "react-native-modal";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AxiosError } from "axios";
import { ILogoutResponse } from "../interfaces/IResponse";
import { Button } from "@rneui/base";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppStackProps } from "../interfaces/IStackParams";
import { GlobalState } from "../state/global";
import { useFocusEffect } from '@react-navigation/native';
import { courtMenu, serviceMenu } from "../data";
import { UserState } from "../state";
import { IDetailAntrianSidang, ISidangResponse, ICekSidangResponse } from "../interfaces/IResponse";
import { TokenState } from "../state/token";
import { AxiosResponse } from "axios";
import { FlatGrid } from "react-native-super-grid";
import { localDate } from "../service/date";
import Style from "./screen.style";

export default function Home({ navigation }: AppStackProps<"Home">) {
	const userState = UserState.useState()
	const tokenState = TokenState.useState()
	const [modal, setModal] = useState<boolean>(false)
	const { error, errorMessage, data, loading } = useHttpRequest<ICekSidangResponse>('antrian/cek_sidang', tokenState.access);

	const [nomorAntrian, setNomorAntrian] = useState<number>(0)
	const [dateNow, setDateNow] = useState<string>('')
	const [timeNow, setTimeNow] = useState<string>('')

	const [interact, setInteract] = useState<boolean>(false);
	const [sidang, setSidang] = useState<boolean>(false);


	useFocusEffect(
		React.useCallback(() => {

			if (error && errorMessage) {
				setSidang(false)
			}

			if (!loading) {
				InteractionManager.runAfterInteractions(() => {
					if (data) {
						if (data.nomor_antrian) {
							setNomorAntrian(data.nomor_antrian.nomor_urutan)
						}
						setSidang(true)
					}

					setInteract(true)
					GlobalState.update(index => { index.isLoading = false })

					const date = new Date();
					setDateNow(localDate(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`))
					setTimeNow(`${date.getHours()}:${date.getMinutes() < 9 ? String('0' + date.getMinutes()) : date.getMinutes()}`)
				})
			}

			return () => {
				setSidang(false)
				setInteract(false)
				setNomorAntrian(0)
				setDateNow('')
			};
		}, [loading])
	);

	const Loading = () => {
		return (<View style={{ justifyContent: 'center', flex: 1 }}>
			<ActivityIndicator size={'large'} color='#fff'></ActivityIndicator>
		</View>)
	}

	const TidakAdaSidang = () => {
		return <Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#ff1d58' }}>Tidak Ada Sidang Hari Ini</Text>
	}

	const AdaSidang = () => {
		return (
			<View style={{ backgroundColor: '#fff', padding: 10, borderRadius: 10, flexDirection: 'row', marginTop: 10 }}>
				<View style={{ flexDirection: 'column', flex: 1 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<IonIcon name="calendar" size={15} style={{ marginHorizontal: 10, color: '#704776' }}></IonIcon>
						<Text style={{ fontSize: 15, color: '#704776' }}>Sidang Hari Ini !</Text>
					</View>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<IonIcon name="home" size={15} style={{ marginHorizontal: 10, color: '#704776' }}></IonIcon>
						<Text style={{ fontSize: 15, color: '#704776' }}>{data?.sidang.ruangan}</Text>
					</View>
				</View>
				{!nomorAntrian
					? <AmbilAntrianSidang /> : <NomorAntrianSidang />}
			</View>
		)
	}

	const AmbilAntrianSidang = () => {
		return (<TouchableOpacity onPress={() => {
			GlobalState.update((i) => { i.isLoading = true })

			HttpClient.request.defaults.headers.common['Authorization'] = `Bearer ${tokenState.access}`;
			HttpClient.request.post('/antrian/set_sidang', qs.stringify({
				ruang: data?.sidang.ruangan_id,
				nama_ruang: data?.sidang.ruangan
			}))
				.then((response: AxiosResponse<IDetailAntrianSidang>) => {
					setNomorAntrian(response.data.nomor_urutan)
				})
				.catch((errorr) => {
					Alert.alert('Terjadi Kesalahan', 'Mohon maaf saat ini tidak bisa mengambil antrian sidang. Error : ' + errorr.errorMessage)
				})
				.finally(() => {
					GlobalState.update((i) => { i.isLoading = false })
				})
		}} style={{ padding: 10, borderWidth: 2, borderColor: '#d56f78', borderRadius: 10 }}>
			<Text style={{ color: '#d56f78', fontWeight: '600' }}>Ambil Antrian</Text>
		</TouchableOpacity>)
	}

	const NomorAntrianSidang = () => {
		return (
			<View style={{ padding: 5, borderWidth: 2, borderColor: '#d56f78', borderRadius: 10 }}>
				<Text style={{ color: '#d56f78', fontWeight: '600' }}>Nomor Antrian Anda</Text>
				<Text style={{ color: '#d56f78', fontWeight: 'bold', textAlign: 'center' }}>{nomorAntrian}</Text>
			</View>
		)

	}

	const styles = StyleSheet.create({
		gridView: {

			flex: 1,
		},
		itemContainer: {
			justifyContent: 'flex-end',
			borderRadius: 5,
			padding: 5,
			height: 80,
		},
		itemName: {
			fontSize: 16,
			color: '#fff',
			fontWeight: '600',
		},
		itemCode: {
			fontWeight: '600',
			fontSize: 11,
			color: '#fff',
		},
	});

	return (
		<ImageBackground style={Style.imageBackground} source={require('../assets/images/backgrounds/bg_gradient_blue.png')}>
			<StatusBar backgroundColor={'transparent'} translucent={true}></StatusBar>
			{!interact
				? <Loading />
				: <SafeAreaView style={{ paddingHorizontal: 20 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
						<View style={{ flexDirection: 'row', alignItems: 'baseline', flex: 1 }} >
							<TouchableOpacity onPress={() => navigation.navigate('Profil')}>
								<IonIcon color="#fff" name="person" size={25}></IonIcon>
							</TouchableOpacity>
							<Text style={{ color: '#fff', fontSize: 20, marginLeft: 10, fontWeight: '500' }}>{userState.user_fullname}</Text>
						</View>
						<TouchableOpacity onPress={() => setModal(true)}>
							<FaIcon color={"#fff"} name="cog" size={25}></FaIcon>
						</TouchableOpacity>
					</View>

					<View style={{ flexDirection: 'row', alignItems: 'stretch', paddingVertical: 5 }}>
						<View style={{ flexDirection: 'row', alignItems: 'baseline', flex: 1 }} >
							<Text style={{ fontFamily: 'Roboto-Regular', fontSize: 20, color: '#fff' }}>Selamat Datang !</Text>
						</View>
						<TouchableOpacity onPress={() => setModal(true)}>
							<Text style={{ color: '#fff' }}>{dateNow}</Text>
							<Text style={{ color: '#fff' }}>{timeNow}</Text>
						</TouchableOpacity>
					</View>

					<View style={{ backgroundColor: '#fff', borderRadius: 10, marginVertical: 10, padding: 10, flexDirection: 'row' }}>
						<View style={{ flexDirection: 'column', width: 120, flex: 1 }}>
							<Text style={{ fontFamily: 'Roboto-Bold', fontSize: 20, color: '#704776' }}>Smart Portal Pengadilan Agama Jakarta Utara</Text>
						</View>
						<Image resizeMode="center" style={{ height: 70, width: 150 }} source={require('../assets/images/cs_man.png')}></Image>
					</View>


					<FlatGrid
						maxItemsPerRow={4}
						itemDimension={50}
						data={courtMenu}
						renderItem={({ item }) => (
							<TouchableOpacity onPress={() => navigation.navigate(item.url)} style={[styles.itemContainer, { backgroundColor: item.color }]}>
								<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
									<FaIcon name={item.icon} color='#fff' size={30} />
								</View>
								<Text style={styles.itemCode}>{item.name}</Text>
							</TouchableOpacity>)}
					/>


					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={{ fontSize: 15, color: '#1047aa', fontWeight: 'bold' }}>Notifikasi Persidangan</Text>
						<View
							style={{
								flex: 1,
								marginHorizontal: 10,
								borderBottomColor: '#1047aa',
								borderBottomWidth: 1,
							}}
						/>
					</View>
					{!sidang ? <TidakAdaSidang /> : <AdaSidang />}

					<View style={{ marginTop: 'auto' }}>
						<Text style={{ color: '#fff', fontWeight: '600', fontSize: 10, alignSelf: 'center' }}>Copyright 2022 Pengadilan Agama Jakarta Utara | ALPHA 1.0</Text>
					</View>
				</SafeAreaView>
			}
			<Modal animationOut={'slideOutDown'} onBackdropPress={() => setModal(false)} animationIn={'slideInUp'} isVisible={modal}>
				<View style={{ backgroundColor: '#fff', padding: 10, marginTop: 'auto', borderRadius: 10 }}>

					<View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#fff' }}>
						<View style={{ flexDirection: 'column', padding: 5 }}>
							<Text style={{ fontWeight: '400' }}>Laporkan masalah pada aplikasi ke</Text>
							<Text style={{ fontSize: 20, fontWeight: '700' }}>itpajakut@gmail.com</Text>
						</View>
					</View>
					<View style={{ flexDirection: 'row', borderBottomWidth: 1, borderColor: '#fff' }}>
						<View style={{ flexDirection: 'column', padding: 5 }}>
							<Text style={{ fontWeight: '400' }}>Logout Akun</Text>
							<Button
								onPress={() => {
									GlobalState.update(i => {
										i.isLoading = true
									}, () => {
										HttpClient.request.defaults.headers.common['Authorization'] = `Bearer ${tokenState.access}`;
										HttpClient.logout()
											.then(async (response: AxiosResponse<ILogoutResponse>) => {
												await AsyncStorage.clear()

												UserState.update(i => {
													i.created_at = "",
														i.updated_at = "",
														i.user_fullname = "",
														i.user_email = "",
														i.user_phone = "",
														i.user_nik = ""
												})

												TokenState.update(i => {
													i.access = ""
												})

												GlobalState.update(i => {
													i.isAuth = 0
												})

											})
											.catch((error: AxiosError) => {

												Alert.alert('Gagal Menghubungkan', error.message)
											});
									})

								}}
								title="Log Out"
								buttonStyle={{
									backgroundColor: '#6a48bd',
									borderColor: 'white',
									borderRadius: 30,
								}}
								containerStyle={{
									borderRadius: 30,
									width: 200,
									marginHorizontal: 50,
									marginVertical: 10,
									alignContent: 'center',
									alignSelf: 'center'
								}}
								titleStyle={{ fontWeight: '600' }}
							/>
						</View>
					</View>
				</View>
			</Modal>
		</ImageBackground>
	)
}

