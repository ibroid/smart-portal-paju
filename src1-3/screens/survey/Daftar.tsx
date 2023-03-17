import React, { useCallback, useEffect, useState } from "react";
import {
	View,
	Text,
	ImageBackground,
	TouchableOpacity,
	Image,
	Alert,
	InteractionManager
} from "react-native";
import { SurveyStackProps } from "../../interfaces/IStackParams";
import { TokenState } from "../../state/token";

import DefaultHeader from "../../components/DefaultHeader";
import Styles from "../screen.style";
import useHttpRequest from "../../hooks/useHttpRequest";
import { useFocusEffect } from "@react-navigation/native";
import { ISurveyCekResponse } from "../../interfaces/IResponse";

export default function Daftar({ navigation }: SurveyStackProps<'Daftar'>) {

	const tokenState = TokenState.useState();
	const [interact, setInteract] = useState<boolean>();
	const [cek, setCek] = useState<{ ikm: boolean, ipk: boolean }>({ ikm: false, ipk: false });
	const { error, errorMessage, data, loading } = useHttpRequest<ISurveyCekResponse>('survey/cek', tokenState.access);

	useFocusEffect(useCallback(() => {

		if (error && errorMessage) {
			Alert.alert("Terjadi Kesalahan", "Mohon maaf saat ini layanan survey tidak bisa diakses. Error : " + errorMessage.message, [
				{
					"text": "Kembali",
					"onPress": () => navigation.goBack()
				}
			])
		}

		if (data) {
			if (data.ikm > 0) {
				setCek(current => {
					return {
						...cek,
						ikm: true
					}
				})
			}
			if (data.ipk > 0) {
				setCek(current => {
					return {
						...cek,
						ipk: true
					}
				})
			}
		}

		if (!loading) {
			InteractionManager.runAfterInteractions(() => {
				setInteract(true)
			})
		}

	}, [loading]))

	return (
		<ImageBackground style={Styles.imageBackground} source={require('../../assets/images/backgrounds/bg_gradient_blue_2.png')}>
			<DefaultHeader name={'Survey'} />
			<View style={{ padding: 10 }}>
				<Text style={{ color: '#fff', marginVertical: 10 }}>Pilih Salah Satu Survey di Bawah ini</Text>
				<TouchableOpacity disabled={cek.ikm} onPress={() => navigation.push('Pengisian', { kode: 'ikm' })} style={{ alignItems: 'center', borderRadius: 10, flexDirection: 'row', padding: 10, backgroundColor: cek.ikm ? '#f0fff0' : '#fff', marginTop: 10 }}>
					<View style={{ flex: 1 }}>
						<Text style={{ fontSize: 20, color: '#704776', fontWeight: '500' }}>Survey Index Kepuasan Masyarakat</Text>
						<Text style={{ color: '#000' }}>9 Pertanyaan</Text>
						{cek.ikm ? <Text style={{ color: 'green', fontWeight: 'bold' }}>Anda sudah mengisi survey ini</Text> : false}
					</View>
					<Image source={require('../../assets/images/survey_b.png')} style={{ height: 100, width: 100 }} resizeMode="center" />
				</TouchableOpacity>
				<TouchableOpacity disabled={cek.ipk} onPress={() => navigation.push('Pengisian', { kode: 'ipk' })} style={{ alignItems: 'center', borderRadius: 10, flexDirection: 'row', padding: 10, backgroundColor: cek.ipk ? '#f0fff0' : '#fff', marginTop: 10 }}>
					<View style={{ flex: 1 }}>
						<Text style={{ fontSize: 20, color: '#704776', fontWeight: '500' }}>Survey Index Persepsi Korupsi</Text>
						<Text style={{ color: '#000' }}>10 Pertanyaan</Text>
						{cek.ipk ? <Text style={{ color: 'green', fontWeight: 'bold' }}>Anda sudah mengisi survey ini</Text> : false}
					</View>
					<Image source={require('../../assets/images/survey_a.png')} style={{ height: 100, width: 100 }} resizeMode="center" />
				</TouchableOpacity>
			</View>
		</ImageBackground >
	)
}