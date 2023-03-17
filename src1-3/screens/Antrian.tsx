import React, { useCallback, useState } from "react";

import {
	View,
	Text,
	ImageBackground,
	Alert,
	InteractionManager,
	ActivityIndicator,
	ScrollView
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { FlatGrid } from 'react-native-super-grid';
import { TokenState } from "../state/token";

import DefaultHeader from "../components/DefaultHeader";
import Styles from "./screen.style";
import FaIcon from "react-native-vector-icons/FontAwesome5";
import useHttpRequest from "../hooks/useHttpRequest";
import { IAntrianResponse } from "../interfaces/IResponse";
import { AppStackProps } from "../interfaces/IStackParams";

export default function Antrian({ navigation }: AppStackProps<"Antrian">) {
	const tokenState = TokenState.useState()

	const { data, loading, error, errorMessage } = useHttpRequest<IAntrianResponse>('/antrian', tokenState.access);

	const [interact, setInteract] = useState<boolean>(false)

	useFocusEffect(
		useCallback(() => {
			if (error && errorMessage) {
				Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan antrian tidak bisa diakses. Error : " + errorMessage.message, [
					{
						"text": "Kembali",
						"onPress": () => navigation.goBack()
					}
				])
			}

			if (!loading) {
				InteractionManager.runAfterInteractions(() => {
					setInteract(true)
				})
			}

		}, [loading]))


	const Loading = () => {
		return (
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<ActivityIndicator size={'large'} color={'#fff'} />
			</View>
		)
	}

	return (
		<ImageBackground style={Styles.imageBackground} source={require('../assets/images/backgrounds/bg_gradient_blue.png')}>
			<DefaultHeader name={'Antrian'} color={'#fff'} />
			{(!interact && data)
				? <Loading />
				: <View style={{ padding: 10, flex: 1 }}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={{ color: "#fff" }}>Antrian Pelayanan</Text>
						<View
							style={{
								flex: 1,
								marginHorizontal: 10,
								borderBottomColor: '#fff',
								borderBottomWidth: 1,
							}}
						/>
						<FaIcon color={'#fff'} name="list" />
					</View>
					<FlatGrid data={data ? data.antrian_oss : []} renderItem={({ item }) => (
						<View style={{ backgroundColor: '#fff', padding: 5, borderRadius: 10 }}>
							<Text style={{ textAlign: 'center', fontWeight: '800', fontSize: 20, color: '#e61e4c' }}>{item.no_antrian}</Text>
							<Text style={{ color: '#6a48bd', fontWeight: '700', textAlign: 'center' }}>Customer Service </Text>
							<Text style={{ color: '#6a48bd', fontWeight: '700', textAlign: 'center' }}>{item.cs_id}</Text>
						</View>
					)}
						ListEmptyComponent={<Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#ff1d58' }}>Antrian Kosong</Text>}
					/>

					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={{ color: "#fff" }}>Antrian Persidangan</Text>
						<View
							style={{
								flex: 1,
								marginHorizontal: 10,
								borderBottomColor: '#fff',
								borderBottomWidth: 1,
							}}
						/>
						<FaIcon color={'#fff'} name="list" />
					</View>
					<FlatGrid data={data ? data.antrian_sidang : []} renderItem={({ item }) => (
						<View style={{ backgroundColor: '#fff', padding: 10, borderRadius: 10 }}>
							<Text style={{ color: '#6a48bd', fontWeight: '700', textAlign: 'center' }}>{item.nomor_antrian_sidang.nama_ruang}</Text>
							<Text style={{ textAlign: 'center', fontWeight: '800', fontSize: 30, color: '#e61e4c' }}>{item.nomor_antrian_sidang.nomor_urutan}</Text>
							<Text style={{ color: '#6a48bd', fontWeight: '400', textAlign: 'center' }}>{item.nomor_antrian_sidang.nomor_perkara}</Text>
						</View>
					)}
						ListEmptyComponent={<Text style={{ textAlign: 'center', fontWeight: 'bold', color: '#ff1d58' }}>Antrian Kosong</Text>}
					/>
				</View>
			}

		</ImageBackground>
	)
}